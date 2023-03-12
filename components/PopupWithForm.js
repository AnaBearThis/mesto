import Popup from "./Popup.js";
//import { placeInput, linkInput } from "../utils/constants.js";
import handleCardFormSubmit from "../scripts/index.js";
import FormValidator from "./FormValidator.js"

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleCardFormSubmit) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._handleCardFormSubmit = handleCardFormSubmit;
    }

    _getInputValues() {
        this._inputList = this._form.querySelectorAll('.popup__input');
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }

    close() {
        this._form.reset;
        super.close();
    }

    setEventListeners() {
        super.setEventListeners();
        const formValidator = new FormValidator(formValidationConfig, form);
        formValidator.enableValidation();
    }
}