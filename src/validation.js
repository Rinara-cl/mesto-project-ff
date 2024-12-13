const setButtonState = (buttonElement, isDisabled, inactiveButtonClass) => {
  buttonElement.disabled = isDisabled;
  if (isDisabled) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  validationConfig
) => {
  const {inputErrorClass, errorClass} = validationConfig;
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (
  formElement,
  inputElement,
  validationConfig
) => {
  const {inputErrorClass, errorClass} = validationConfig;
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement, validationConfig) => {
  if (inputElement.validity.patternMismatch) {
  inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
  inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
  showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
  hideInputError(formElement, inputElement, validationConfig);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  const { inactiveButtonClass } = validationConfig;
  setButtonState(buttonElement, hasInvalidInput(inputList), inactiveButtonClass);
};

const setEventListeners = (formElement, validationConfig) => {
  const {inputSelector, submitButtonSelector} = validationConfig;

  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  toggleButtonState(inputList, buttonElement, validationConfig);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, validationConfig);

      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
}

export const enableValidation = (validationConfig) => {
  const {formSelector} = validationConfig;
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement)  => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationConfig);
  });
}

export const clearValidation = (formElement, validationConfig) => {
  const {inputSelector, submitButtonSelector, inactiveButtonClass} = validationConfig;

  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  inputList.forEach((input) => {
    hideInputError(formElement, input, '', validationConfig, false);
  });

  setButtonState(buttonElement, true, inactiveButtonClass);

};
