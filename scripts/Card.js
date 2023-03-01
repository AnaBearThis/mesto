export default class Card {
    constructor(cardTemplate, openPopupView) {
        this._cardTemplate = cardTemplate;
        this._openPopupView = openPopupView;
    }

    _getCardItem() {
        const cardItem = document
            .querySelector(this._cardTemplate)
            .content
            .querySelector('.card')
            .cloneNode(true);
        
        return cardItem;    
    }

    renderCard(name, link) {
        this._card = this._getCardItem();
        this._cardDescription = this._card.querySelector('.card__description');
        this._cardName = this._cardDescription.querySelector('.card__name');
        this._cardPic = this._card.querySelector('.card__pic');

        this._cardName.textContent = name;
        this._cardPic.src = link;
        this._cardPic.alt = name;

        this._buttonLike = this._card.querySelector('.card__like-button');
        this._buttonDelete = this._card.querySelector('.card__delete-button');

        this._setEventListeners();

        return this._card;
    }

    _setEventListeners() {
        this._buttonLike.addEventListener('click', () => this._buttonLike.classList.toggle('card__like-button_active'));
        this._buttonDelete.addEventListener('click', () => this._card.remove());
        this._cardPic.addEventListener('click', () => this._openPopupView(this._cardPic.src, this._cardName.textContent));
    }
}