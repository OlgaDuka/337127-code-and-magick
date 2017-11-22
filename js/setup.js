'use strict';
var WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SUR_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

var getRandomValue = function (arr) {
  return Math.floor(Math.random() * (arr.length));
};

var generateName = function () {
  var j = getRandomValue(WIZARD_FIRST_NAMES);
  var firstName = WIZARD_FIRST_NAMES.splice(j, 1);
  var surName = WIZARD_SUR_NAMES.splice(j, 1);
  return firstName + ' ' + surName;
};

var generateColor = function (arrColor) {
  var j = getRandomValue(arrColor);
  return arrColor.splice(j, 1);
};

var wizards = [];

for (var i = 0; i < 4; i++) {
  wizards[i] = {
    name: generateName(),
    coatColor: generateColor(WIZARD_COAT_COLOR),
    eyesColor: generateColor(WIZARD_EYES_COLOR),
  };
}

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
