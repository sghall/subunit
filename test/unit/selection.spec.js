/*global describe, it, expect*/
/*eslint no-unused-expressions: 0*/

import THREE from 'three';
import Subunit from 'subunit';

describe('Subunit.select', function() {

  const scene = new THREE.Scene();
  const rootNode = Subunit.select(scene);

  it('Subunit.select method should exist', function() {
    expect(Subunit.select).toExist;
  });

  it('Returned selection is a subclassed Array', function() {
    expect(rootNode instanceof Array).toBe(true);
  });

  it('selection.node() should be a THREE.Object3D', function() {
    expect(rootNode.node() instanceof THREE.Object3D).toBe(true);
  });

});

describe('Subunit.object', function() {

  const rootNode = Subunit.object(new THREE.Object3D());

  it('Subunit.object method should exist', function() {
    expect(Subunit.object).toExist;
  });

  it('Returned selection is a subclassed Array', function() {
    expect(rootNode instanceof Array).toBe(true);
  });

  it('selection.node() should be a THREE.Object3D', function() {
    expect(rootNode.node() instanceof THREE.Object3D).toBe(true);
  });

});

describe('selection.data', function() {

  const scene = new THREE.Scene();
  const rootNode = Subunit.select(scene);

  it('selection.data method should exist', function() {
    expect(rootNode.data).toExist;
  });

  it('invoking .data should return an object with an enter function', function() {
    expect(rootNode.data([1])._enter).toExist;
  });

  it('invoking .data should return an object with an exit function', function() {
    expect(rootNode.data([1])._exit).toExist;
  });

});
