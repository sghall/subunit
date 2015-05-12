import d3 from 'd3';
import THREE from 'THREE';
import { SubUnit } from 'SubUnit';
import { camera, scene, renderer } from './common/scene';
import './common/OrbitControls';
import { raycast } from './common/events';

var metal = THREE.ImageUtils.loadTexture('images/plastic.jpg', null);

d3.json('data/letters.json', function (err, data) {

  d3.select("#loading").transition().duration(800)
    .style("opacity", 0).remove();

  var size = [3000, 700]; // Width, Height

  var x = d3.scale.ordinal()
    .rangeRoundBands([0, size[0]], 0.2);

  var y = d3.scale.linear()
    .range([size[1], 0]);

  var color1 = new THREE.MeshPhongMaterial({color: '#F7FCA8'});
  var color2 = new THREE.MeshPhongMaterial({color: '#004011'});

  var backing = new THREE.BoxGeometry(size[0], size[1], 100);

  x.domain(d3.range(data.length));
  y.domain([0, d3.max(data, function (d) { return d.frequency; })]);

  data = [ // Redefine the data for multiple charts
    {color: '#739D34', data: d3.shuffle(data).slice()},
    {color: '#A1A838', data: d3.shuffle(data).slice()},
    {color: '#2F4E00', data: d3.shuffle(data).slice()},
    {color: '#4F5400', data: d3.shuffle(data).slice()}
  ];

  var root = SubUnit.select(scene);
  var container = root.append("object");

  var charts = container.selectAll("chart")
    .data(data).enter()
    .append("object")
    .tagged("chart", true)
    .each(function (d, i) {
      this.position.y = i * size[1];
    });

  charts.append("mesh")
    .attr("tags", "backing")
    .attr("material", function (d) {
      var opts = {color: d.color, map: metal};
      return new THREE.MeshPhongMaterial(opts);
    })
    .attr("geometry", backing)
    .each(function () {
      this.position.z = -50;
      this.position.x = size[0] / 2;
    });

  var bars = charts.selectAll("bar")
    .data(function (d) {return d.data; }).enter()
    .append("mesh")
    .attr("tags", "bar")
    .attr("material", color1)
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

      if (this.material === color1) {
        this.material = color2;
      } else {
        this.material = color1;
      }
    });

  container.node().position.x = -size[0] / 2;
  container.node().position.y = (-size[1] * 2) + size[1] / 2;

  camera.position.z = 2500;

  raycast(camera, d3.merge(bars), 'click');


  console.log("root: ", window.root = root);

  var control = new THREE.OrbitControls(camera, renderer.domElement);
  control.zoomSpeed = 0.1;

  function animate() {
    control.update();
    charts.each(function () {
      this.rotation.x += 0.005;
    });

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  animate();
});
