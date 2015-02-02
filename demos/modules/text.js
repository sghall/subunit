var canvas = d3.select("body").append("canvas")
  .style("display", "none");

export function makeSprite(text, color) {
  var textHeight = 200;

  var context = canvas.node().getContext("2d");
  context.font = "bold " + textHeight + "pt Arial";

  var textWidth = context.measureText(text).width;

  var pad = textHeight * 0.25; // aovids cut-off g, j, y, etc.
  canvas.attr({width: textWidth + pad, height: textHeight + pad});

  context.font = "bold " + textHeight + "pt Arial";
  context.textAlign    = "center";
  context.textBaseline = "middle";
  context.fillStyle    = color;
  context.fillText(text, textWidth / 2, textHeight / 2);

  var url = canvas.node().toDataURL();
  var texture = THREE.ImageUtils.loadTexture(url);

  return {
    map: texture,
    width: textWidth,
    height: textHeight
  };
}