import THREE from 'THREE';
import d3 from 'd3';

export var scene = new THREE.Scene();
export var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 6000);
camera.position.z = 1000;

export var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0x999999);

d3.select(renderer.domElement).style("opacity", 0)
  .transition().duration(500).style("opacity", 1);

var light = new THREE.HemisphereLight('#fff', '#666', 1.5);
light.position.set(0, 1000, 0);
scene.add(light);

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}


