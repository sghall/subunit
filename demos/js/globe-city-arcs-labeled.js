import d3 from 'd3';
import THREE from 'three';
import Subunit from 'subunit';
import { camera, scene, renderer } from './common/scene.js';
import './common/OrbitControls.js';
import { getCoords, arc, lineCache } from './common/geo.js';

const world = new THREE.TextureLoader().load('images/earth.jpg');

d3.select('#loading').transition().duration(500)
  .style('opacity', 0).remove();

const circleGeometry = new THREE.CircleGeometry(5, 30);
const circleMaterial = new THREE.MeshPhongMaterial({ color: '#777' });

const colors = d3.scaleOrdinal()
  .range(['#8dd3c7','#ffffb3','#bebada','#fb8072','#80b1d3','#fdb462','#b3de69']);

const getColor = lineCache(colors);

const earth  = new THREE.MeshPhongMaterial({ map: world, shininess: 5 });
const sphere = new THREE.SphereGeometry(200, 40, 40);

d3.json('data/top-cities.json', function (err, json) {
  const data = [];

  for (let i = 0; i < json.length; i += 2) {
    for (let j = 1; j < json.length; j += 2) {
      if (i !== j) {
        data.push({
          source: json[i],
          target: json[j]
        });
      }
    }
  }

  const rootNode = Subunit.select(scene);

  const globe = rootNode.append('mesh')
    .attr('material', earth)
    .attr('geometry', sphere);

  globe.node().rotation.y = Math.PI;

  rootNode.selectAll('.line')
    .data(data).enter()
    .append('line')
    .attr('tags', 'line')
    .attr('geometry', function (d) {
      const s = getCoords(d.source.lat, d.source.lng, true);
      const t = getCoords(d.target.lat, d.target.lng, true);
      return arc(s, t, 5);
    })
    .attr('material', function (d) {
      return getColor(d.source.name);
    });

  const cities = rootNode.selectAll('.node')
    .data(json).enter()
    .append('object')
    .attr('tags', 'node')
    .each(function (d) {
      this.position.copy(getCoords(d.lat, d.lng));
      this.lookAt(rootNode.node().position);
    });

  cities.append('mesh')
    .attr('material', circleMaterial)
    .attr('geometry', circleGeometry)
    .each(function () {
      this.rotation.y = Math.PI;
    });

  const materialOptions = { color: '#fff', shading: THREE.FlatShading };
  const material = new THREE.MeshPhongMaterial(materialOptions);

  const loader = new THREE.FontLoader();

  loader.load('fonts/helvetiker_regular.typeface.json', function(font) {
    const textOptions = {
      font,
      size: 10,
      height: 5,
      curveSegments: 20,
      bevelEnabled: false,
    };

    cities.append('mesh')
      .attr('material', material)
      .attr('geometry', function (d) {
        const text = new THREE.TextGeometry(d.name, textOptions);
        text.computeBoundingBox();
        text.computeVertexNormals();
        return text;
      })
      .each(function () {
        const min = this.geometry.boundingBox.min.x;
        const max = this.geometry.boundingBox.max.x;
        this.rotation.y = Math.PI;
        this.scale.z = 0.05;
        this.position.set(max - min, 0, -5);
      });
  });

  rootNode.node().rotation.y = Math.PI;
  rootNode.node().rotation.x = Math.PI / 6;
  rootNode.node().scale.set(2.75, 2.75, 2.75);

  const control = new THREE.OrbitControls(camera, renderer.domElement);
  control.zoomSpeed = 0.1;

  function animate() {
    control.update();
    requestAnimationFrame(animate);
    render();
  }

  function render() {
    renderer.render(scene, camera);
  }
  animate();
});
