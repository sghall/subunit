var canvas = d3.select("body").append("canvas")
  .style("display", "none");

var cache = {};

export function makeSprite(text, color, points) {
  var texture, context, textWidth;

  var pad = points * 0.5;
  var key = text + color + points;

  if (!cache[key]) {
    context = canvas.node().getContext("2d");
    context.font = "normal " + points + "pt Arial";

    textWidth = context.measureText(text).width + pad;
    canvas.attr({width: textWidth, height: points + pad});

    context.font = "normal " + points + "pt Arial";
    context.textAlign    = "center";
    context.textBaseline = "middle";
    context.fillStyle    = color;
    context.fillText(text, textWidth / 2, (points + pad) / 2);

    cache[key] = canvas.node().toDataURL();
  }

  texture = THREE.ImageUtils.loadTexture(cache[key]);

  return { 
    map: texture, 
    width: textWidth, 
    height: points + pad
  };
}