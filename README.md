<h2>Subunit</h2>
<h4>Selections in THREE.js</h4>

A small library that gives you D3 style selections in THREE.js. Now you can do awesome stuff in WebGL with a familiar API. Subunit selects into a THREE.js scene graph just like selecting into the DOM with D3.

```html
npm install subunit
```

<h4>Syntax</h4>

```js
...
const barMaterial = new THREE.MeshPhongMaterial({ color: '#4183c4' }); // blue material
const bigMaterial = new THREE.MeshPhongMaterial({ color: '#ff0000' }); // red material

x.domain(data.map(function (d) { return d.letter; }));
y.domain([0, d3.max(data, function (d) { return d.frequency; })]);

const rootNode = SubUnit.select(scene);     // select the scene
rootNode.node().position.x = -size[0] / 2;  // adjust the root node

rootNode.selectAll('bar')        // select with tags separated by periods e.g 'tag1.tag2.tag3'
  .data(data).enter()            // specify your data and call enter on the selection
  .append('mesh')                // append a mesh
  .attr('tags', 'bar')           // add a tag
  .tagged('big', function (d) {  // conditionally add a tag
    return d.frequency > 0.07;
  })
  .attr('material', barMaterial)
  .attr('geometry', function (d) {
    const w = x.bandwidth();
    const h = size[1] - y(d.frequency);
    return new THREE.BoxGeometry(w, h, 5);
  })
  .each(function (d) {
    const x0 = x(d.letter);
    const y0 = -y(d.frequency) / 2;
    this.position.set(x0, y0, 240);
  });

rootNode.selectAll('bar.big')      // use the tags like classes to select items
  .attr('material', bigMaterial);
...
```

<h4>Live Demos: </h4>
<a href="https://sghall.github.io/subunit/demos/bars-sphere.html">
  <img src="demos/images/screenshots/abstract.png" height="250px"/>
</a>
<a href="https://sghall.github.io/subunit/demos/bars-sort-transition.html">
  <img src="demos/images/screenshots/sort.png" height="250px"/>
</a>
<a href="https://sghall.github.io/subunit/demos/globe-earthquakes-1k.html">
  <img src="demos/images/screenshots/quakes1k.png" height="250px"/>
</a>
<a href="https://sghall.github.io/subunit/demos/globe-earthquakes-full.html">
  <img src="demos/images/screenshots/quakes8k.png" height="250px"/>
</a>
<a href="https://sghall.github.io/subunit/demos/spiral-circle-v2.html">
  <img src="demos/images/screenshots/spiral1.png" height="250px"/>
</a>
<a href="https://sghall.github.io/subunit/demos/spiral-circle.html">
  <img src="demos/images/screenshots/spiral2.png" height="250px"/>
</a>

<h4>To run the demos locally...</h4>

1. clone the repo

2. cd subunit

3. npm install && npm start

That will fire up a dev server and open your browser to the demos index.
