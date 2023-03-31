import Popup from "./Popup";

export default class PopupSubmit extends Popup {
    constructor(popup, submit) {
        super(popup);
        this._submitButton = this._popup.querySelector('.popup__submit-button');
        this._submit = submit;
    }

    open(id) {
        super.open();
        this._id = id;
    }

    setEventListeners() {
        super.setEventListeners();
        this._submitButton.addEventListener('click', this._submit);
    }
}