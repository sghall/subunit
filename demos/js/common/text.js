import THREE from 'three';
import d3 from 'd3';
import { memoize } from './utils.js';

export const getLabel = memoize(makeSprite);

export function makeSprite(text, color, points) {
  const pad = points * 0.5;

  const canvas = d3.select('body').append('canvas')
    .style('display', 'none');

  const context = canvas.node().getContext('2d');
  context.font = 'Bold ' + points + 'pt Arial';

  const textWidth = context.measureText(text).width + pad;
  canvas.attr({ width: textWidth, height: points + pad });

  context.font = 'Bold ' + points + 'pt Arial';
  context.textAlign    = 'center';
  context.textBaseline = 'middle';
  context.fillStyle    = color;
  context.fillText(text, textWidth / 2, (points + pad) / 2);

  const texture = new THREE.Texture(canvas.node());
  texture.needsUpdate = true;

  canvas.remove();

  return {
    map: texture,
    width: textWidth,
    height: points + pad
  };
}

export const getText = memoize(wrapText);

export function wrapText(text, color, points, maxWidth) {

  const canvas = d3.select('body').append('canvas')
    .style('display', 'none');

  let context;
  let testLine;
  let testWidth;

  const pad = points * 0.5;
  const lineHeight = points + pad;

  let total = lineHeight;

  canvas.attr({
    width: maxWidth + (pad * 2)
  });

  context = canvas.node().getContext('2d');
  context.font = 'Bold ' + (points * 1.5) + 'pt Arial';
  context.textBaseline = 'bottom';
  context.fillStyle = color;

  let line  = '';

  const lines = [];
  const words = text.split(' ');

  for(let n = 0; n < words.length; n++) {

    testLine  = line + words[n] + ' ';
    testWidth = context.measureText(testLine).width;

    if (testWidth > maxWidth) {
      lines.push([line, pad, total]);
      line = words[n] + ' ';
      total += lineHeight;
    } else {
      line = testLine;
    }
  }

  lines.push([line, pad, total]);

  canvas.attr({ // RESIZE THEN DRAW
    height: total
  });

  context = canvas.node().getContext('2d');
  context.font = 'Bold ' + points + 'pt Arial';
  context.textBaseline = 'bottom';
  context.fillStyle = color;

  for (let i = 0; i < lines.length; i++) {
    context.fillText(lines[i][0], lines[i][1], lines[i][2]);
  }

  const texture = new THREE.Texture(canvas.node());
  texture.needsUpdate = true;

  canvas.remove();

  return {
    map: texture,
    width: maxWidth + (pad * 2),
    height: total + (pad * 2)
  };
}
