var raycaster = new THREE.Raycaster();

export function mouseDown(camera, selection, func) {
  return function onMouseDown (event) {

    var vector = new THREE.Vector3();

    var mouse = {
      x: ((event.clientX - 1) / window.innerWidth) * 2 - 1,
      y: -((event.clientY - 1) / window.innerHeight ) * 2 + 1
    };

    vector.set(mouse.x, mouse.y , 0.5);
    vector.unproject(camera);

    raycaster.ray.set(camera.position, vector.sub(camera.position).normalize());

    var target = raycaster.intersectObjects(selection[0]);

    if (target.length) { //NEED TO ABSTRACT THIS OUT
      subunit.selectObject(target[0].object)
        .attr("material", func);
    }
  };
}

