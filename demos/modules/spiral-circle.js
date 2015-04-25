import { camera, scene, canvas, renderer, stats } from './scene';
import { SubUnit } from '../../src/index';

// var width = 960,
//     height = 500,
//     circleRadius = 180,
//     squareCount = 20,
//     squareSize = 78,
//     speed = .08;

// var square = d3.selectAll("g")
//   .append("g")
//     .attr("transform", function(d, i) { return i ? "rotate(180)" : null; })
//   .selectAll("rect")
//     .data(d3.range(squareCount))
//   .enter().append("rect")
//     .datum(function(i) { return i / squareCount; })
//     .attr({width: squareSize, height: squareSize, x: -squareSize / 2, y: -squareSize / 2});

// console.log("square", square)
// d3.timer(function(elapsed) {
//   square
//       .attr("transform", function(t) { return "rotate(" + (t * 360) + ")translate(0," + circleRadius + ")rotate(" + (t * 360 + elapsed * speed) + ")"; });
// });

// square.each(function (d) {
//   console.log("loop", d);
// })

// console.log("square-svg", window.square = square);
      // import { camera, scene, canvas, renderer, stats } from 'modules/scene';



// var d3_selectionPrototypeEach = function(callback) {
//   return d3_selection_each(this, function(node, i, j) {
//     callback.call(node, node.__data__, i, j);
//   });
// };

// function d3_selection_each(groups, callback) {
//   for (var j = 0, m = groups.length; j < m; j++) {
//     for (var group = groups[j], i = 0, n = group.length, node; i < n; i++) {
//       if (node = group[i]) callback(node, i, j);
//     }
//   }
//   return groups;
// }


      var width        = 960;
      var height       = 500;
      var circleRadius = 180;
      var squareCount  = 20;
      var squareSize   = 780;
      var speed        = 0.08;

      var options = {color: 'tomato', side: THREE.DoubleSide};
      var material = new THREE.MeshLambertMaterial(options);
      var geometry = new THREE.PlaneBufferGeometry(squareSize, squareSize);

      var root = SubUnit.select(scene);
      var container = root.append("object");

      var frames = container.selectAll(".frame")
        .data([0,1]).enter()
        .append("object")
        .tagged("frame", true)
        .each(function (d, i) {
        })

      var squares = frames.selectAll("rect")
          .data(d3.range(squareCount))
        .enter().append("mesh")
        .datum(function(i) { return i / squareCount; })
        .attr("material", material)
        .attr("geometry", geometry)
        .each(function (d, i) {
          this.position.z = -i * 50
        });

        d3.timer(function(elapsed) {
          square
              .attr("transform", function(t) { return "rotate(" + (t * 360) + ")translate(0," + circleRadius + ")rotate(" + (t * 360 + elapsed * speed) + ")"; });
        });


        var controls = new THREE.TrackballControls(camera, renderer.domElement);
        controls.rotateSpeed = 0.5;
        controls.minDistance = 100;
        controls.maxDistance = 6000;

        console.log("root: ", window.squares = squares, root)

        function animate() {
          requestAnimationFrame(animate);
          renderer.render(scene, camera);
          stats.update();
          controls.update();
        }

        animate();