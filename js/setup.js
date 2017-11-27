'use strict';
// Константы
var WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SUR_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['101, 137, 164', '241, 43, 107', '146, 100, 161', '56, 159, 117', '215, 210, 55', '0, 0, 0'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var MAX_WIZARDS = 4;
// Переменные
var wizards = [];
var userDialog = document.querySelector('.setup');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var fragment = document.createDocumentFragment();

// Функции
// Получение случайного целого значения
var getRandomInt = function (minValue, maxValue) {
  return Math.floor(Math.random() * (maxValue - minValue)) + minValue;
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

// Реализация
// Заполняем данными массив объектов магов
for (var i = 0; i < MAX_WIZARDS; i++) {
  wizards[i] = {
    name: generateName(),
    coatColor: 'rgb(' + WIZARD_COAT_COLORS.splice(getRandomInt(0, WIZARD_COAT_COLORS.length), 1) + ')',
    eyesColor: WIZARD_EYES_COLORS.splice(getRandomInt(0, WIZARD_EYES_COLORS.length), 1)
  };
}
// Переносим данные из массива объектов во фрагмент с маркерами для вставки на страницу
wizards.forEach(function (elem) {
  fragment.appendChild(renderWizard(elem));
});
// Добавляем фрагмент на страницу
similarListElement.appendChild(fragment);
// Делаем видимым диалог
userDialog.classList.remove('hidden');
userDialog.querySelector('.setup-similar').classList.remove('hidden');
