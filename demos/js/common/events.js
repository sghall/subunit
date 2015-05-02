var raycaster = new THREE.Raycaster();

export function raycast(camera, items, type) {

  var listener = function(event) {
    var vector = new THREE.Vector3();

    var mouse = {
      x:  ((event.clientX - 1) / window.innerWidth ) * 2 - 1,
      y: -((event.clientY - 1) / window.innerHeight) * 2 + 1
    };

    vector.set(mouse.x, mouse.y , 0.5);
    vector.unproject(camera);

    raycaster.ray.set(camera.position, vector.sub(camera.position).normalize());

    var target = raycaster.intersectObjects(items);

    if (target.length) {
      target[0].type = type;
      target[0].object.dispatchEvent(target[0]);
    }

  };

  document.addEventListener(type, listener, false);
}
