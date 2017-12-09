'use strict';
window.colorizeElement = function (elem, elemColor, arrColor, funcFillElement) {
  var numColor = arrColor.indexOf(elemColor);
  if (numColor === -1) {
    elemColor = arrColor[1];
  } else {
    numColor++;
    elemColor = (numColor < arrColor.length) ? arrColor[numColor] : arrColor[0];
  }
  funcFillElement(elem, elemColor);
};
