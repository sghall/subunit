import THREE from 'three';

const temp = new THREE.Object3D();

export function sphere(i, count, size) {

  const vector = new THREE.Vector3();

  const phi = Math.acos(-1 + ( 2 * i ) / (count - 1));
  const theta = Math.sqrt((count - 1) * Math.PI) * phi;

  temp.position.x = size * Math.cos(theta) * Math.sin(phi);
  temp.position.y = size * Math.sin(theta) * Math.sin(phi);
  temp.position.z = size * Math.cos(phi);

  vector.copy(temp.position).multiplyScalar(2);

  return {
    x: temp.position.x,
    y: temp.position.y,
    z: temp.position.z
  };
}
