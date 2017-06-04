import d3 from 'd3';
import THREE from 'THREE';
import { SubUnit } from 'SubUnit';
import { camera, scene, renderer } from './common/scene';
import './common/OrbitControls';
import { raycast } from './common/events';
import { sphere } from './common/layouts';

var metal = THREE.ImageUtils.loadTexture('images/metal.jpg', null);

d3.json('data/letters.json', function (err, data) {

  d3.select("#loading").transition().duration(800)
    .style("opacity", 0).remove();

  var size = [1000, 700]; // Chart width, height

  var x = d3.scale.ordinal().rangeRoundBands([0, size[0]], 0.2);
  var y = d3.scale.linear().range([size[1], 0]);

  var black = new THREE.MeshPhongMaterial({color: '#222222'});
  var red = new THREE.MeshPhongMaterial({color: '#ff0000'});

  var backing = new THREE.PlaneBufferGeometry(size[0], size[1]);

  x.domain(d3.range(data.length));
  y.domain([0, d3.max(data, function (d) { return d.frequency; })]);

  var root = SubUnit.select(scene);
  var container = root.append("g");

  data = data.sort(function (a, b) { return b.frequency - a.frequency; });

  var charts = container.selectAll("chart")
    .data(data).enter()
    .append("object")
    .tagged("chart", true)
    .each(function (d, i) {
      var pos = sphere(i, data.length, 1800);
      this.position.copy(pos);
      this.lookAt(container.node().position);
    });

  charts.append("mesh")
    .attr("tags", "backing")
    .attr("material", new THREE.MeshPhongMaterial({map: metal}))
    .attr("geometry", backing)
    .each(function () {
      this.position.x = size[0] / 2;
    });

  var bars = charts.selectAll("bar")
    .data(function () { return data; }).enter()
    .append("mesh")
    .attr("tags", "bar")
    .attr("material", black)
    .attr("geometry", function (d) {
      var w = x.rangeBand();
      var h = size[1] - y(d.frequency);
      return new THREE.BoxGeometry(w, h, 5);
    })
    .each(function (d, i) {
      var x0 = x(i) + x.rangeBand() / 2;
      var y0 = -y(d.frequency) / 2;
      this.position.set(x0, y0, 0);
    })
    .on('click', function (event, d) {
      d3.select("#msg").html("Letter: " + d.letter);

      if (this.material === black) {
        this.material = red;
      } else {
        this.material = black;
      }
    });

  container.node().scale.set(0.65, 0.65, 0.65);

  camera.position.z = 2500;

  raycast(camera, d3.merge(bars), 'click');

  var theta = 0.003;

  console.log("root: ", window.root = root);

  var control = new THREE.OrbitControls(camera, renderer.domElement);

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
