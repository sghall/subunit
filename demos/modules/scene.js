
export var canvas = d3.select("body").append("canvas")
  .attr("width", window.innerWidth)
  .attr("height", window.innerHeight)
  .style("opacity", 0)
  .style('background-color', '#EAEAEA');

canvas.node().getContext("webgl");

export var renderer = new THREE.WebGLRenderer({canvas: canvas.node(), antialias: true});

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

export var camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 5000);
camera.position.z = 1000;

export var scene = new THREE.Scene();

export var light = new THREE.HemisphereLight('#ffffff', '#666666', 1.5);
scene.add(light);

export var stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.bottom = '45px';
document.body.appendChild(stats.domElement);

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

d3.select("#loading")
  .append("svg").attr({width: 100, height: 100})
  .style("margin-top", "-60px")
  .style("margin-left", "-20px")
  .append("circle").attr({cx: 50, cy: 50, r: 50}).style("opacity", 0)
  .transition().duration(6000).attr("r", 0).style("opacity", 1).remove();

d3.select("body")
  .append("div")
  .html('<a href="https://github.com/sghall/subunit"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/a6677b08c955af8400f44c6298f40e7d19cc5b2d/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677261795f3664366436642e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_gray_6d6d6d.png"></a>');







