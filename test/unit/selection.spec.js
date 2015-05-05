/*global describe, it, expect*/
/*eslint no-unused-expressions: 0*/

import THREE from 'THREE';
import { SubUnit } from 'SubUnit';

describe('SubUnit.select', function() {

  let scene = new THREE.Scene();
  let root = SubUnit.select(scene);

  it('SubUnit.select method should exist', function() {
    expect(SubUnit.select).toExist;
  });

  it('Returned selection is a subclassed Array', function() {
    expect(root instanceof Array).toBe(true);
  });

  it('Returned selection is an Array of Arrays', function() {
    expect(root[0] instanceof Array).toBe(true);
  });

  it('selection.node() should be a THREE.Object3D', function() {
    expect(root.node() instanceof THREE.Object3D).toBe(true);
  });

});

describe('SubUnit.object', function() {

  let root = SubUnit.object(new THREE.Object3D());

  it('SubUnit.object method should exist', function() {
    expect(SubUnit.object).toExist;
  });

  it('Returned selection is a subclassed Array', function() {
    expect(root instanceof Array).toBe(true);
  });

  it('Returned selection is an Array of Arrays', function() {
    expect(root[0] instanceof Array).toBe(true);
  });

  it('selection.node() should be a THREE.Object3D', function() {
    expect(root.node() instanceof THREE.Object3D).toBe(true);
  });

});

describe('selection.data', function() {

  let scene = new THREE.Scene();
  let root = SubUnit.select(scene);

  it('selection.data method should exist', function() {
    expect(root.data).toExist;
  });

  it('invoking .data should return an object with an enter function', function() {
    expect(root.data([1]).enter).toExist;
  });

  it('invoking .data should return an object with an exit function', function() {
    expect(root.data([1]).exit).toExist;
  });

});
