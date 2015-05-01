import d3 from 'd3';
import THREE from 'THREE';
import { Selection } from 'src/core/Selection';
import { Transition } from 'src/core/Transition';
import { EnterSelection } from 'src/core/EnterSelection';
import { SubUnitArray } from 'src/core/SubUnitArray';
import { SubUnit } from 'src/subunit';
import { camera, scene, renderer } from 'demos/modules/scene';

console.log("Selection", window.Selection = Selection);
console.log("Transition", window.Transition = Transition);
console.log("EnterSelection", window.EnterSelection = EnterSelection);
console.log("SubUnitArray", window.SubUnitArray = SubUnitArray);
console.log("SubUnit", window.SubUnit = SubUnit);


d3.json('data/letters.json', function (err, data) {

  var size = [1000, 600]; // Width, Height

  var x = d3.scale.ordinal()
    .rangeRoundBands([0, size[0]], 0.1, 1);

  var y = d3.scale.linear()
    .range([size[1], 0]);

  var material1 = new THREE.MeshPhongMaterial({color: '#4183c4'});
  var material2 = new THREE.MeshPhongMaterial({color: '#888888'});

  x.domain(data.map(function (d) { return d.letter; }));
  y.domain([0, d3.max(data, function (d) { return d.frequency; })]);

  var root = SubUnit.select(scene);

  var container = root.append('object');
  container.node().translateX(-size[0]);

  container.selectAll("bar")
    .data(data).enter()
    .append("mesh")
    .attr("tags", "bar")
    .tagged("big", function (d) {
      return d.frequency > 0.07;
    })
    .attr("material", material1)
    .attr("geometry", function (d) {
      var w = x.rangeBand();
      var h = size[1] - y(d.frequency);
      return new THREE.BoxGeometry(w, h, 5);
    })
    .each(function (d) {
      var x0 = x(d.letter);
      var y0 = -y(d.frequency) / 2;
      this.position.set(x0, y0, 240);
    });

  container.selectAll("bar.big")
    .attr("material", material2);

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  console.log("root: ", window.root = root);

  animate();
});
