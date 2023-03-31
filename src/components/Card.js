export default class Card {
    constructor(cardTemplate, name, link, ownerId, likes, cardId, userId, handleCardClick, handleCardDeleteButton, handleLikeButton) {
        this._cardTemplate = cardTemplate;
        this._name = name;
        this._link = link;
        this._userId = userId;
        this._ownerId = ownerId;
        this._likes = likes;
        this.cardId = cardId;
        this._handleCardClick = handleCardClick;
        this._handleCardDeleteButton = handleCardDeleteButton;
        this._handleLikeButton = handleLikeButton;
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
        this.item = this._getCardItem();
        this._cardDescription = this.item.querySelector('.card__description');
        this._cardName = this._cardDescription.querySelector('.card__name');
        this._cardPic = this.item.querySelector('.card__pic');
        this._likesContainer = this._cardDescription.querySelector('.card__likes');
        this.likesCount = this._likesContainer.querySelector('.card__like-counter');

        this._cardName.textContent = this._name;
        this._cardPic.src = this._link;
        this._cardPic.alt = this._name;
        this.likesCount.textContent = this._likes.length;

        this._buttonLike = this._likesContainer.querySelector('.card__like-button');
        
        this.newLikeAmount(this._likes);

        this.checkUserLike = function () {
            return Array.from(this._likes).some(item => item._id === this._userId);
        }
        if(this.checkUserLike()) {
            this._buttonLike.classList.add('card__like-button_active');
        } else {
            this._buttonLike.classList.remove('card__like-button_active');
        };

        this._buttonDelete = this.item.querySelector('.card__delete-button');
        if(this._ownerId !== this._userId) {
            this._buttonDelete.remove();
        }

        this._setEventListeners();

        return this.item;
    }

    newLikeAmount(data) {
        this._likes = data;
        this.likesCount.textContent = data.length;
    };
    

    _likeButton() {
        this._buttonLike.classList.toggle('card__like-button_active');
    }

    _setEventListeners() {
        this._buttonLike.addEventListener('click', () => this._handleLikeButton(this._cardId));
        this._buttonDelete.addEventListener('click', () => this._handleCardDeleteButton(this.cardId));
        this._cardPic.addEventListener('click', () => this._handleCardClick());
    }
}