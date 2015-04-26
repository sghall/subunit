import { camera, scene, canvas, renderer, stats } from './scene';
import { SubUnit } from '../../src/index';
import d3 from 'd3';
import THREE from 'THREE';

  // var width        = 960;
  // var height       = 500;
  var circleRadius = 100;
  var squareCount  = 600;
  // var squareSize   = 780;
  // var speed        = 0.02;

  var options  = {color: 'tomato', side: THREE.DoubleSide};
  var material = new THREE.MeshPhongMaterial(options);
  var geometry = new THREE.SphereGeometry(150, 10, 10);

  var root = SubUnit.select(scene);
  var container = root.append("object");
  root.node().rotateY(80);

  var frames = container.selectAll(".frame")
    .data([0,1]).enter()
    .append("object")
    .tagged("frame", true);

  var squares = frames.selectAll("rect")
      .data(d3.range(squareCount))
    .enter().append("mesh")
    .datum(function(i) { return i / squareCount; })
    .attr("material", material)
    .attr("geometry", geometry)
    .each(function (d, i) {
      this.position.z = -i * 5
    });

    d3.timer(function(/* elapsed */) {
      squares.each(function(d) { 
        // console.log(elapsed)
        // var axis = new THREE.Vector3();

        this.rotation.z += d * (2 * Math.PI);
        this.translateX(circleRadius);
        // this.translateZ(circleRadius * d);
        // this.rotation.z += d * (2 * Math.PI) + elapsed * speed
        // return "rotate(" + (t * 360) + ")translate(0," + 
        // circleRadius + ")rotate(" + (t * 360 + elapsed * speed) + ")"; 
      });
    });

    // var controls = new THREE.TrackballControls(camera, renderer.domElement);
    // controls.rotateSpeed = 0.5;
    // controls.minDistance = 100;
    // controls.maxDistance = 6000;

    console.log("root: ", window.root = root, root)

    function animate() {
      renderer.render(scene, camera);
      // stats.update();
      // controls.update();
      requestAnimationFrame(animate);
    }

    animate();