import d3 from 'd3';
import THREE from 'THREE';
import { SubUnit } from 'SubUnit';
import { camera, scene, renderer } from './common/scene';
import './common/OrbitControls';
import { uvMapper } from './common/sprite-uvs';
import { sphere } from './common/layouts';

var sprite = THREE.ImageUtils.loadTexture('images/zombies.jpg', null);

d3.json('data/zombies.json', function (err, data) {

  d3.select("#loading").transition().duration(500)
    .style("opacity", 0).remove();

  var uvsMap = uvMapper(data.images);

  var options = {map: sprite, side: THREE.DoubleSide};
  var material = new THREE.MeshLambertMaterial(options);

  var root = SubUnit.select(scene);

  var zombies = root.selectAll(".zombie")
    .data(data.images).enter()
    .append("mesh")
      .attr("tags", "zombie")
      .attr("material", material)
      .attr("geometry", function (d) {
        var geometry = new THREE.PlaneBufferGeometry(300, 430);
        var buffer = new THREE.BufferAttribute(uvsMap(d), 2);

        geometry.addAttribute('uv', buffer);

        return geometry;
      })
      .each(function (d, i) {
        this.scale.set(0.5, 0.5, 0.5);
        this.position.copy(sphere(i, data.images.length, 750));
        this.lookAt(root.node().position);
      });

  var theta = 0;
  var gamma = 0;

  var control = new THREE.OrbitControls(camera, renderer.domElement);
  control.zoomSpeed = 0.1;

  function animate() {
    control.update();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    theta += 0.01;
    gamma += 0.04;

    root.node().rotation.y = theta;

    zombies.each(function () {
      this.rotation.set(gamma, theta, 0);
    });

  }
  animate();
});
