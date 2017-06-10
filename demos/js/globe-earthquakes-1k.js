import d3 from 'd3';
import THREE from 'three';
import Subunit from 'subunit';
import { camera, scene, renderer } from './common/scene.js';
import './common/OrbitControls.js';
import { raycast } from './common/events.js';
import { getCoords, materialsCache } from './common/geo.js';

const world = new THREE.TextureLoader().load('images/earth.jpg');

const quake = new THREE.BoxGeometry(1, 1, 1);
quake.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, -0.5));

const earth = new THREE.MeshPhongMaterial({ map: world, shininess: 50 });
const sphere = new THREE.SphereGeometry(200, 40, 40);

const magScale = d3.scalePow().exponent(3)
  .range([0, 150]).domain([0, 10]);

const colorScale = d3.scaleQuantile()
  .range(['#fff5eb', '#fdd0a2', '#fd8d3c', '#d94801', '#7f2704', '#ff0000'])
  .domain([0, 10]);

const getColor = materialsCache(colorScale);

const highlight = getColor(10);

d3.json('data/earthquakes.json', function (err, json) {

  d3.select('#loading').transition().duration(500)
    .style('opacity', 0).remove();

  const data = d3.shuffle(json).slice(0, 1000);

  const rootNode = Subunit.select(scene);

  const globe = rootNode.append('mesh')
    .attr('material', earth)
    .attr('geometry', sphere);

  globe.node().rotation.y = Math.PI;

  const quakes = rootNode.selectAll('quake')
    .data(data).enter()
    .append('mesh')
    .attr('tags', 'quake')
    .attr('geometry', quake)
    .attr('material', function (d) {
      return getColor(d.mag);
    })
    .each(function (d) {
      this.position.copy(getCoords(d.lat, d.lng));
      this.lookAt(rootNode.node().position);
      this.scale.z = Math.max(magScale(d.mag), 0.1);
      this.updateMatrix();
    })
    .on('click', function (event, d) {
      d3.select('#msg').html(d.dsc);

      if (this.material !== highlight) {
        this.material = highlight;
      } else {
        this.material = getColor(d.mag);
      }
    });

  rootNode.node().rotation.y = Math.PI;
  rootNode.node().rotation.x = Math.PI / 6;
  rootNode.node().scale.set(2.75, 2.75, 2.75);

  raycast(camera, quakes.nodes(), 'click');

  const control = new THREE.OrbitControls(camera, renderer.domElement);
  control.zoomSpeed = 0.1;
  control.enablePan = false;

  console.log('rootNode: ', window.rootNode = rootNode, rootNode);

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
