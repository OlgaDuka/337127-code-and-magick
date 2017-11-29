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

// =========================================================
// Обработка событий

// Константы
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// Переменные
var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');
var userNameInput = setup.querySelector('.setup-user-name');

// Функции
// Реакция на нажатие ESC
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};
// Открыть окно настроек
var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};
// Закрыть окно настроек
var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

// Обработчики
// Открытие окна настроек по нажатию мышки
setupOpen.addEventListener('click', function () {
  openPopup();
});
// Открытие окна настроек с клавиатуры
setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});
// Закрытие окна настроек по нажатию мышки
setupClose.addEventListener('click', function () {
  closePopup();
});
// Закрытие окна настроек с клавиатуры
setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});
// Валидация ввода имени персонажа
userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});
