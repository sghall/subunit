import d3 from 'd3';
import THREE from 'three';
import Subunit from 'subunit';
import { camera, scene, renderer } from './common/scene.js';
import './common/OrbitControls.js';
import './common/EffectComposer.js';
import './common/CopyShader.js';
import './common/MirrorShader.js';
import './common/RenderPass.js';
import './common/ShaderPass.js';
import './common/MaskPass.js';

const circleRadius = 180;
const squareCount  = 100;
const squareSize = 80;

const speed = 0.003;

const metal = new THREE.TextureLoader().load('images/metal.jpg');

const material = new THREE.MeshPhongMaterial({ map: metal });
const geometry = new THREE.PlaneBufferGeometry(squareSize, squareSize);

d3.select('#loading').transition().duration(500)
  .style('opacity', 0).remove();

const rootNode = Subunit.select(scene)
  .attr('scale', { x: 3, y: 3, z: 3 });

const containers = rootNode.selectAll('rect')
  .data(d3.range(squareCount))
  .enter().append('object')
  .datum(function(i) { return i / squareCount; })
  .attr('rotation', function (d) {
    return { z: d * Math.PI * 2 };
  })
  .attr('translation', function () {
    return { x: circleRadius };
  });

containers.append('mesh')
  .datum(function(i) { return i / squareCount; })
  .attr('material', material)
  .attr('geometry', geometry)
  .attr('translation', function () {
    return { z: Math.PI / 5 };
  });

d3.timer(function(elapsed) {
  containers.each(function (t) {
    this.rotation.z = -(t * Math.PI * 2 + (elapsed * speed));
  });
});

const renderPass = new THREE.RenderPass(scene, camera);
const mirrorPass = new THREE.ShaderPass(THREE.MirrorShader);

const composer = new THREE.EffectComposer(renderer);
composer.addPass(renderPass);
composer.addPass(mirrorPass);

mirrorPass.renderToScreen = true;
mirrorPass.uniforms.side.value = 0;

console.log('rootNode: ', window.rootNode = rootNode, rootNode);

const control = new THREE.OrbitControls(camera, renderer.domElement);
control.noRotate = true;

function animate() {
  control.update();
  composer.render(0.8);
  requestAnimationFrame(animate);
}

animate();
