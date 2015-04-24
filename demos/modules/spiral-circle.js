import { camera, scene, canvas, renderer, stats } from 'modules/scene';
import { subunit } from '../src/index';

var width = 960,
    height = 500,
    circleRadius = 180,
    squareCount = 200,
    squareSize = 78,
    speed = .08;

var square = d3.selectAll("g")
  .append("g")
    .attr("transform", function(d, i) { return i ? "rotate(180)" : null; })
  .selectAll("rect")
    .data(d3.range(squareCount))
  .enter().append("rect")
    .datum(function(i) { return i / squareCount; })
    .attr({width: squareSize, height: squareSize, x: -squareSize / 2, y: -squareSize / 2});

console.log("square", square)
// d3.timer(function(elapsed) {
//   square
//       .attr("transform", function(t) { return "rotate(" + (t * 360) + ")translate(0," + circleRadius + ")rotate(" + (t * 360 + elapsed * speed) + ")"; });
// });


      // import { camera, scene, canvas, renderer, stats } from 'modules/scene';

      var width        = 960;
      var height       = 500;
      var circleRadius = 180;
      var squareCount  = 200;
      var squareSize   = 78;
      var speed        = 0.08;

      var root = SubUnit.select(scene);
      var container = root.append("object");

      var squares = container.selectAll(".frames")
        .data([0,1]).enter()
        .append("object")
        .tagged("frame", true)
        .each(function (d, i) {
          this.rotation.z = i ? Math.PI: 0;
        })
        .selectAll("rect")
          .data(d3.range(squareCount))
        .enter().append("mesh")
        .datum(function(i) { return i / squareCount; })
      //   .attr({
      //     width: squareSize, 
      //     height: squareSize, 
      //     x: -squareSize / 2, 
      //     y: -squareSize / 2
      //   });
          // .append("mesh")
          // .attr("tags", "bar")
          // .attr("material", color1)
          // .attr("geometry", function (d) {
          //   var w = x.rangeBand();
          //   var h = size[1] - y(d.frequency);
          //   return new THREE.BoxGeometry(w, h, 5);
          // })
          // .each(function (d, i) {
          //   var x0 = x(i) + x.rangeBand() / 2;
          //   var y0 = -y(d.frequency) / 2;
          //   this.position.set(x0, y0, 0);
          // })


        // d3.timer(function(elapsed) {
        //   squares
        //       .attr("transform", function(t) { return "rotate(" + (t * 360) + ")translate(0," + circleRadius + ")rotate(" + (t * 360 + elapsed * speed) + ")"; });
        // });


        // var cntrl = new THREE.TrackballControls(camera, renderer.domElement);
        // cntrl.rotateSpeed = 0.5;
        // cntrl.minDistance = 100;
        // cntrl.maxDistance = 6000;

        console.log("root: ", window.squares = squares, root)

        // function animate() {
        //   stats.update();
        //   cntrl.update();

        //   // charts.each(function () {
        //   //   this.rotation.x += 0.005;
        //   // })

        //   requestAnimationFrame(animate);
        //   renderer.render(scene, camera);
        // }

        // animate();