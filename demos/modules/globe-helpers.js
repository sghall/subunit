var baseGeometry = new THREE.Geometry();

var pointGeometry = new THREE.BoxGeometry(0.75, 0.75, 1);
pointGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, -0.5));

var point = new THREE.Mesh(pointGeometry);

var center = new THREE.Vector3(0,0,0);

var is_animated, morphTargetId, points;

export function addData(data, opts) {
  var lat, lng, size, color, i, step;

  var colorFnWrapper = function (data, i) {
    return colorFn(data[i + 2]); 
  };

  var opts = opts || {};

  var colorFn = opts.colorFn || function (x) {
    return new THREE.Color('#fff');
  };

  opts.animated = opts.animated || false;
  is_animated   = opts.animated;

  var step = 3;
  // opts.format   = opts.format || 'magnitude';

  // if (opts.format === 'magnitude') {
  //   step = 3;

  //   colorFnWrapper = function (data, i) {
  //     return colorFn(data[i + 2]); 
  //   };

  // } else if (opts.format === 'legend') {
  //   step = 4;

  //   colorFnWrapper = function (data, i) {
  //     return colorFn(data[i + 3]); 
  //   };

  // } else {
  //   throw('error: format not supported: '+ opts.format);
  // }

  // if (opts.animated) {
  //   for (i = 0; i < data.length; i += step) {
  //     lat   = data[i + 0];
  //     lng   = data[i + 1];
  //     size  = data[i + 2];
  //     color = colorFnWrapper(data, i);
  //     size  = 0;
  //     addPoint(lat, lng, size, color, baseGeometry);
  //   }

  //   if (morphTargetId === undefined) {
  //       morphTargetId = 0;
  //   } else {
  //     morphTargetId += 1;
  //   }

  //   opts.name = opts.name || 'morphTarget' + morphTargetId;
  // }

  var subgeo = new THREE.Geometry();

  for (i = 0; i < data.length; i += step) {
    lat   = data[i + 0];
    lng   = data[i + 1];
    size  = data[i + 2];
    color = colorFnWrapper(data, i);
    size  = size;
    addPoint(lat, lng, size, color, subgeo);
  }

  if (opts.animated) {
    baseGeometry.morphTargets.push({'name': opts.name, vertices: subgeo.vertices});
  } else {
    baseGeometry = subgeo;
  }
};

export function createPoints(scene) {
  var padding;

  var material = new THREE.MeshPhongMaterial({
    color: 0x666666,
    vertexColors: THREE.FaceColors,
    morphTargets: false
  });

  if (is_animated) {
    if (baseGeometry.morphTargets.length < 8) {
      padding = 8 - baseGeometry.morphTargets.length;
      for(var i = 0; i <= padding; i++) {
        baseGeometry.morphTargets.push({'name': 'morphPadding' + i, vertices: baseGeometry.vertices});
      }
    }
    material.morphTargets = true;
  }

  points = new THREE.Mesh(baseGeometry, material);
  scene.add(points);
}

function addPoint(lat, lng, size, color, subgeo) {

  var phi = (90 - lat) * Math.PI / 180;
  var theta = (180 - lng) * Math.PI / 180;

  point.position.x = 200 * Math.sin(phi) * Math.cos(theta);
  point.position.y = 200 * Math.cos(phi);
  point.position.z = 200 * Math.sin(phi) * Math.sin(theta);

  point.lookAt(center);

  point.scale.z = Math.max(size, 0.1);
  point.updateMatrix();

  for (var i = 0; i < point.geometry.faces.length; i++) {
    point.geometry.faces[i].color = color;
  }
  if (point.matrixAutoUpdate){
    point.updateMatrix();
  }

  subgeo.merge(point.geometry, point.matrix);
}
