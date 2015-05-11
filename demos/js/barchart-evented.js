import d3 from 'd3';
import THREE from 'THREE';
import { SubUnit } from 'SubUnit';
import { camera, scene, renderer } from './common/scene';
import './common/OrbitControls';
import { raycast } from './common/events';

d3.json('data/letters.json', function (err, data) {

  d3.select("#loading").transition().duration(800)
    .style("opacity", 0).remove();

  var size = [1000, 600]; // Width, Height

  var x = d3.scale.ordinal()
    .rangeRoundBands([0, size[0]], 0.2);

  var y = d3.scale.linear()
    .range([size[1], 0]);

  var blue = new THREE.MeshPhongMaterial({color: '#4183c4'});
  var grey = new THREE.MeshPhongMaterial({color: '#666666'});

  x.domain(data.map(function (d) { return d.letter; }));
  y.domain([0, d3.max(data, function (d) { return d.frequency; })]);

  var root = SubUnit.select(scene);
  root.node().position.set(-size[0] / 2, 0, 0);

  var bars = root.selectAll("bar")
    .data(data).enter()
    .append("mesh")
    .attr("tags", "bar")
    .attr("material", blue)
    .attr("geometry", function (d) {
      var w = x.rangeBand();
      var h = size[1] - y(d.frequency);
      return new THREE.BoxGeometry(w, h, 5);
    })
    .each(function (d) {
      var x0 = x(d.letter);
      var y0 = -y(d.frequency) / 2;
      this.position.set(x0, y0, 240);
    })
    .on('click', function (event, d) {
      d3.select("#msg").html("Letter: " + d.letter);

      if (this.material === blue) {
        this.material = grey;
      } else {
        this.material = blue;
      }
    });

  raycast(camera, bars[0], 'click');

  console.log("root: ", window.root = root);

  var control = new THREE.OrbitControls(camera, renderer.domElement);

  function animate() {
    control.update();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  animate();
});
