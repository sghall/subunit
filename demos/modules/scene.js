
export var renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor('#EAEAEA');

d3.select("canvas").style("opacity", 0)
d3.select("canvas").transition().duration(2000).style("opacity", 1)

export var camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 500;

export var scene = new THREE.Scene();

var light = new THREE.HemisphereLight('#ffffff', '#666666', 1.25)
scene.add(light);