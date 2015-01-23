var curZoomSpeed = 0;
var zoomSpeed   = 50;

var mouse = {x: 0, y: 0};
var mouseOnDown = {x: 0, y: 0};

export var target = {x: Math.PI * 3 / 2, y: Math.PI / 6.0};
var targetOnDown = {x: 0, y: 0};

export var distance = {v: 1000, t: 1000};

var overRenderer;
var PI_HALF = Math.PI / 2;

export var initEvents = function (canvas) {

  canvas
    .on('mousedown', onMouseDown)
    .on('mousewheel', onMouseWheel)
    .on('mousedown', onMouseDown)
    .on('mouseover', function() {
      overRenderer = true;
    })
    .on('mouseout', function() {
      overRenderer = false;
    });

  function onMouseDown() {
    d3.event.preventDefault();

    canvas
      .on('mousemove', onMouseMove)
      .on('mouseup', onMouseUp)
      .on('mouseout', onMouseOut);

    mouseOnDown.x = - d3.event.clientX;
    mouseOnDown.y = d3.event.clientY;

    targetOnDown.x = target.x;
    targetOnDown.y = target.y;
  };

  function onMouseMove() {
    mouse.x = -d3.event.clientX;
    mouse.y = d3.event.clientY;

    var zoomDamp = distance.v / 1000;

    target.x = targetOnDown.x + (mouse.x - mouseOnDown.x) * 0.005 * zoomDamp;
    target.y = targetOnDown.y + (mouse.y - mouseOnDown.y) * 0.005 * zoomDamp;

    target.y = target.y > PI_HALF ? PI_HALF : target.y;
    target.y = target.y < - PI_HALF ? - PI_HALF : target.y;
  }

  var zoom = function (delta) {
    distance.t -= delta;
    distance.t = distance.t > 1000 ? 1000 : distance.t;
    distance.t = distance.t < 350  ? 350  : distance.t;
  }

  function onMouseWheel() {
    d3.event.preventDefault();
    if (overRenderer) {
      zoom(d3.event.wheelDeltaY * 0.3);
    }
    return false;
  }

  function onMouseUp() {
    canvas.on('mousemove', null).on('mouseup', null).on('mouseout', null);
  }

  function onMouseOut() {
    canvas.on('mousemove', null).on('mouseup', null).on('mouseout', null);
  }

  function onDocumentKeyDown() {
    switch (d3.event.keyCode) {
      case 38:
        zoom(100);
        d3.event.preventDefault();
        break;
      case 40:
        zoom(-100);
        d3.event.preventDefault();
        break;
    }
  }

};

export var update = function (delta) {
  return distance.v += delta;
}
