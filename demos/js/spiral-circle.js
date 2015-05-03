import { camera, scene, renderer} from './common/scene';
import { SubUnit } from 'src/subunit';
import d3 from 'd3';
import THREE from 'THREE';

var circleRadius = 200;
var squareCount  = 1000;

var options  = {color: 'tomato', side: THREE.DoubleSide};
var material = new THREE.MeshPhongMaterial(options);
var geometry = new THREE.SphereGeometry(120, 10, 10);

camera.position.z = 3000;

var root = SubUnit.select(scene);
var container = root.append("object");
root.node().rotateY(80);

var frames = container.selectAll(".frame")
  .data([0, 1]).enter()
  .append("object")
  .tagged("frame", true);

var squares = frames.selectAll("rect")
    .data(d3.range(squareCount))
  .enter().append("mesh")
  .datum(function(i) { return i / squareCount; })
  .attr("material", material)
  .attr("geometry", geometry)
  .each(function (d, i) {
    this.position.z = -i * 5;
  });

  d3.timer(function(/* elapsed */) {
    squares.each(function(d) {
      this.rotation.z += d * (2 * Math.PI);
      this.translateX(circleRadius);
    });
  });

console.log("root: ", window.root = root, root);

function animate() {
  renderer.render(scene, camera);
  root.node().rotation.y += 0.003;
  requestAnimationFrame(animate);
}

animate();
