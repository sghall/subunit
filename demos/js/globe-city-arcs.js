import d3 from 'd3';
import THREE from 'THREE';
import { SubUnit } from 'SubUnit';
import { camera, scene, renderer } from './common/scene';
import './common/OrbitControls';
import { raycast } from './common/events';
import { getCoords, arc, lineCache } from './common/geo';

var world = THREE.ImageUtils.loadTexture('images/world.jpg', null);

var colors = d3.scale.ordinal()
  .range(['#542437', '#53777A', '#ECD078', '#D95B43', '#C02942', '#556270', '#4ECDC4']);

var getColor = lineCache(colors);

var earth  = new THREE.MeshPhongMaterial({map: world, shininess: 50});
var sphere = new THREE.SphereGeometry(200, 40, 40);

var highlight = new THREE.LineBasicMaterial({
  color: '#EEEE00', linewidth: 3
});

d3.json('data/top-cities.json', function (err, cities) {

  d3.select("#loading").transition().duration(500)
    .style("opacity", 0).remove();

  // GENERATE SOME MOCK DATA
  var data = [];
  for (var i = 0; i < cities.length; i += 2) {
    for (var j = 1; j < cities.length; j += 2) {
      if (i !== j) {
        data.push({
          source: cities[i],
          target: cities[j]
        });
      }
    }
  }

  var root = SubUnit.select(scene);

  var globe = root.append("mesh")
    .attr("material", earth)
    .attr("geometry", sphere);

  globe.node().rotation.y = Math.PI;

  var arcs = root.selectAll("line")
    .data(data).enter()
    .append("line")
    .attr("tags", "line")
    .attr("geometry", function (d) {
      var s = getCoords(d.source.lat, d.source.lng, true);
      var t = getCoords(d.target.lat, d.target.lng, true);
      return arc(s, t, 10);
    })
    .attr("material", function (d) {
      return getColor(d.source.name, 1.5);
    })
    .on("click", function (event, d) {
      d3.select("#msg").html(function () {
        return d.source.name + " to " + d.target.name;
      });

      arcs.attr("material", function (g) {
        return getColor(g.source.name, 1.5);
      });

      this.material = highlight;
    });

  root.node().rotation.y = Math.PI;
  root.node().rotation.x = Math.PI / 6;
  root.node().scale.set(2.75, 2.75, 2.75);

  raycast(camera, arcs[0], 'click');

  var control = new THREE.OrbitControls(camera, renderer.domElement);
  control.zoomSpeed = 0.1;

  function animate() {
    control.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  animate();
});
