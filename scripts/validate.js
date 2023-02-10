function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((form) => {
        form.addEventListener('input', () => {
            setInputListeners(form, config);
        });
    });
}

function showInputError(inputItem, config) {
    const inputId = inputItem.id;
    const inputError = document.querySelector(`#${inputId}-error`);
    if (!inputItem.validity.valid) {
        inputItem.classList.add(config.inputErrorClass);
        inputError.classList.add(config.errorClass);
        inputError.textContent = inputItem.validationMessage;
    }
};

function hideInputError(inputItem, config) {
    const inputId = inputItem.id;
    const inputError = document.querySelector(`#${inputId}-error`);
    if (inputItem.validity.valid) {
        inputItem.classList.remove(config.inputErrorClass);
        inputError.classList.remove(config.errorClass);
        inputError.textContent = '';
    }
};

function toggleButton(form, config) {
    const buttonSubmit = form.querySelector(config.submitButtonSelector);
    const isFormValid = form.checkValidity();

    buttonSubmit.disabled = !isFormValid;
    buttonSubmit.classList.toggle(config.inactiveButtonClass, !isFormValid);
}

function setInputListeners(form, config) {
    const inputList = Array.from(form.querySelectorAll(config.inputSelector));
    inputList.forEach(function (inputItem) {
        inputItem.addEventListener('input', () => {
            showInputError(inputItem, config);
            console.log(inputItem.classList);
            hideInputError(inputItem, config);
            toggleButton(form, config);
        });
        toggleButton(form, config);
    });
};

enableValidation(formValidationConfig);