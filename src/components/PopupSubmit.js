import Popup from "./Popup";

export default class PopupSubmit extends Popup {
    constructor(popup, submit) {
        super(popup);
        this._submitButton = this._popup.querySelector('.popup__submit-button');
        this._submit = submit;
    }

    open(element, elementId) {
        super.open();
        this.element = element;
        this.elementId = elementId;
    }

    setEventListeners() {
        super.setEventListeners();
        this._submitButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            this._submit();
            this.close();
        });
    }
}