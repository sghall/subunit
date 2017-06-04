import THREE from 'three';

const raycaster = new THREE.Raycaster();

export function raycast(camera, items, type) {

  const listener = function(event) {
    const vector = new THREE.Vector3();

    const x = ((event.clientX - 1) / window.innerWidth ) * 2 - 1;
    const y = -((event.clientY - 1) / window.innerHeight) * 2 + 1;

    vector.set(x, y, 0.5);
    vector.unproject(camera);

    raycaster.ray.set(camera.position, vector.sub(camera.position).normalize());

    const target = raycaster.intersectObjects(items, true);

    if (target.length) {
      target[0].type = type;
      target[0].object.dispatchEvent(target[0]);
    }

  };

  document.addEventListener(type, listener, false);
}
