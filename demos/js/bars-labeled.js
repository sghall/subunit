import d3 from 'd3';
import THREE from 'three';
import SubUnit from 'subunit';
import { camera, scene, renderer } from './common/scene.js';
import './common/OrbitControls.js';
import { raycast } from './common/events.js';

d3.json('data/letters.json', function (err, data) {

  d3.select('#loading').transition().duration(800)
    .style('opacity', 0).remove();

  const size = [1000, 600]; // [width, height]

  const x = d3.scaleBand()
    .range([0, size[0]])
    .padding(0.3);

  const y = d3.scaleLinear()
    .range([size[1], 0]);

  const blue = new THREE.MeshPhongMaterial({ color: '#4183c4' });
  const grey = new THREE.MeshPhongMaterial({ color: '#666666' });

  x.domain(data.map(function (d) { return d.letter; }));
  y.domain([0, d3.max(data, function (d) { return d.frequency; })]);

  const rootNode = SubUnit.select(scene);
  rootNode.node().position.set(-size[0] / 2, 0, 0);

  const bars = rootNode.selectAll('bar')
    .data(data).enter()
    .append('mesh')
    .attr('tags', 'bar')
    .attr('material', blue)
    .attr('geometry', (d) => {
      const w = x.bandwidth();
      const h = size[1] - y(d.frequency);
      return new THREE.BoxGeometry(w, h, 5);
    })
    .each(function (d) {
      const x0 = x(d.letter);
      const y0 = -y(d.frequency) / 2;
      this.position.set(x0, y0, 240);
    })
    .on('click', function (event, d) {
      d3.select('#msg').html('Letter: ' + d.letter);

      if (this.material === blue) {
        this.material = grey;
      } else {
        this.material = blue;
      }
    });

  const materialOptions = { color: '#fff', shading: THREE.FlatShading };
  const material = new THREE.MeshPhongMaterial(materialOptions);

  const loader = new THREE.FontLoader();

  loader.load('fonts/helvetiker_regular.typeface.json', function(font) {
    const textOptions = {
      font,
      size: 30,
      height: 5,
      curveSegments: 20,
      bevelEnabled: false,
    };

    bars.append('mesh')
      .tagged('label', true)
      .attr('material', material)
      .attr('geometry', function (d) {
        const text = new THREE.TextGeometry(d.letter, textOptions);
        text.computeBoundingBox();
        text.computeVertexNormals();
        return text;
      })
      .each(function () {
        const min = this.geometry.boundingBox.min.x;
        const max = this.geometry.boundingBox.max.x;
        this.position.set(-0.5 * (max - min), 0, 10);
      });
  });

  raycast(camera, bars.nodes(), 'click');

  const control = new THREE.OrbitControls(camera, renderer.domElement);

  function animate() {
    control.update();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  animate();
});
