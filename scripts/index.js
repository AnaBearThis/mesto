import FormValidator from "./FormValidator.js";

const page = document.querySelector('.page');
const content = page.querySelector('.content');
const profileContainer = content.querySelector('.profile');
const buttonOpenEditProfilePopup = profileContainer.querySelector('.profile__edit-button');
const buttonOpenAddCardPopup = profileContainer.querySelector('.profile__add-button');
const popupEdit = page.querySelector('.popup_type_edit');
const popupAdd = page.querySelector('.popup_type_add');
const popupView = page.querySelector('.popup_type_view');
const profileInfo = profileContainer.querySelector('.profile__info');
const profileName = profileInfo.querySelector('.profile__name');
const profileDescription = profileInfo.querySelector('.profile__description');
const popupEditContainer = popupEdit.querySelector('.popup__container');
const popupAddContainer = popupAdd.querySelector('.popup__container');
const popupCloseButtonEdit = popupEdit.querySelector('.popup__close-button_type_edit');
const popupCloseButtonAdd = popupAdd.querySelector('.popup__close-button_type_add');
const popupCloseButtonView = popupView.querySelector('.popup__close-button_type_view');
const formEdit = popupEditContainer.querySelector('.popup__form');
const formAdd = popupAddContainer.querySelector('.popup__form');
const nameInput = formEdit.querySelector('.popup__input.popup__input_data_name');
const descriptionInput = formEdit.querySelector('.popup__input.popup__input_data_description');
const linkInput = popupAddContainer.querySelector('.popup__input.popup__input_data_link');
const placeInput = popupAddContainer.querySelector('.popup__input.popup__input_data_place');
const elementCreate = popupAdd.querySelector('.popup__form_type_create');
const popupViewContainer = popupView.querySelector('.popup__container');
const popupViewBigPic = popupViewContainer.querySelector('.popup__big-picture');
const popupViewPlaceName = popupViewContainer.querySelector('.popup__place-name');
const main = content.querySelector('.main');
const photosContainer = main.querySelector('.photos');

const openPopupEdit = () => {
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
    openPopup(popupEdit);
    const formValidator = new FormValidator(formValidationConfig, formEdit);
    formValidator.enableValidation();
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', keyHandler);
}

const keyHandler = (evt) => {
    if (evt.key == 'Escape') {
      const popup = page.querySelector('.popup_opened');
      closePopup(popup);
    };
};

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', keyHandler);
}

function handleFormEditSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closePopup(popupEdit);
}

const handleCardFormSubmit = (evt) => {
    evt.preventDefault();
    const card = new Card('#card');
    const name = placeInput.value;
    const link = linkInput.value;
    photosContainer.prepend(card.renderCard(name, link));
    elementCreate.reset();
    closePopup(popupAdd);
};

const openPopupView = (link, name) => {
    popupViewBigPic.src = link;
    popupViewBigPic.alt = name;
    popupViewPlaceName.textContent = name;
    openPopup(popupView);
}

import Card from "./Card.js";

initialCards.forEach((item) => {
        const card = new Card('#card', openPopupView);
        const renderInitialCard = card.renderCard(item.name, item.link);
        photosContainer.append(renderInitialCard);
});

const overlayHandler = (evt) => {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  };
}

popupCloseButtonView.addEventListener('click', () => closePopup(popupView));
buttonOpenEditProfilePopup.addEventListener('click', () => openPopupEdit());
buttonOpenAddCardPopup.addEventListener('click', () => {
    openPopup(popupAdd);
    const formValidator = new FormValidator(formValidationConfig, formAdd);
    formValidator.enableValidation();
});
popupCloseButtonEdit.addEventListener('click', () => closePopup(popupEdit));
popupCloseButtonAdd.addEventListener('click', () => closePopup(popupAdd));
formEdit.addEventListener('submit', handleFormEditSubmit);
elementCreate.addEventListener('submit', handleCardFormSubmit);
document.addEventListener('click', overlayHandler);