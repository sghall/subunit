import d3 from 'd3';
import THREE from 'THREE';
import { SubUnit } from 'SubUnit';
import { camera, scene, renderer } from './common/scene';
import './common/OrbitControls';
import { raycast } from './common/events';
import { getLabel, getText } from './common/text';
import { sphere } from './common/layouts';

d3.csv('data/quotes.csv', function (err, data) {

  data = d3.shuffle(data).slice(0, 200);

  var cardWidth = 400;

  d3.select("#loading").remove();

  var root = SubUnit.select(scene)
    .attr("scale", {x: 0.005, y: 0.005, z: 0.005});

  root.transition().duration(2000)
    .attr("scale", {x: 0.255, y: 0.255, z: 0.255});

  var nodes = root.selectAll("node")
    .data(data).enter()
    .append("object")
    .attr("position", function (d, i) {
      return sphere(i, data.length, 3000);
    })
    .attr("lookAt", root.node().position)
    .attr("rotation", {y: Math.PI});

  var quotes = nodes.append("mesh")
    .attr("tags", "quote")
    .each(function (d) {
      var quote = getText(d.quote, "#ff0004", 20, cardWidth);

      this.material = new THREE.MeshBasicMaterial({
        map: quote.map,
        side: THREE.DoubleSide,
        transparent: true
      });

      this.geometry = new THREE.PlaneBufferGeometry(cardWidth, quote.height);
    })
    .on("click", function () {
      SubUnit.object(this)
        .transition().duration(1000)
        .attr("rotation", {x: Math.PI * 2})
        .each('end', function () {
          this.rotation.x = 0;
        });
    });

  var author = nodes.append("mesh")
    .attr("tags", "name")
    .each(function (d) {
      let quote = getText(d.quote, "#ff0004", 20, cardWidth);
      let label = getLabel("-" + d.name, "#fff", 30);

      this.material = new THREE.MeshBasicMaterial({
        map: label.map,
        side: THREE.DoubleSide,
        transparent: true
      });

      this.geometry = new THREE.PlaneBufferGeometry(label.width, label.height);

      let x = quote.width / 2 - label.width / 2;
      let y = -quote.height / 2 - label.height;

      this.position.set(x, y, 0);
    })
    .on('click', function () {
      SubUnit.object(this)
        .transition().duration(2000)
        .attr('rotation', {z: Math.PI * 2})
        .each('end', function () {
          this.rotation.z = 0;
        });

      let PY = this.parentNode.rotation.y;
      let PZ = this.parentNode.rotation.z;
      let P2 = Math.PI * 2;

      SubUnit.object(this.parentNode)
        .transition().duration(2000)
        .attr('rotation', {y: PY + P2, z: PZ + P2})
        .each('end', function () {
          this.rotation.y = PY;
          this.rotation.z = PZ;
        });
    });

  raycast(camera, quotes[0], 'click');
  raycast(camera, author[0], 'click');

  console.log("root", window.root = root[0]);

  var control = new THREE.OrbitControls(camera, renderer.domElement);
  control.zoomSpeed = 0.1;
  control.rotateSpeed = 0.3;

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
