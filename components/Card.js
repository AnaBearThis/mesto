export default class Card {
    constructor(cardTemplate, name, link, handleCardClick) {
        this._cardTemplate = cardTemplate;
        this._name = name;
        this._link = link;
        this._handleCardClick = handleCardClick;
    }

    _getCardItem() {
        const cardItem = document
            .querySelector(this._cardTemplate)
            .content
            .querySelector('.card')
            .cloneNode(true);
        
        return cardItem;    
    }

    renderCard() {
        this._card = this._getCardItem();
        this._cardDescription = this._card.querySelector('.card__description');
        this._cardName = this._cardDescription.querySelector('.card__name');
        this._cardPic = this._card.querySelector('.card__pic');

        this._cardName.textContent = this._name;
        this._cardPic.src = this._link;
        this._cardPic.alt = this._name;

        this._buttonLike = this._card.querySelector('.card__like-button');
        this._buttonDelete = this._card.querySelector('.card__delete-button');

        this._setEventListeners();

        return this._card;
    }

    _likeButton() {
        this._buttonLike.classList.toggle('card__like-button_active');
    }

    _deleteCard() {
        this._card.remove();
    }

    _setEventListeners() {
        this._buttonLike.addEventListener('click', () => this._likeButton());
        this._buttonDelete.addEventListener('click', () => this._deleteCard());
        this._cardPic.addEventListener('click', () => this._handleCardClick());
    }
}