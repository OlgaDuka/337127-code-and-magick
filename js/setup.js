'use strict';
window.setup = (function () {
// Константы
  var WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SUR_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_COAT_COLORS = ['101, 137, 164', '241, 43, 107', '146, 100, 161', '56, 159, 117', '215, 210, 55', '0, 0, 0'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var MAX_WIZARDS = 4;
  // Переменные
  var wizards = [];
  var arrColorCoat = WIZARD_COAT_COLORS.slice();
  var arrColorEyes = WIZARD_EYES_COLORS.slice();
  var arrColorFireball = FIREBALL_COLORS.slice();
  var userDialog = document.querySelector('.setup');
  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var fragment = document.createDocumentFragment();
  var shop = document.querySelector('.setup-artifacts-shop');
  var draggedItem = null;
  var draggedItemCopy = null;
  var artifactsBag = document.querySelector('.setup-artifacts');


  // Функции
  // Получение случайного целого значения
  var getRandomInt = function (minValue, maxValue) {
    return Math.floor(Math.random() * (maxValue - minValue)) + minValue;
  };
  // Получение цвета
  var getColorUnic = function (arrColor) {
    return arrColor.splice(getRandomInt(0, arrColor.length), 1);
  };
  // Получение имен магов
  var generateName = function () {
    var indexRandom = getRandomInt(0, WIZARD_FIRST_NAMES.length);
    var firstName = WIZARD_FIRST_NAMES.splice(indexRandom, 1);
    var surName = WIZARD_SUR_NAMES.splice(indexRandom, 1);
    return firstName + ' ' + surName;
  };
  // Формирование фигурок магов для вывода на страницу - заполнение данными из массива объектов
  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    return wizardElement;
  };

  // Обработка событий
  // при перетаскивании артефактов из магазина в рюкзачок
  // Функции
  // Сообщим магазину, что мы у него утащили (alt в разметке)
  var onShopDragstart = function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      draggedItemCopy = draggedItem.cloneNode(true);
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
  };
  // Разрешим браузеру перетаскивать звезды в рюкзачок
  var onArtifactDragover = function (evt) {
    evt.preventDefault();
    return false;
  };
  // Событие бросить - добавляем элемент в цель
  var onArtifactDrop = function (evt) {
    evt.target.style.backgroundColor = '';
    evt.target.style.outline = '';
    evt.target.appendChild(draggedItemCopy);
    evt.preventDefault();
  };
  // Событие "элемент над целью" - красим цель в желтый
  var onArtifactDragenter = function (evt) {
    evt.target.style.backgroundColor = 'yellow';
    evt.target.style.outline = '2px dashed red';
    evt.preventDefault();
  };
  // Событие "элемент покидает цель" - цвет убираем
  var onArtifactDragleave = function (evt) {
    evt.target.style.backgroundColor = '';
    evt.target.style.outline = '';
    evt.preventDefault();
  };

  // Обработчики событий
  shop.addEventListener('dragstart', onShopDragstart);
  artifactsBag.addEventListener('dragover', onArtifactDragover);
  artifactsBag.addEventListener('drop', onArtifactDrop);
  artifactsBag.addEventListener('dragenter', onArtifactDragenter);
  artifactsBag.addEventListener('dragleave', onArtifactDragleave);

  // Реализация
  // Заполняем данными массив объектов магов
  for (var i = 0; i < MAX_WIZARDS; i++) {
    wizards[i] = {
      name: generateName(),
      coatColor: 'rgb(' + getColorUnic(arrColorCoat) + ')',
      eyesColor: getColorUnic(arrColorEyes)
    };
  }
  // Переносим данные из массива объектов во фрагмент для вставки на страницу
  wizards.forEach(function (elem) {
    fragment.appendChild(renderWizard(elem));
  });
  // Добавляем фрагмент на страницу
  similarListElement.appendChild(fragment);

  // Объект с экспортируемыми методами для покраски элементов в диалоге
  return {
    getColorCoat: function (elem) {
      if (arrColorCoat.length === 0) {
        arrColorCoat = WIZARD_COAT_COLORS.slice();
      }
      elem.style.fill = 'rgb(' + arrColorCoat.splice(0, 1) + ')';
    },
    getColorEyes: function (elem) {
      if (arrColorEyes.length === 0) {
        arrColorEyes = WIZARD_EYES_COLORS.slice();
      }
      elem.style.fill = arrColorEyes.splice(0, 1);
    },
    getColorFireball: function (elem) {
      if (arrColorFireball.length === 0) {
        arrColorFireball = FIREBALL_COLORS.slice();
      }
      elem.style.background = arrColorFireball.splice(0, 1);
    }
  };
})();
