'use strict';
window.setup = (function () {
// Константы
//  var WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
//  var WIZARD_SUR_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_COAT_COLORS = ['101, 137, 164', '241, 43, 107', '146, 100, 161', '56, 159, 117', '215, 210, 55', '0, 0, 0'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var MAX_WIZARDS = 4;
  // Переменные
  // var wizards = [];
  // var arrColorCoatTemp = WIZARD_COAT_COLORS.slice();
  // var arrColorEyesTemp = WIZARD_EYES_COLORS.slice();
  var objColorFireball = {
    '#ee4830': 'rgb(238, 72, 48)',
    '#30a8ee': 'rgb(48, 168, 238)',
    '#5ce6c0': 'rgb(92, 230, 192)',
    '#e848d5': 'rgb(232, 72, 213)',
    '#e6e848': 'rgb(230, 232, 72)'
  };
  var userDialog = document.querySelector('.setup');
  var form = userDialog.querySelector('.setup-wizard-form');
  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  // var fragment = document.createDocumentFragment();
  var shop = document.querySelector('.setup-artifacts-shop');
  var draggedItem = null;
  var draggedItemCopy = null;
  var artifactsBag = document.querySelector('.setup-artifacts');

  // Функции
  // Получение случайного целого значения
  // var getRandomInt = function (minValue, maxValue) {
  //  return Math.floor(Math.random() * (maxValue - minValue)) + minValue;
  // };
  // Получение цвета
  // var getColorUnic = function (arrColor) {
  //  return arrColor.splice(getRandomInt(0, arrColor.length), 1);
  // };
  // Получение имен магов
  // var generateName = function () {
  //  var indexRandom = getRandomInt(0, WIZARD_FIRST_NAMES.length);
  //  var firstName = WIZARD_FIRST_NAMES.splice(indexRandom, 1);
  //  var surName = WIZARD_SUR_NAMES.splice(indexRandom, 1);
  //  return firstName + ' ' + surName;
  // };

  // Формирование фигурок магов для вывода на страницу - заполнение данными из массива объектов
  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
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
  // Отправка данных из формы на сервер
  var onFormSubmit = function (evt) {
    window.backend.save(new FormData(form), function () {
      userDialog.classList.add('hidden');
    }, errorHandler);
    evt.preventDefault();
  };

  // Обработчики событий
  shop.addEventListener('dragstart', onShopDragstart);
  artifactsBag.addEventListener('dragover', onArtifactDragover);
  artifactsBag.addEventListener('drop', onArtifactDrop);
  artifactsBag.addEventListener('dragenter', onArtifactDragenter);
  artifactsBag.addEventListener('dragleave', onArtifactDragleave);
  form.addEventListener('submit', onFormSubmit);

  // Реализация

  // Заполняем данными массив объектов магов
  // for (var i = 0; i < MAX_WIZARDS; i++) {
  //  wizards[i] = {
  //    name: generateName(),
  //    coatColor: 'rgb(' + getColorUnic(arrColorCoatTemp) + ')',
  //    eyesColor: getColorUnic(arrColorEyesTemp)
  //  };
  // }
  // Переносим данные из массива объектов во фрагмент для вставки на страницу
  // wizards.forEach(function (elem) {
  //  fragment.appendChild(renderWizard(elem));
  // });
  // Добавляем фрагмент на страницу
  // similarListElement.appendChild(fragment);

  var successHandler = function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 5; i < MAX_WIZARDS + 5; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);
    userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 5px auto; text-align: center; background-color: magenta; border: 2px solid black';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

  // Объект с экспортируемыми массивами цветов и методами для покраски элементов в диалоге
  return {
    arrColorEyes: WIZARD_EYES_COLORS.slice(),
    arrColorCoat: WIZARD_COAT_COLORS.map(function (elem) {
      return 'rgb(' + elem + ')';
    }),
    arrColorFireball: FIREBALL_COLORS.map(function (elem) {
      return objColorFireball[elem];
    }),

    fillElement: function (elem, color) {
      elem.style.fill = color;
    },
    changeElementBackground: function (elem, color) {
      elem.style.backgroundColor = color;
    }
  };
})();
