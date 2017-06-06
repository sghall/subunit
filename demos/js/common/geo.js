import THREE from 'three';

export function getCoords(lat, lng, flag) {
  const gamma = (90  - lat) * Math.PI / 180;
  const theta = (180 - lng) * Math.PI / 180;

  const x = 200 * Math.sin(gamma) * Math.cos(theta);
  const y = 200 * Math.cos(gamma);
  const z = 200 * Math.sin(gamma) * Math.sin(theta);

  if (flag) {
    return new THREE.Vector3(x, y, z);
  }

  return { x, y, z };
}

export function materialsCache(colorScale) {
  const cache = {};

  return function (value) {
    const color = colorScale(value);

    if (!cache[color]) {
      cache[color] = new THREE.MeshPhongMaterial({ color, shininess: 80 });
    }
    return cache[color];
  };
}

export function lineCache(colorScale) {
  const cache = {};

  return function (value, size) {
    const color = colorScale(value);

    size = size || 1;
    if (!cache[color]) {
      cache[color] = new THREE.LineBasicMaterial({ color, linewidth: size });
    }
    return cache[color];
  };
}

export function arc(beg, end){

  const distance = beg.distanceTo(end);

  const mid = beg.clone().lerp(end, 0.5);
  const midLength = mid.length();

  mid.normalize();
  mid.multiplyScalar(midLength + distance * 0.5);

  const normal = (new THREE.Vector3()).subVectors(beg, end);
  normal.normalize();

  const distanceHalf = distance * 0.5;

  const begAnchor    = beg;
  const midbegAnchor = mid.clone().add(normal.clone().multiplyScalar( distanceHalf));
  const midEndAnchor = mid.clone().add(normal.clone().multiplyScalar(-distanceHalf));
  const endAnchor    = end;

  const splineCurveA = new THREE.CubicBezierCurve3(beg, begAnchor, midbegAnchor, mid);
  const splineCurveB = new THREE.CubicBezierCurve3(mid, midEndAnchor, endAnchor, end);

  const curve = new THREE.CurvePath();
  curve.add(splineCurveA);
  curve.add(splineCurveB);

  // console.log(splineCurveA.getPoints(5));

  return new THREE.TubeBufferGeometry(curve, 100, 0.5, 8, false );
}





