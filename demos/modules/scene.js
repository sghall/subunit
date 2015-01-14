var canvas = d3.select("body").append("canvas")
  .attr("width", window.innerWidth)
  .attr("height", window.innerHeight)
  .style("opacity", 0)
  .style('background-color', '#EAEAEA');

canvas.node().getContext("webgl");

export var renderer = new THREE.WebGLRenderer({canvas: canvas.node()});

canvas.transition().duration(1500).style("opacity", 1);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

export var camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 5000);
camera.position.z = 1000;

export var scene = new THREE.Scene();

var light = new THREE.HemisphereLight('#ffffff', '#666666', 1.5)
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