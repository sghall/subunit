import d3 from 'd3';
import THREE from 'THREE';
import { SubUnit } from 'SubUnit';
import { camera, scene, renderer } from './common/scene';
import './common/OrbitControls';
import './common/EffectComposer';
import './common/CopyShader';
import './common/MirrorShader';
import './common/RenderPass';
import './common/ShaderPass';
import './common/MaskPass';

var circleRadius = 180;
var squareCount  = 110;
var squareSize = 60;

var speed = 0.002;

var metal = THREE.ImageUtils.loadTexture('images/metal.jpg', null);

var options  = {map: metal};
var material = new THREE.MeshPhongMaterial(options);
var geometry = new THREE.PlaneBufferGeometry(squareSize, squareSize);

d3.select("#loading").transition().duration(500)
  .style("opacity", 0).remove();

var root = SubUnit.select(scene)
  .attr("scale", {x: 0.1, y: 0.1, z: 0.1});

root.transition().duration(4000).ease("bounce")
  .attr("scale", {x: 3, y: 3, z: 3});

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

var renderPass = new THREE.RenderPass(scene, camera);
var mirrorPass = new THREE.ShaderPass(THREE.MirrorShader);

var composer = new THREE.EffectComposer(renderer);
composer.addPass(renderPass);
composer.addPass(mirrorPass);

mirrorPass.renderToScreen = true;
mirrorPass.uniforms.side.value = 0;

console.log("root: ", window.root = root, root);

var control = new THREE.OrbitControls(camera, renderer.domElement);
control.noRotate = true;

function animate() {
  control.update();
  composer.render(0.1);
  requestAnimationFrame(animate);
}

animate();
