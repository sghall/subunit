import d3 from 'd3';
import THREE from 'THREE';
import { SubUnit } from 'SubUnit';
import { camera, scene, renderer } from './common/scene';
import './common/OrbitControls';

var circleRadius = 180;
var squareCount  = 100;
var squareSize = 78;

var speed = 0.002;

var metal = THREE.ImageUtils.loadTexture('images/metal.jpg', null);


var options  = {map: metal};
var material = new THREE.MeshPhongMaterial(options);
var geometry = new THREE.PlaneBufferGeometry(squareSize, squareSize);

d3.select("#loading").transition().duration(500)
  .style("opacity", 0).remove();

var root = SubUnit.select(scene);

var containers = root.selectAll("rect")
  .data(d3.range(squareCount))
  .enter().append("object")
  .datum(function(i) { return i / squareCount; })
  .attr("rotation", function (d) {
    return {z: d * Math.PI * 2};
  })
  .attr("translation", function () {
    return {x: circleRadius};
  });

containers.append("mesh")
  .datum(function(i) { return i / squareCount; })
  .attr("material", material)
  .attr("geometry", geometry)
  .attr("translation", function () {
    return {z: Math.PI / 5};
  });


d3.timer(function(elapsed) {
  containers.each(function (t) {
    this.rotation.z = -(t * Math.PI * 2 + (elapsed * speed));
  });
});

console.log("root: ", window.root = root, root);

var control = new THREE.OrbitControls(camera, renderer.domElement);
control.noRotate = true;

function animate() {
  control.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
