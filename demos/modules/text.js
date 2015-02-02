export function makeSprite(text, color, textHeight) {

  var canvas = d3.select("body").append("canvas")
    .style("display", "none");

  var context = canvas.node().getContext("2d");
  context.font = "normal " + textHeight + "px Arial";

  var textWidth = context.measureText(text).width;

  canvas.attr({width: textWidth, height: textHeight});

  context.font = "normal " + textHeight + "px Arial";
  context.textAlign    = "center";
  context.textBaseline = "middle";
  context.fillStyle    = color;
  context.fillText(text, textWidth / 2, textHeight / 2);

  var texture = new THREE.Texture(canvas.node());
  texture.needsUpdate = true;

  var material = new THREE.SpriteMaterial({map: texture, useScreenCoordinates: false});
  material.transparent = true;

  canvas.remove();

  return {
    material: material,
    width: textWidth,
    height: textHeight
  };
}