import d3 from 'd3';
import THREE from 'three';
import SubUnit from 'subunit';
import { camera, scene, renderer } from './common/scene.js';
import './common/OrbitControls.js';

d3.json('data/letters.json', function (err, data) {

  d3.select('#loading').transition().duration(500)
    .style('opacity', 0).remove();

  const size = [1000, 600]; // [width, height]

  const x = d3.scaleBand()
    .range([0, size[0]])
    .padding(0.3);

  const y = d3.scaleLinear()
    .range([size[1], 0]);

  const material1 = new THREE.MeshPhongMaterial({ color: '#4183c4' });

  x.domain(data.map(function (d) { return d.letter; }));
  y.domain([0, d3.max(data, function (d) { return d.frequency; })]);

  const rootNode = SubUnit.select(scene);
  rootNode.node().position.x = -size[0] / 2;

  rootNode.selectAll('bar')
    .data(data).enter()
    .append('mesh')
    .attr('tags', 'bar')
    .tagged('big', function (d) {
      return d.frequency > 0.07;
    })
    .attr('material', material1)
    .attr('geometry', function (d) {
      const w = x.bandwidth();
      const h = size[1] - y(d.frequency);
      return new THREE.BoxGeometry(w, h, 5);
    })
    .each(function (d) {
      const x0 = x(d.letter);
      const y0 = -y(d.frequency) / 2;
      this.position.set(x0, y0, 240);
    });

  const control = new THREE.OrbitControls(camera, renderer.domElement);

  function animate() {
    control.update();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  animate();
});
