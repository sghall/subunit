import d3 from 'd3';
import THREE from 'three';
import Subunit from 'subunit';
import { camera, scene, renderer } from './common/scene.js';
import './common/OrbitControls.js';
import { raycast } from './common/events.js';
import { getLabel, getText } from './common/text.js';
import { sphere } from './common/layouts.js';

d3.csv('data/quotes.csv', function (err, data) {

  data = d3.shuffle(data).slice(0, 200);

  const cardWidth = 400;

  d3.select('#loading').remove();

  const rootNode = Subunit.select(scene)
    .attr('scale', { x: 0.005, y: 0.005, z: 0.005 });

  rootNode.transition().duration(2000)
    .attr('scale', { x: 0.255, y: 0.255, z: 0.255 });

  const nodes = rootNode.selectAll('node')
    .data(data).enter()
    .append('object')
    .attr('position', function (d, i) {
      return sphere(i, data.length, 3000);
    })
    .attr('lookAt', rootNode.node().position)
    .attr('rotation', { y: Math.PI });

  const quotes = nodes.append('mesh')
    .attr('tags', 'quote')
    .each(function (d) {
      const quote = getText(d.quote, '#ff0004', 20, cardWidth);

      this.material = new THREE.MeshBasicMaterial({
        map: quote.map,
        side: THREE.DoubleSide,
        transparent: true
      });

      this.geometry = new THREE.PlaneBufferGeometry(cardWidth, quote.height);
    })
    .on('click', function () {
      Subunit.object(this)
        .transition().duration(1000)
        .attr('rotation', { x: Math.PI * 2 })
        .each('end', function () {
          this.rotation.x = 0;
        });
    });

  const author = nodes.append('mesh')
    .attr('tags', 'name')
    .each(function (d) {
      const quote = getText(d.quote, '#ff0004', 20, cardWidth);
      const label = getLabel('-' + d.name, '#fff', 30);

      this.material = new THREE.MeshBasicMaterial({
        map: label.map,
        side: THREE.DoubleSide,
        transparent: true
      });

      this.geometry = new THREE.PlaneBufferGeometry(label.width, label.height);

      const x = quote.width / 2 - label.width / 2;
      const y = -quote.height / 2 - label.height;

      this.position.set(x, y, 0);
    })
    .on('click', function () {
      Subunit.object(this)
        .transition().duration(2000)
        .attr('rotation', { z: Math.PI * 2 })
        .each('end', function () {
          this.rotation.z = 0;
        });

      const PY = this.parentNode.rotation.y;
      const PZ = this.parentNode.rotation.z;
      const P2 = Math.PI * 2;

      Subunit.object(this.parentNode)
        .transition().duration(2000)
        .attr('rotation', { y: PY + P2, z: PZ + P2 })
        .each('end', function () {
          this.rotation.y = PY;
          this.rotation.z = PZ;
        });
    });

  raycast(camera, quotes.nodes(), 'click');
  raycast(camera, author.nodes(), 'click');

  console.log('rootNode', window.rootNode = rootNode[0]);

  const control = new THREE.OrbitControls(camera, renderer.domElement);
  control.zoomSpeed = 0.1;
  control.rotateSpeed = 0.3;

  function animate() {
    control.update();
    requestAnimationFrame(animate);
    render();
  }

  function render() {
    renderer.render(scene, camera);
  }
  animate();
});
