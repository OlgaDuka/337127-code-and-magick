'use strict';

window.renderStatistics = function (ctx, names, times) {
  var fieldFront = {
    x1: 100,
    y1: 10,
    x2: 520,
    y2: 280,
    radius: 20
  };
  var fieldShadow = {
    x1: fieldFront.x1 + 10,
    y1: fieldFront.y1 + 10,
    x2: fieldFront.x2 + 10,
    y2: fieldFront.y2 + 10,
    radius: 20
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
  fieldDrow(fieldShadow);
  ctx.fillStyle = 'rgba(255, 255, 255, 1)';
  fieldDrow(fieldFront);

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';

  ctx.fillText('Ура! Вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 65);

  var max = 0;
  times.forEach(function (elem) {
    if (max <= elem) {
      max = elem;
    }
  });

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
    lineHeight: 20,
    transparency: 0.2
  };

  for (var i = 0; i < times.length; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'red';
    } else {
      histogram.transparency = Math.random();
      if (histogram.transparency === 0) {
        histogram.transparency = 0.5;
      }
      ctx.fillStyle = 'rgba(0, 0, 255, ' + histogram.transparency + ')';
    }
    ctx.fillRect(histogram.initialX + histogram.indent * i, histogram.initialY(), histogram.barWidth, -(times[i] * histogram.step()));
    ctx.fillText(names[i], histogram.initialX + histogram.indent * i, histogram.initialY() + histogram.lineHeight);
  }
};
