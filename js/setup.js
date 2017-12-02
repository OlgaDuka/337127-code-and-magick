'use strict';
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

// =========================================================
// Обработка событий

// Константы
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// Переменные
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupList = setup.querySelector('.setup-similar');
var userNameInput = setup.querySelector('.setup-user-name');
var userWizard = setup.querySelector('.setup-wizard');
var userWizardCoat = userWizard.querySelector('.wizard-coat');
var userWizardEyes = userWizard.querySelector('.wizard-eyes');
var fireball = setup.querySelector('.setup-fireball-wrap');

// Функции
// Реакция на нажатие ESC
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup(evt);
  }
};
// Реакция на нажатие ENTER, когда кнопка закрытия в фокусе
var onPopupEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup(evt);
  }
};
// Открыть окно настроек
var openPopup = function (evt) {
  if (evt && evt.type === 'click' || evt.keyCode === ENTER_KEYCODE) {
    setup.classList.remove('hidden');
    setupList.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  }
};
// Закрыть окно настроек
var closePopup = function (evt) {
  if (evt && evt.type === 'click' || evt.keyCode === ESC_KEYCODE || evt.keyCode === ENTER_KEYCODE) {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  }
};
// Валидация
var onInvalidInput = function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
};
//
var onCoatClick = function () {
  if (arrColorCoat.length === 0) {
    arrColorCoat = WIZARD_COAT_COLORS.slice();
  }
  userWizardCoat.style.fill = 'rgb(' + arrColorCoat.splice(0, 1) + ')';
};

var onEyesClick = function () {
  if (arrColorEyes.length === 0) {
    arrColorEyes = WIZARD_EYES_COLORS.slice();
  }
  userWizardEyes.style.fill = arrColorEyes.splice(0, 1);
};

var onFireballClick = function () {
  if (arrColorFireball.length === 0) {
    arrColorFireball = FIREBALL_COLORS.slice();
  }
  fireball.style.background = arrColorFireball.splice(0, 1);
};
// Обработчики
// 1.
// Открытие окна настроек по нажатию мышки
setupOpen.addEventListener('click', openPopup);

// Открытие окна настроек с клавиатуры
setupOpen.addEventListener('keydown', openPopup);

// Закрытие окна настроек по нажатию мышки
setupClose.addEventListener('click', closePopup);

// Закрытие окна настроек с клавиатуры
setupClose.addEventListener('keydown', onPopupEnterPress);

// 2.
// Валидация ввода имени персонажа
userNameInput.addEventListener('invalid', onInvalidInput);

// 3.
// Изменение цвета мантии персонажа по нажатию.
userWizardCoat.addEventListener('click', onCoatClick);
// Изменение цвета глаз персонажа по нажатию.
userWizardEyes.addEventListener('click', onEyesClick);
// Изменение цвета фаербола по нажатию.
fireball.addEventListener('click', onFireballClick);
