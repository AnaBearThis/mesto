export default class FormValidator {
    constructor (config, form) {
        this._config = config;
        this._form = form;
    }

    enableValidation() {
        this._setInputListeners();
    }

    _showInputError(inputItem) {
        this._inputId = inputItem.id;
        this._inputError = document.querySelector(`#${this._inputId}-error`);
        inputItem.classList.add(this._config.inputErrorClass);
        this._inputError.classList.add(this._config.errorClass);
        this._inputError.textContent = inputItem.validationMessage;
    }

    _hideInputError(inputItem) {
        this._inputId = inputItem.id;
        this._inputError = document.querySelector(`#${this._inputId}-error`);
        inputItem.classList.remove(this._config.inputErrorClass);
        this._inputError.classList.remove(this._config.errorClass);
        this._inputError.textContent = '';
    }

    _handleInputError(inputItem) {
        if (inputItem.validity.valid) {
           this._hideInputError(inputItem);
        } else {
           this._showInputError(inputItem);
        }
    }

    toggleButton() {
        this._buttonSubmit = this._form.querySelector(this._config.submitButtonSelector);
        this._isFormValid = this._form.checkValidity();
        
        this._buttonSubmit.disabled = !this._isFormValid;
        this._buttonSubmit.classList.toggle(this._config.inactiveButtonClass, !this._isFormValid);
    }

    _setInputListeners() {
        this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
        this._inputList.forEach((inputItem) => {
            inputItem.addEventListener('input', () => {
                this.toggleButton();
                this._handleInputError(inputItem);
            });
            this.toggleButton();
            })
    }
}