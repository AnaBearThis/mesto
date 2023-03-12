import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._img = this._popup.querySelector('.popup__big-picture');
        this._placeName = this._popup.querySelector('.popup__place-name');
    }

    open(name, link) {
        super.open();
        this._img.src = link;
        this._img.alt = name;
        this._placeName.textContent = name;
    }

    close() {
        super.close();
    }

    _handleEscClose() {
        super._handleEscClose(evt);
    }

    setEventListeners() {
        super.setEventListeners();
    }
}