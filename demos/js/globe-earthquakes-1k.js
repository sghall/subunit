import d3 from 'd3';
import THREE from 'THREE';
import { SubUnit } from 'SubUnit';
import { camera, scene, renderer } from './common/scene';
import './common/OrbitControls';
import { raycast } from './common/events';
import { getCoords, materialsCache } from './common/geo';

var world = THREE.ImageUtils.loadTexture('images/world.jpg', null);

var quake = new THREE.BoxGeometry(0.5, 0.5, 1);
quake.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, -0.5));

var earth = new THREE.MeshPhongMaterial({map: world, shininess: 50});
var sphere = new THREE.SphereGeometry(200, 40, 40);

var magScale = d3.scale.pow().exponent(3)
  .range([0, 150]).domain([0, 10]);

var colorScale = d3.scale.quantile()
  .range(['#fff5eb', '#fdd0a2', '#fd8d3c', '#d94801', '#7f2704', '#ff0000'])
  .domain([0, 10]);

var getColor = materialsCache(colorScale);

var highlight = getColor(10);

d3.json('data/earthquakes.json', function (err, json) {

  d3.select("#loading").transition().duration(500)
    .style("opacity", 0).remove();

  var data = d3.shuffle(json).slice(0, 1000);

  var root = SubUnit.select(scene);

  var globe = root.append("mesh")
    .attr("material", earth)
    .attr("geometry", sphere);

  globe.node().rotation.y = Math.PI;

  var quakes = root.selectAll("quake")
    .data(data).enter()
    .append("mesh")
    .attr("tags", "quake")
    .attr("geometry", quake)
    .attr("material", function (d) {
      return getColor(d.mag);
    })
    .each(function (d) {
      this.position.copy(getCoords(d.lat, d.lng));
      this.lookAt(root.node().position);
      this.scale.z = Math.max(magScale(d.mag), 0.1);
      this.updateMatrix();
    })
    .on("click", function (event, d) {
      d3.select("#msg").html(d.dsc);

      if (this.material !== highlight) {
        this.material = highlight;
      } else {
        this.material = getColor(d.mag);
      }
    });

  root.node().rotation.y = Math.PI;
  root.node().rotation.x = Math.PI / 6;
  root.node().scale.set(2.75, 2.75, 2.75);

  raycast(camera, quakes[0], 'click');

  var control = new THREE.OrbitControls(camera, renderer.domElement);
  control.zoomSpeed = 0.1;

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
