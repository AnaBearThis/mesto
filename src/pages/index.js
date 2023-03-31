import './index.css';
import FormValidator from "../components/FormValidator.js";
import Api from '../components/Api';
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import { page, formValidationConfig, photosContainer, popupEdit, popupChangeAvatar, popupView, popupAdd, buttonOpenEditProfilePopup, buttonOpenAddCardPopup, placeInput, linkInput, nameInput, descriptionInput, profileName, profileDescription, profileAvatar } from "../utils/constants.js";
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
        setCard.renderEls(nicerCards, userId);
    })
    .catch((err) => console.log(err))

function renderSaving(isSaving, popup) {
    if (isSaving) {
        popup.popupSubmitButton.textContent = 'Сохранение...';
    } else {
        popup.popupSubmitButton.textContent = popup.popupSubmitButton.value;
    }
};

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

const popupAvatar = new PopupWithForm(popupChangeAvatar, (evt) => {
    evt.preventDefault();
    renderSaving(true, popupAvatar);
    const inputValues = popupAvatar.getInputValues();
    api.changeAvatar(inputValues)
        .then(data => {
            user.setUserAvatar(data.avatar);
        })
        .catch((err) => console.log(err))
        .finally(() => renderSaving(false, popupAvatar))
    popupAvatar.close();
});
popupAvatar.setEventListeners();

const user = new UserInfo({
    userName: profileName,
    userJob: profileDescription,
    userAvatar: profileAvatar,
    handleAvClick: () => popupAvatar.open()
});
user.setEventListeners();



const popupEditInfo = new PopupWithForm(popupEdit, (evt) => {
    evt.preventDefault();
    renderSaving(true, popupEditInfo);
    const inputValues = popupEditInfo.getInputValues();
    api.editProfile(inputValues.name, inputValues.description)
        .then(data => {
            user.setUserInfo(data.name, data.about, profileAvatar.src);
        })
        .catch((err) => console.log(err))
        .finally(() => renderSaving(false, popupEditInfo))
    popupEditInfo.close();
});
popupEditInfo.setEventListeners();

const popupViewItem = new PopupWithImage(popupView);
popupViewItem.setEventListeners();

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
            const popupDelete = new PopupSubmit(page.querySelector('.popup_type_submit'), (evt) => {
                evt.preventDefault();
                renderSaving(true, popupDelete);
                api.deleteCard(cardId)
                    .then(() => {
                        const cardToDelete = card.item;
                        cardToDelete.remove();
                        popupDelete.close()
                    })
                    .catch((err) => console.log(err))
                    .finally(() => renderSaving(false, popupDelete))
                });
            popupDelete.open();     
            popupDelete.setEventListeners();    
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

const setCard = new Section({
    renderer: (cardItem, userId) => {
        const newCard =  createCard(cardItem.name, cardItem.link, cardItem.owner._id, cardItem.likes, cardItem._id, userId);
        setCard.addItem(newCard);
    }
    },
    photosContainer
)

const popupAddCard = new PopupWithForm(popupAdd, (evt) => {
    evt.preventDefault();
    renderSaving(true, popupAddCard);
    api.createCard(popupAddCard.getInputValues())
        .then((data) => {
            setCard.addItem(createCard(data.name, data.link, data.owner._id, data.likes, data._id, data.owner._id));
        })
        .catch((err) => console.log(err))
        .finally(() => renderSaving(false, popupAddCard))
    popupAddCard.close();
})
popupAddCard.setEventListeners();

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