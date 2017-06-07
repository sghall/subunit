import d3 from 'd3';
import THREE from 'three';
import Subunit from 'subunit';
import { camera, scene, renderer } from './common/scene.js';
import './common/OrbitControls.js';
import { raycast } from './common/events.js';
import { sphere } from './common/layouts.js';

const metal = THREE.ImageUtils.loadTexture('images/metal.jpg', null);

d3.json('data/letters.json', function (err, data) {

  d3.select('#loading').transition().duration(800)
    .style('opacity', 0).remove();

  const size = [1000, 2000]; // [width, height]

  const x = d3.scaleBand().range([0, size[0]]).padding(0.2);
  const y = d3.scaleLinear().range([size[1], 0]);

  const black = new THREE.MeshPhongMaterial({ color: '#ffffff' });
  const red = new THREE.MeshPhongMaterial({ color: '#ff0000' });

  const backing = new THREE.PlaneBufferGeometry(size[0], size[1]);

  x.domain(d3.range(data.length));
  y.domain([0, d3.max(data, function (d) { return d.frequency; })]);

  const root = Subunit.select(scene);
  const container = root.append('object');

  data = data.sort(function (a, b) { return b.frequency - a.frequency; });

  const charts = container.selectAll('chart')
    .data(data).enter()
    .append('object')
    .tagged('chart', true)
    .each(function (d, i) {
      const pos = sphere(i, data.length, 1800);
      this.position.copy(pos);
      this.lookAt(container.node().position);
    });

  // charts.append('mesh')
  //   .attr('tags', 'backing')
  //   .attr('material', new THREE.MeshPhongMaterial({ map: metal }))
  //   .attr('geometry', backing)
  //   .each(function () {
  //     this.position.x = size[0] / 2;
  //   });

  const bars = charts.selectAll('bar')
    .data(function () { return data; }).enter()
    .append('mesh')
    .attr('tags', 'bar')
    .attr('material', black)
    .attr('geometry', function (d) {
      const w = x.bandwidth();
      const h = size[1] - y(d.frequency);
      return new THREE.BoxGeometry(w, h, 5);
    })
    .each(function (d, i) {
      const x0 = x(i) + x.bandwidth() / 2;
      const y0 = -y(d.frequency) / 2;
      this.position.set(x0, y0, 0);
    })
    .on('click', function (event, d) {
      d3.select('#msg').html('Letter: ' + d.letter);

      if (this.material === black) {
        this.material = red;
      } else {
        this.material = black;
      }
    });

  container.node().scale.set(0.65, 0.65, 0.65);

  camera.position.z = 1500;

  raycast(camera, bars.nodes(), 'click');

  const theta = 0.003;

  console.log('root: ', window.root = root);

  const control = new THREE.OrbitControls(camera, renderer.domElement);

  function animate() {
    control.update();
    root.node().rotation.y += theta;

    bars.each(function (d, i) {
      this.rotation.x += theta * ((i + 1) * 2);
    });

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
});
