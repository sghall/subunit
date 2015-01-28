// Inspired by http://nisatapps.prio.org/armsglobe/

var origin = new THREE.Vector3(0,0,0);

export function lines( beg, end, value, type ){

  var distanceBetweenCountryCenter = exporter.distanceTo(exporter);

  var globeRadius = 1000;
  var anchorHeight = globeRadius + distanceBetweenCountryCenter * 0.7;
  
  var mid = beg.clone().lerp(end, 0.5);
  var midLength = mid.length()
  mid.normalize();
  mid.multiplyScalar(midLength + distanceBetweenCountryCenter * 0.7 );

  var normal = (new THREE.Vector3()).sub(beg,end);
  normal.normalize();

  var distanceHalf = distanceBetweenCountryCenter * 0.5;

  var begAnchor    = beg;
  var midbegAnchor = mid.clone().addSelf(normal.clone().multiplyScalar( distanceHalf));
  var midEndAnchor = mid.clone().addSelf(normal.clone().multiplyScalar(-distanceHalf));
  var endAnchor    = end;

  var splineCurveA = new THREE.CubicBezierCurve3(beg, begAnchor, midbegAnchor, mid);
  var splineCurveB = new THREE.CubicBezierCurve3(mid, midEndAnchor, endAnchor, end);

  var vertexCountDesired = Math.floor(distanceBetweenCountryCenter * 0.02 + 6 ) * 2;

  var points = splineCurveA.getPoints(vertexCountDesired);
  points = points.splice(0, points.length - 1);  // Avoid Duplicate
  points = points.concat(splineCurveB.getPoints(vertexCountDesired));

  points.push(origin);

  var val = value * 0.0003;
  
  var size = (10 + Math.sqrt(val));
  size = constrain(size,0.1, 60);

  var curveGeometry = THREE.Curve.Utils.createLineGeometry(points);
  curveGeometry.size = size;

  return curveGeometry;
}

function constrain(v, min, max){
  if( v < min )
    v = min;
  else
  if( v > max )
    v = max;
  return v;
}