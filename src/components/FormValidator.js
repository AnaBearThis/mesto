export default class FormValidator {
    constructor (form, config) {
        this._config = config;
        this._form = form;
        this._buttonSubmit = this._form.querySelector(this._config.submitButtonSelector);
    }

    enableValidation() {
        this._setInputListeners();
    }

    _showInputError(inputItem) {
        const _inputId = inputItem.id;
        const _inputError = document.querySelector(`#${_inputId}-error`);
        inputItem.classList.add(this._config.inputErrorClass);
        _inputError.classList.add(this._config.errorClass);
        _inputError.textContent = inputItem.validationMessage;
    }

    _hideInputError(inputItem) {
        const _inputId = inputItem.id;
        const _inputError = document.querySelector(`#${_inputId}-error`);
        inputItem.classList.remove(this._config.inputErrorClass);
        _inputError.classList.remove(this._config.errorClass);
        _inputError.textContent = '';
    }

    _handleInputError(inputItem) {
        if (inputItem.validity.valid) {
           this._hideInputError(inputItem);
        } else {
           this._showInputError(inputItem);
        }
    }

    toggleButton() {
        const _isFormValid = this._form.checkValidity();
        
        this._buttonSubmit.disabled = !_isFormValid;
        this._buttonSubmit.classList.toggle(this._config.inactiveButtonClass, !_isFormValid);
    }

    _setInputListeners() {
        const _inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
        _inputList.forEach((inputItem) => {
            inputItem.addEventListener('input', () => {
                this.toggleButton();
                this._handleInputError(inputItem);
            });
            this.toggleButton();
            })
    }

}