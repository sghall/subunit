import { memoize } from 'modules/utils';

export var labelCache = memoize(makeSprite);

export function makeSprite(text, color, points) {
  var canvas, texture, context, textWidth;

  var pad = points * 0.5;

  canvas = d3.select("body").append("canvas")
    .style("display", "none");

  context = canvas.node().getContext("2d");
  context.font = "normal " + points + "pt Arial";

  textWidth = context.measureText(text).width + pad;
  canvas.attr({width: textWidth, height: points + pad});

  context.font = "normal " + points + "pt Arial";
  context.textAlign    = "center";
  context.textBaseline = "middle";
  context.fillStyle    = color;
  context.fillText(text, textWidth / 2, (points + pad) / 2);
  
  texture = new THREE.Texture(canvas.node());
  texture.needsUpdate = true;

  canvas.remove();

  return { 
    map: texture, 
    width: textWidth, 
    height: points + pad
  };
}

export var textCache = memoize(wrapText);

export function wrapText(text, color, points, maxWidth) {

  var canvas = d3.select("body").append("canvas")
    .style("display", "none");

  var texture, context;
  var testLine, testWidth;

  var pad = points * 0.5;
  var lineHeight = points;

  var total = lineHeight;

  canvas.attr({
    width: maxWidth + (pad * 2),
    height: 200
  });

  context = canvas.node().getContext("2d");
  context.font = "normal " + points + "pt Arial";
  context.fillStyle = color;

  var words = text.split(" ")
  var line  = "";

  for(var n = 0; n < words.length; n++) {

    testLine  = line + words[n] + " ";
    testWidth = context.measureText(testLine).width;

    if(testWidth > maxWidth) {
      context.fillText(line, pad, total);
      line = words[n] + " ";
      total += lineHeight;
    }
    else {
      line = testLine;
    }
  }
  context.fillText(line, pad, total);

  texture = new THREE.Texture(canvas.node());
  texture.needsUpdate = true;

  canvas.remove();

  return { 
    map: texture, 
    width: maxWidth + (pad * 2), 
    height: total + (pad * 2)
  };
}










