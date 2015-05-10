import d3 from 'd3';
import THREE from 'THREE';
import { SubUnit } from '../../src/index';
import { camera, scene, renderer } from './common/scene';
import { Control } from '../../node_modules/bungalow/src/Control';

d3.json('data/letters.json', function (err, data) {

  var size = [1000, 600]; // Width, Height

  var xScale = d3.scale.ordinal()
    .rangeRoundBands([0, size[0]], 0.2);

  var yScale = d3.scale.linear()
    .range([size[1], 0]);

  var material1 = new THREE.MeshPhongMaterial({color: '#4183c4'});
  var material2 = new THREE.MeshPhongMaterial({color: '#888888'});

  xScale.domain(data.map(function (d) { return d.letter; }));
  yScale.domain([0, d3.max(data, function (d) { return d.frequency; })]);

  var root = SubUnit.select(scene);
  root.node().position.x = -size[0] / 2;

  var bars = root.selectAll("bar")
    .data(data).enter()
    .append("mesh")
    .attr("tags", "bar")
    .tagged("big", function (d) {
      return d.frequency > 0.07;
    })
    .attr("material", material1)
    .attr("geometry", function (d) {
      var w = xScale.rangeBand();
      var h = size[1] - yScale(d.frequency);
      return new THREE.BoxGeometry(w, h, 5);
    })
    .each(function (d) {
      var x0 = xScale(d.letter);
      var y0 = -yScale(d.frequency) / 2;
      this.position.set(x0, y0, 240);
    });

  bars.transition()
    .delay(50).duration(3000).ease("bounce")
    .attr("position", function (d, i) {
      return {x: i * 100};
    })
    .transition()
    .attr("position", function (d) {
      var x0 = xScale(d.letter);
      var y0 = -yScale(d.frequency) / 2;
      return {x: x0, y: y0, z: 240};
    });

  console.log("root: ", window.root = root);

  root.selectAll("bar.big")
    .attr("material", material2);

  var control = new Control(camera, renderer.domElement);

  function animate() {
    control.update();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }


  animate();
});
