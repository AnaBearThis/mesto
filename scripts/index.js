import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import { initialCards, formValidationConfig, photosContainer, popupEdit, popupView, popupAdd, buttonOpenEditProfilePopup, buttonOpenAddCardPopup, placeInput, linkInput, nameInput, descriptionInput, profileName, profileDescription, formsList } from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

formsList.forEach((form) => {
    const formValidator = new FormValidator(formValidationConfig, form);
    formValidator.enableValidation();
})

const user = new UserInfo({userNameSelector: profileName, userJobSelector: profileDescription});

const handleFormEditSubmit = (evt) => {
    evt.preventDefault();
    user.setUserInfo(nameInput.value, descriptionInput.value);
    popupEditInfo.close();
}

const popupEditInfo = new PopupWithForm(popupEdit, handleFormEditSubmit);
popupEditInfo.setEventListeners();

const popupViewItem = new PopupWithImage(popupView);

const createCard = (name, link) => {
    const card = new Card('#card', name, link, () => popupViewItem.open(name, link));
    return card.renderCard()
};

const setInitialCards = new Section({
    items: initialCards,
    renderer: (cardItem) => {
        const newCard =  createCard(cardItem.name, cardItem.link);
        setInitialCards.addItem(newCard);
        popupViewItem.setEventListeners();
    }
    },
    photosContainer
)

setInitialCards.renderEls();

const handleCardFormSubmit = (evt) => {
    evt.preventDefault();
    const userCard = new Section({
        items: [{
            name: placeInput.value,
            link: linkInput.value
        }],
        renderer: (cardItem) => {
            const newCard =  createCard(cardItem.name, cardItem.link);
            setInitialCards.addItem(newCard);
            popupViewItem.setEventListeners();
        }
        },
        photosContainer
    )
    userCard.renderEls();
    popupAddCard.close();
};

const popupAddCard = new PopupWithForm(popupAdd, handleCardFormSubmit);
popupAddCard.setEventListeners();

buttonOpenEditProfilePopup.addEventListener('click', () => {
    popupEditInfo.open();
    user.getUserInfo();
    nameInput.value = user.userInfo.name;
    descriptionInput.value = user.userInfo.job;
});
buttonOpenAddCardPopup.addEventListener('click', () => {
     popupAddCard.open();
});