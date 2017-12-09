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
  var setupHandle = setup.querySelector('.setup-user-pic');
  var setupOpenCoord = {
    x: setup.style.top,
    y: setup.style.left
  };

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
    setup.style.top = setupOpenCoord.x;
    setup.style.left = setupOpenCoord.y;
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
  // Покраска инвентаря
  var onCoatClick = function () {
    window.colorizeElement(userWizardCoat, userWizardCoat.style.fill, window.setup.arrColorCoat, window.setup.fillElement);
  };
  var onEyesClick = function () {
    window.colorizeElement(userWizardEyes, userWizardEyes.style.fill, window.setup.arrColorEyes, window.setup.fillElement);
  };
  var onFireballClick = function () {
    window.colorizeElement(fireball, fireball.style.backgroundColor, window.setup.arrColorFireball, window.setup.changeElementBackground);
  };
  // Таскаем окно
  var onHandleMousedown = function (evt) {
    evt.preventDefault();
    // Начальные координаты
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    // Отслеживаем перемещение мыши
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
    };
    // Убираем слежение за событиями при отпускании мыши
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    // Обработаем события движения и отпускания мыши
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
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
  // 4.
  // Перетаскиваем окно диалога
  setupHandle.addEventListener('mousedown', onHandleMousedown);

})();
