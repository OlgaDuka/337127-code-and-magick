'use strict';
window.dialog = (function () {
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
    window.util.isEscEvent(evt, closePopup);
  };
  // Реакция на нажатие ENTER, когда кнопка закрытия в фокусе
  var onPopupEnterPress = function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  };
  // Открыть окно настроек
  var openPopup = function () {
    setup.classList.remove('hidden');
    setupList.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };
  // Закрыть окно настроек
  var closePopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
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
    window.setup.getColorCoat(userWizardCoat);
  };

  var onEyesClick = function () {
    window.setup.getColorEyes(userWizardEyes);
  };

  var onFireballClick = function () {
    window.setup.getColorFireball(fireball);
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
})();
