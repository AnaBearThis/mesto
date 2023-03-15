import './index.css';
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import { initialCards, formValidationConfig, photosContainer, popupEdit, popupView, popupAdd, buttonOpenEditProfilePopup, buttonOpenAddCardPopup, placeInput, linkInput, nameInput, descriptionInput, profileName, profileDescription } from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const formValidators = {}

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


const user = new UserInfo({userName: profileName, userJob: profileDescription});

const popupEditInfo = new PopupWithForm(popupEdit, (evt) => {
    evt.preventDefault();
    user.setUserInfo(popupEditInfo._getInputValues().name, popupEditInfo._getInputValues().description);
    popupEditInfo.close();
});
popupEditInfo.setEventListeners();

const popupViewItem = new PopupWithImage(popupView);
popupViewItem.setEventListeners();

const createCard = (name, link) => {
    const card = new Card('#card', name, link, () => popupViewItem.open(name, link));
    return card.renderCard()
};

const setCard = new Section({
    renderer: (cardItem) => {
        const newCard =  createCard(cardItem.name, cardItem.link);
        setCard.addItem(newCard);
    }
    },
    photosContainer
)

setCard.renderEls(initialCards);

const popupAddCard = new PopupWithForm(popupAdd, (evt) => {
    evt.preventDefault();
    setCard.renderEls([popupAddCard._getInputValues()]);
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