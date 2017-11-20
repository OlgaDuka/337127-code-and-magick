'use strict';

window.renderStatistics = function (ctx, names, times) {
  var fieldFront = {
    x1: 100,
    y1: 10,
    x2: 520,
    y2: 280,
    radius: 20
  };

  var fieldShadow = {};

  var fieldShadowValue = function (fieldObject, valueOffsetX, valueOffsetY) {
    fieldShadow.x1 = fieldObject.x1 + valueOffsetX;
    fieldShadow.y1 = fieldObject.y1 + valueOffsetY;
    fieldShadow.x2 = fieldObject.x2 + valueOffsetX;
    fieldShadow.y2 = fieldObject.y2 + valueOffsetY;
    fieldShadow.radius = fieldObject.radius;
  };

  var fieldDrow = function (field) {
    ctx.beginPath();
    ctx.moveTo(field.x1, field.y1 + field.radius);
    ctx.quadraticCurveTo(field.x1, field.y1, field.x1 + field.radius, field.y1);
    ctx.lineTo(field.x2 - field.radius, field.y1);
    ctx.quadraticCurveTo(field.x2, field.y1, field.x2, field.y1 + field.radius);
    ctx.lineTo(field.x2, field.y2 - field.radius);
    ctx.quadraticCurveTo(field.x2, field.y2, field.x2 - field.radius, field.y2);
    ctx.lineTo(field.x1 + field.radius, field.y2);
    ctx.quadraticCurveTo(field.x1, field.y2, field.x1, field.y2 - field.radius);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  };

  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  fieldShadowValue(fieldFront, 10, 5);
  fieldDrow(fieldShadow);
  ctx.fillStyle = 'rgba(255, 255, 255, 1)';
  fieldDrow(fieldFront);

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';

  ctx.fillText('Ура! Вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 65);

  var max = Math.max.apply(null, times);

  var getRandomValue = function (minValue, maxValue) {
    return Math.random() * (maxValue - minValue) + minValue;
  };

  var histogram = {
    height: 150,
    step: function () {
      return histogram.height / max;
    },
    barWidth: 40,
    indent: 90,
    initialX: 120,
    initialY: function () {
      return histogram.height + 80;
    },
    lineHeight: 20
  };

  for (var i = 0; i < times.length; i++) {
    ctx.fillStyle = (names[i] === 'Вы') ? 'red' : 'rgba(0, 0, 255, ' + getRandomValue(0.1, 1) + ')';
    ctx.fillRect(histogram.initialX + histogram.indent * i, histogram.initialY(), histogram.barWidth, -(times[i] * histogram.step()));
    ctx.fillText(names[i], histogram.initialX + histogram.indent * i, histogram.initialY() + histogram.lineHeight);
  }
};
