var scene = new THREE.Scene();
var root = subunit.select(scene);

var points = [
  {x: 5, y: 10},
  {x: 6, y: 12},
  {x: 3, y: 15}
];

//********************************************************
// SUBUNIT METHODS
//********************************************************

describe('subunit.select', function() {

  it('Subunit.select method should exist', function() {
    chai.expect(subunit.select).to.exist;
  });

  it('Selection.node() should be a THREE.Object3D', function() {
    chai.expect(root.node()).to.be.instanceOf(THREE.Object3D);
  });
});

describe('subunit.selectObject', function() {
  var selection = subunit.selectObject(root.node());

  it('Subunit.selectObject method should exist', function() {
    chai.expect(subunit.selectObject).to.exist;
  });

  it('Selection.node() should be a THREE.Object3D', function() {
    chai.expect(selection.node()).to.be.instanceOf(THREE.Object3D);
  });
});

//********************************************************
// SELECTION METHODS
//********************************************************

describe('selection.select', function() {

  it('selection.select method should exist', function() {
    chai.expect(root.select).to.exist;
  });

});

describe('selection.selectAll', function() {

  it('selection.selectAll method should exist', function() {
    chai.expect(root.selectAll).to.exist;
  });

});

describe('selection.data', function() {

  it('selection.data method should exist', function() {
    chai.expect(root.data).to.exist;
  });

});

describe('selection.append', function() {

  it('selection.append method should exist', function() {
    chai.expect(root.append).to.exist;
  });

});