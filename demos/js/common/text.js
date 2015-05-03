import THREE from 'THREE';
import d3 from 'd3';
import { memoize } from './utils';

export var getLabel = memoize(makeSprite);

export function makeSprite(text, color, points) {
  var canvas, texture, context, textWidth;

  var pad = points * 0.5;

  canvas = d3.select("body").append("canvas")
    .style("display", "none");

  context = canvas.node().getContext("2d");
  context.font = "normal " + points + "pt helvetica";

  textWidth = context.measureText(text).width + pad;
  canvas.attr({width: textWidth, height: points + pad});

  context.font = "normal " + points + "pt helvetica";
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

export var getText = memoize(wrapText);

export function wrapText(text, color, points, maxWidth) {

  var canvas = d3.select("body").append("canvas")
    .style("display", "none");

  var texture, context;
  var testLine, testWidth;

  var pad = points * 0.5;
  var lineHeight = points + pad;

  var total = lineHeight;

  canvas.attr({
    width: maxWidth + (pad * 2)
  });

  context = canvas.node().getContext("2d");
  context.font = "normal " + points + "pt arial";
  context.textBaseline = "bottom";
  context.fillStyle = color;

  var line  = "", lines = [], words = text.split(" ");

  for(var n = 0; n < words.length; n++) {

    testLine  = line + words[n] + " ";
    testWidth = context.measureText(testLine).width;

    if (testWidth > maxWidth) {
      lines.push([line, pad, total]);
      line = words[n] + " ";
      total += lineHeight;
    } else {
      line = testLine;
    }
  }

  lines.push([line, pad, total]);

  canvas.attr({ // RESIZE THEN DRAW
    height: total
  });

  context = canvas.node().getContext("2d");
  context.font = "normal " + points + "pt arial";
  context.textBaseline = "bottom";
  context.fillStyle = color;

  for (var i = 0; i < lines.length; i++) {
    context.fillText(lines[i][0], lines[i][1], lines[i][2]);
  }

  texture = new THREE.Texture(canvas.node());
  texture.needsUpdate = true;

  canvas.remove();

  return {
    map: texture,
    width: maxWidth + (pad * 2),
    height: total + (pad * 2)
  };
}










