import d3 from 'd3';
import THREE from 'THREE';
import TWEEN from 'TWEEN';
import { SubUnit } from '../../src/subunit';
import { camera, scene, renderer } from './common/scene';
import { raycast } from './common/events';
import { getLabel, getText } from './common/text';
import { sphere } from './common/layouts';

d3.csv('data/quotes.csv', function (err, data) {

  data = d3.shuffle(data).slice(0, 200);

  var cardWidth = 400;

  d3.select("#loading").remove();

  var root = SubUnit.select(scene)
    .each(function () {
      this.scale.set(0.01, 0.01, 0.01);

      new TWEEN.Tween(this.scale)
        .delay(500)
        .to({x: 0.275, y: 0.275, z: 0.275}, 1000)
        .start();
    });

  var nodes = root.selectAll("node")
    .data(data).enter()
    .append("object")
    .attr("tags", "node")
    .each(function (d, i) {
      this.position.copy(sphere(i, data.length, 3000));
      this.lookAt(root.node().position);
      this.rotation.y += Math.PI;
    });

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
    .on("click", function (event, d, i) {

      new TWEEN.Tween(this.rotation)
        .to({x: Math.PI * 2}, 1000)
        .onComplete(function () {
          this.x = 0;
        })
        .start();

      var temp = new THREE.Mesh();
      temp.position.copy(sphere(i, data.length, 1000));
      temp.lookAt(root.node().position);

      new TWEEN.Tween(camera.position)
        .to(temp.position, 1000)
        .start();
    });

  var names = nodes.append("mesh")
    .attr("tags", "name")
    .each(function (d) {
      var quote = getText(d.quote, "#ff0004", 20, cardWidth); // FROM CACHE
      var label = getLabel("-" + d.name, "#fff", 30);

      this.material = new THREE.MeshBasicMaterial({
        map: label.map,
        side: THREE.DoubleSide,
        transparent: true
      });

      this.geometry = new THREE.PlaneBufferGeometry(label.width, label.height);

      var x = quote.width / 2 - label.width / 2;
      var y = -quote.height / 2 - label.height;

      this.position.set(x, y, 0);
    })
    .on("click", function () {
      new TWEEN.Tween(this.rotation)
        .to({z: 2 * Math.PI}, 500)
        .onComplete(function () {
          this.z = 0;
        })
        .start();

      var parent = this.parentNode;

      new TWEEN.Tween(parent.rotation)
        .to({z: parent.rotation.z + Math.PI / 2}, 200)
        .start();

    });

  raycast(camera, quotes[0], 'click');
  raycast(camera, names[0], 'click');

  function animate() {
    requestAnimationFrame(animate);
    render();
  }

  function render() {
    TWEEN.update();
    renderer.render(scene, camera);
  }
  animate();
});
