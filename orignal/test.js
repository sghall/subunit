var scene = new THREE.Scene();
var root = SubUnit.select(scene);

var points = [
  {x: 5, y: 10},
  {x: 6, y: 12},
  {x: 3, y: 15}
];

//********************************************************
// SubUnit METHODS
//********************************************************

describe('SubUnit.select', function() {

  it('SubUnit.select method should exist', function() {
    chai.expect(SubUnit.select).to.exist;
  });

  it('should return an Array', function() {
    chai.expect(root).to.be.instanceof(Array);
  });

  it('should return an Array of Arrays', function() {
    chai.expect(root[0]).to.be.instanceof(Array);
  });

  it('selection.node() should be a THREE.Object3D', function() {
    chai.expect(root.node()).to.be.instanceof(THREE.Object3D);
  });

});

describe('SubUnit.object', function() {
  var selection = SubUnit.object(root.node());

  it('SubUnit.object method should exist', function() {
    chai.expect(SubUnit.object).to.exist;
  });

  it('should return an Array', function() {
    chai.expect(selection).to.be.instanceof(Array);
  });

  it('should return an Array of Arrays', function() {
    chai.expect(selection[0]).to.be.instanceof(Array);
  });

  it('selection.node() should be a THREE.Object3D', function() {
    chai.expect(selection.node()).to.be.instanceof(THREE.Object3D);
  });
});

//********************************************************
// SELECTION METHODS
//********************************************************

describe('selection.data', function() {

  it('selection.data method should exist', function() {
    chai.expect(root.data).to.exist;
  });

  it('should return an Array', function() {
    chai.expect(root.data([1])).to.be.instanceof(Array);
  });

  it('should return an Array of Arrays', function() {
    chai.expect(root.data([1])).to.be.instanceof(Array);
  });

  it('should return enter selection', function() {
    chai.expect(root.data([1]).enter).to.exist;
  });

});

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

describe('selection.attr', function() {

  it('selection.attr method should exist', function() {
    chai.expect(root.attr).to.exist;
  });

});

describe('selection.append', function() {

  it('selection.append method should exist', function() {
    chai.expect(root.append).to.exist;
  });

});

describe('selection.datum', function() {

  it('selection.datum method should exist', function() {
    chai.expect(root.datum).to.exist;
  });

});

describe('selection.call', function() {

  it('selection.call method should exist', function() {
    chai.expect(root.call).to.exist;
  });

});

describe('selection.classed', function() {

  it('selection.classed method should exist', function() {
    chai.expect(root.classed).to.exist;
  });

});

describe('selection.remove', function() {

  it('selection.remove method should exist', function() {
    chai.expect(root.remove).to.exist;
  });

});

describe('selection.empty', function() {

  it('selection.empty method should exist', function() {
    chai.expect(root.empty).to.exist;
  });

});

describe('selection.filter', function() {

  it('selection.filter method should exist', function() {
    chai.expect(root.filter).to.exist;
  });

});

describe('selection.on', function() {

  it('selection.on method should exist', function() {
    chai.expect(root.on).to.exist;
  });

});

describe('selection.each', function() {

  it('selection.each method should exist', function() {
    chai.expect(root.each).to.exist;
  });

});

describe('selection.node', function() {

  it('selection.node method should exist', function() {
    chai.expect(root.node).to.exist;
  });

});

describe('selection.sort', function() {

  it('selection.sort method should exist', function() {
    chai.expect(root.sort).to.exist;
  });

});
