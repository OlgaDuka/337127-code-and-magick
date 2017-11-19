'use strict';

window.renderStatistics = function (ctx, names, times) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.beginPath();
  ctx.moveTo(110, 30);
  ctx.quadraticCurveTo(110, 20, 120, 20);
  ctx.lineTo(520, 20);
  ctx.quadraticCurveTo(530, 20, 530, 30);
  ctx.lineTo(530, 280);
  ctx.quadraticCurveTo(530, 290, 520, 290);
  ctx.lineTo(120, 290);
  ctx.quadraticCurveTo(110, 290, 110, 280);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();

  ctx.fillStyle = 'rgba(255, 255, 255, 1)';
  ctx.beginPath();
  ctx.moveTo(100, 20);
  ctx.quadraticCurveTo(100, 10, 110, 10);
  ctx.lineTo(510, 10);
  ctx.quadraticCurveTo(520, 10, 520, 20);
  ctx.lineTo(520, 270);
  ctx.quadraticCurveTo(520, 280, 510, 280);
  ctx.lineTo(110, 280);
  ctx.quadraticCurveTo(100, 280, 100, 270);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();

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
