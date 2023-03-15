import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submit) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._submit = submit;
        this._formValues = {};
        this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
    }

    getInputValues() {
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }

    close() {
        super.close();
        this._form.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._submit);
    }
}