'use strict';
window.setup = (function () {
// Константы
  var WIZARD_COAT_COLORS = ['101, 137, 164', '241, 43, 107', '146, 100, 161', '56, 159, 117', '215, 210, 55', '0, 0, 0'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var MAX_WIZARDS = 4;
  // Переменные
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
  var shop = document.querySelector('.setup-artifacts-shop');
  var draggedItem = null;
  var draggedItemCopy = null;
  var artifactsBag = document.querySelector('.setup-artifacts');

  // Функции
  // Формирование фигурок магов для вывода на страницу
  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  // Обработка событий при перетаскивании артефактов из магазина в рюкзачок
  // Функции для вызова в обработчиках
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

  // Функции обратного вызова для обмена информацией с сервером
  // Успешное получение данных - рисуем волшебников
  var successHandler = function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 5; i < MAX_WIZARDS + 5; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);
    userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };
  // Ошибка - выводим сообщение для пользователя
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
  // Реализация
  // Обращение к серверу за данными
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
