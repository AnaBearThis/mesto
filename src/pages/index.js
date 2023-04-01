import './index.css';
import FormValidator from "../components/FormValidator.js";
import Api from '../components/Api';
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import { page, formValidationConfig, photosContainer, popupEdit, popupChangeAvatar, popupView, popupAdd, buttonOpenEditProfilePopup, buttonOpenAddCardPopup, placeInput, linkInput, nameInput, descriptionInput, profileName, profileDescription, profileAvatarButton, profileAvatar } from "../utils/constants.js";
import renderSaving from '../utils/utils';
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupSubmit from '../components/PopupSubmit';
import UserInfo from "../components/UserInfo.js";
import { data } from 'autoprefixer';

const formValidators = {}

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-62',
    headers: {
        'content-type': 'application/json',
        authorization: '1c3d7c79-b03c-416f-89d5-3375c3a2efb8'
    }
})

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userInfo, cards]) => {
        user.setUserInfo(userInfo.name, userInfo.about, userInfo.avatar);
        const userId = userInfo._id;
        const nicerCards = Array.from(cards.reverse());
        cardList.renderItems(nicerCards, userId);
    })
    .catch((err) => console.log(err))

const enableValidation = (formValidationConfig) => {
    const formList = Array.from(document.querySelectorAll(formValidationConfig.formSelector))
    formList.forEach((formElement) => {
        const validator = new FormValidator(formElement, formValidationConfig)
        const formName = formElement.getAttribute('name')
      
        formValidators[formName] = validator;
    validator.enableValidation();
    });
};
enableValidation(formValidationConfig);

const popupAvatar = new PopupWithForm(popupChangeAvatar, (input) => {
    renderSaving(true, popupAvatar);
    api.changeAvatar(input)
        .then(data => {
            user.setUserAvatar(data.avatar);
        })
        .then(() => {
            popupAvatar.close();
        })
        .catch((err) => console.log(err))
        .finally(() => renderSaving(false, popupAvatar))
});
popupAvatar.setEventListeners();

const user = new UserInfo({
    userName: profileName,
    userJob: profileDescription,
    userAvatar: profileAvatar
});

const popupEditInfo = new PopupWithForm(popupEdit, (input) => {
    renderSaving(true, popupEditInfo);
    api.editProfile(input.name, input.description)
        .then(data => {
            user.setUserInfo(data.name, data.about, profileAvatar.src);
        })
        .then(() => {
            popupEditInfo.close();
        })
        .catch((err) => console.log(err))
        .finally(() => renderSaving(false, popupEditInfo))
});
popupEditInfo.setEventListeners();

const popupViewItem = new PopupWithImage(popupView);
popupViewItem.setEventListeners();

const popupDelete = new PopupSubmit(page.querySelector('.popup_type_submit'), () => {
    renderSaving(true, popupDelete);
    const cardToDelete = popupDelete.element.item;
    api.deleteCard(popupDelete.elementId)
        .then(() => {
            cardToDelete.remove();
        })
        .then(() => {
            popupDelete.close();
        })
        .catch((err) => console.log(err))
        .finally(() => renderSaving(false, popupDelete))
    });
popupDelete.setEventListeners();    

const createCard = (name, link, ownerId, likes, cardId, userId) => {
    const card = new Card(
        '#card',
        name,
        link,
        ownerId,
        likes,
        cardId,
        userId,
        () => popupViewItem.open(name, link),
        () => {
            //popupDelete(cardId)
            popupDelete.open(card, cardId); 
        },
        () => {
            const likeButton = card.item.querySelector('.card__like-button');
            if (!card.checkUserLike()) {
                api.like(cardId)
                    .then((data) => {
                        likeButton.classList.add('card__like-button_active');
                        const newLikes = data.likes;
                        card.newLikeAmount(newLikes);
                    })
                    .catch((err) => console.log(err));
            } else {
                api.removeLike(cardId)
                    .then((data) => {
                        likeButton.classList.remove('card__like-button_active');
                        const newLikes = data.likes;
                        card.newLikeAmount(newLikes);
                    })
                    .catch((err) => console.log(err));
            }
        }
        );  
    return card.renderCard()
};

const cardList = new Section({
    renderer: (cardItem, userId) => {
        const newCard =  createCard(cardItem.name, cardItem.link, cardItem.owner._id, cardItem.likes, cardItem._id, userId);
        cardList.addItem(newCard);
    }
    },
    photosContainer
)

const popupAddCard = new PopupWithForm(popupAdd, (input) => {
    renderSaving(true, popupAddCard);
    api.createCard(input)
        .then((data) => {
            cardList.addItem(createCard(data.name, data.link, data.owner._id, data.likes, data._id, data.owner._id));
        })
        .then(() => {
            popupAddCard.close();
        })
        .catch((err) => console.log(err))
        .finally(() => renderSaving(false, popupAddCard))
})
popupAddCard.setEventListeners();

profileAvatarButton.addEventListener('click', () => {
    popupAvatar.open();
    formValidators['newAvatar'].toggleButton();
})

buttonOpenEditProfilePopup.addEventListener('click', () => {
    popupEditInfo.open();
    formValidators['userInfo'].toggleButton();
    const {name, job} = user.getUserInfo()
    nameInput.value = name;
    descriptionInput.value = job;
});
buttonOpenAddCardPopup.addEventListener('click', () => {
     popupAddCard.open();
     formValidators['newCard'].toggleButton();
});