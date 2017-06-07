import d3 from 'd3';
import THREE from 'three';
import SubUnit from 'subunit';
import { camera, scene, renderer } from './common/scene.js';
import './common/OrbitControls.js';
import { raycast } from './common/events.js';

const metal = new THREE.TextureLoader().load('images/metal.jpg');

d3.json('data/letters.json', function (err, data) {

  d3.select('#loading').transition().duration(800)
    .style('opacity', 0).remove();

  const size = [1000, 600]; // [width, height]

  const x = d3.scaleBand()
    .range([0, size[0]])
    .padding(0.1);

  const y = d3.scaleLinear()
    .range([size[1], 0]);

  const color1 = new THREE.MeshPhongMaterial({ color: '#ffffff', shininess: 100 });
  const color2 = new THREE.MeshPhongMaterial({ color: '#ff0000' });

  const backing = new THREE.BoxGeometry(size[0], size[1], 100);

  x.domain(d3.range(data.length));
  y.domain([0, d3.max(data, function (d) { return d.frequency; })]);

  data = [ // Redefine the data for multiple charts
    { color: '#708090', data: d3.shuffle(data).slice() },
    { color: '#B9D3EE', data: d3.shuffle(data).slice() },
    { color: '#4682B4', data: d3.shuffle(data).slice() },
    { color: '#00BFFF', data: d3.shuffle(data).slice() }
  ];

  const root = SubUnit.select(scene);
  const container = root.append('object');

  const charts = container.selectAll('chart')
    .data(data).enter()
    .append('object')
    .tagged('chart', true)
    .each(function (d, i) {
      this.position.y = i * size[1];
    });

  charts.append('mesh')
    .attr('tags', 'backing')
    .attr('material', function (d) {
      const opts = { color: d.color, map: metal, shininess: 100 };
      return new THREE.MeshPhongMaterial(opts);
    })
    .attr('geometry', backing)
    .each(function () {
      this.position.z = -50;
      this.position.x = size[0] / 2;
    });

  const bars = charts.selectAll('bar')
    .data((d) => d.data).enter()
    .append('mesh')
    .attr('tags', 'bar')
    .attr('material', color1)
    .attr('geometry', function (d) {
      const w = x.bandwidth();
      const h = size[1] - y(d.frequency);
      return new THREE.BoxGeometry(w, h, 5);
    })
    .each(function (d, i) {
      const x0 = x(i) + x.bandwidth() / 2;
      const y0 = -y(d.frequency) / 2;
      this.position.set(x0, y0, 0);
    })
    .on('click', function (event, d) {
      d3.select('#msg').html('Letter: ' + d.letter);

      if (this.material === color1) {
        this.material = color2;
      } else {
        this.material = color1;
      }
    });

  const sortAlpha = (a, b) => {
    let result = 0;

    if (a.letter > b.letter) {
      result = 1;
    }

    if (a.letter < b.letter) {
      result = -1;
    }

    return result;
  };

  const sortFrequency = (a, b) => {
    let result = 0;

    if (a.frequency > b.frequency) {
      result = 1;
    }

    if (a.frequency < b.frequency) {
      result = -1;
    }

    return result;
  };


  function sortBars(sortFunc, delay, duration) {
    bars.sort(sortFunc).transition()
      .delay(delay).duration(duration)
      .attr('position', function tweenPosition(d, i) {
        return { x: x(i) + x.bandwidth() / 2 };
      }); 
  }

  sortBars(sortAlpha, 2000, 2000);

  const materialOptions = { color: '#333', shading: THREE.FlatShading };
  const material = new THREE.MeshPhongMaterial(materialOptions);

  const loader = new THREE.FontLoader();

  loader.load('fonts/helvetiker_regular.typeface.json', function(font) {
    const textOptions = {
      font,
      size: 30,
      height: 5,
      curveSegments: 20,
      bevelEnabled: false,
    };

    bars.append('mesh')
      .tagged('label', true)
      .attr('material', material)
      .attr('geometry', function (d) {
        const text = new THREE.TextGeometry(d.letter, textOptions);
        text.computeBoundingBox();
        text.computeVertexNormals();
        return text;
      })
      .each(function () {
        const min = this.geometry.boundingBox.min.x;
        const max = this.geometry.boundingBox.max.x;
        this.position.set(-0.5 * (max - min), 0, 10);
      });
  });

  d3.select('#sort-alpha').on('click', () => {
    sortBars(sortAlpha, 0, 2000);
  });

  d3.select('#sort-frequency').on('click', () => {
    sortBars(sortFrequency, 0, 2000);
  });

  container.node().position.x = -size[0] / 2;
  container.node().position.y = (-size[1] * 2) + size[1] / 2;

  camera.position.z = 2500;

  raycast(camera, bars.nodes(), 'click');

  console.log('root: ', window.root = root);

  const control = new THREE.OrbitControls(camera, renderer.domElement);

  function animate() {
    control.update();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  animate();
});
