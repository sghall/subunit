/**
 * @author alteredq / http://alteredqualia.com/
 */

import THREE from 'three';

THREE.MaskPass = function (scene, camera) {
  this.scene = scene;
  this.camera = camera;
  this.enabled = true;
  this.clear = true;
  this.needsSwap = false;
  this.inverse = false;
};

THREE.MaskPass.prototype = {
  render: function (renderer, writeBuffer, readBuffer) {
    const context = renderer.context;
    context.colorMask(false, false, false, false);
    context.depthMask(false);

    let writeValue;
    let clearValue;

    if (this.inverse) {
      writeValue = 0;
      clearValue = 1;
    } else {
      writeValue = 1;
      clearValue = 0;
    }

    context.enable(context.STENCIL_TEST);
    context.stencilOp(context.REPLACE, context.REPLACE, context.REPLACE);
    context.stencilFunc(context.ALWAYS, writeValue, 0xffffffff);
    context.clearStencil(clearValue);

    renderer.render(this.scene, this.camera, readBuffer, this.clear);
    renderer.render(this.scene, this.camera, writeBuffer, this.clear);

    context.colorMask(true, true, true, true);
    context.depthMask(true);

    context.stencilFunc(context.EQUAL, 1, 0xffffffff);
    context.stencilOp(context.KEEP, context.KEEP, context.KEEP);
  }
};


THREE.ClearMaskPass = function () {
  this.enabled = true;
};

THREE.ClearMaskPass.prototype = {
  render: function (renderer) {
    const context = renderer.context;
    context.disable(context.STENCIL_TEST);
  }
};
