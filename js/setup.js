'use strict';
var WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SUR_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = [[101, 137, 164], [241, 43, 107], [146, 100, 161], [56, 159, 117], [215, 210, 55], [0, 0, 0]];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var getRandomValueForArr = function (arr) {
  return Math.floor(Math.random() * (arr.length));
};

var generateName = function () {
  var indexRandom = getRandomValueForArr(WIZARD_FIRST_NAMES);
  var firstName = WIZARD_FIRST_NAMES.splice(indexRandom, 1);
  var surName = WIZARD_SUR_NAMES.splice(indexRandom, 1);
  return firstName + ' ' + surName;
};

var generateColor = function (arrColor) {
  var indexRandom = getRandomValueForArr(arrColor);
  return arrColor.splice(indexRandom, 1);
};

var wizards = [];

for (var i = 0; i < 4; i++) {
  wizards[i] = {
    name: generateName(),
    coatColor: 'rgb(' + generateColor(WIZARD_COAT_COLORS) + ')',
    eyesColor: generateColor(WIZARD_EYES_COLORS),
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
