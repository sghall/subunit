import d3 from 'd3';
import THREE from 'THREE';
import { SubUnit } from 'SubUnit';
import { camera, scene, renderer } from './common/scene';
import './common/OrbitControls';

d3.json('data/letters.json', function (err, data) {

  d3.select("#loading").transition().duration(800)
    .style("opacity", 0).remove();

  var size = [1000, 600]; // Width, Height

  var xScale = d3.scale.ordinal()
    .rangeRoundBands([0, size[0]], 0.2);

  var yScale = d3.scale.linear()
    .range([size[1], 0]);

  var material1 = new THREE.MeshPhongMaterial({color: '#4183c4'});

  xScale.domain(data.map(function (d) { return d.letter; }));
  yScale.domain([0, d3.max(data, function (d) { return d.frequency; })]);

  var root = SubUnit.select(scene);
  root.node().position.set(size[0], 0, -3000);

  root.transition().ease("elastic").duration(3000)
    .attr({
      position: {x: -size[0] / 2, z: -500},
      rotation: {_x: Math.PI * 4}
    })
    .transition().duration(2000)
    .attr("position", {z: 200});

  root.selectAll("bar")
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
    .transition()
    .duration(3000).ease("quad")
    .attr("position", function (d, i) {
      return {x: i * 100};
    })
    .transition().ease("bounce").duration(3000)
    .attr({
      position: function (d) {
        var x0 =  xScale(d.letter);
        var y0 = -yScale(d.frequency) / 2;
        return {x: x0, y: y0, z: 250};
      },
      rotation: function () {
        return {_z: Math.PI * 2, _y: Math.PI * 2};
      }
    });

  var control = new THREE.OrbitControls(camera, renderer.domElement);

  function animate() {
    control.update();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }


  animate();
});
