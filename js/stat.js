'use strict';

window.renderStatistics = function (ctx, names, times) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.strokeRect(110, 20, 420, 270);
  ctx.fillRect(110, 20, 420, 270);
  ctx.fillStyle = 'rgba(255, 255, 255, 1)';
  ctx.strokeRect(100, 10, 420, 270);
  ctx.fillRect(100, 10, 420, 270);

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';

  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 65);

  var max = -1;

  for (var i = 0; i < times.length; i++) {
    var time = times[i];
    if (time > max) {
      max = time;
    }
  }

  var histogramHeight = 150;
  var step = histogramHeight / (max - 0);

  var barWidth = 40;
  var indent = 90;
  var initialX = 120;
  var initialY = 80 + histogramHeight;
  var lineHeight = 20;
  var transparency = 0.2;

  for (i = 0; i < times.length; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'red';
    } else {
      if (transparency < 1) {
        transparency += 0.2;
      } else {
        transparency = 0.2;
      }
      ctx.fillStyle = 'rgba(0, 0, 255, ' + transparency + ')';
    }
    ctx.fillRect(initialX + indent * i, initialY, barWidth, -(times[i] * step));
    ctx.fillText(names[i], initialX + indent * i, initialY + lineHeight);
  }
};
