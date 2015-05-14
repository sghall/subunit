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

d3.select('body').append('div').html('<a href="https://github.com/sghall/subunit"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/52760788cde945287fbb584134c4cbc2bc36f904/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f77686974655f6666666666662e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_white_ffffff.png"></a>');


