const formValidationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

const page = document.querySelector('.page');
const content = page.querySelector('.content');
const profileContainer = content.querySelector('.profile');
const buttonOpenEditProfilePopup = profileContainer.querySelector('.profile__edit-button');
const buttonOpenAddCardPopup = profileContainer.querySelector('.profile__add-button');
const popupEdit = page.querySelector('.popup_type_edit');
const popupChangeAvatar = page.querySelector('.popup_type_change-avatar');
const popupAdd = page.querySelector('.popup_type_add');
const popupView = page.querySelector('.popup_type_view');
const profileInfo = profileContainer.querySelector('.profile__info');
const profileName = profileInfo.querySelector('.profile__name');
const profileDescription = profileInfo.querySelector('.profile__description');
const profileAvatar = profileContainer.querySelector('.profile__pic');
const popupEditContainer = popupEdit.querySelector('.popup__container');
const popupAddContainer = popupAdd.querySelector('.popup__container');
const formEdit = popupEditContainer.querySelector('.popup__form');
const nameInput = formEdit.querySelector('.popup__input.popup__input_data_name');
const descriptionInput = formEdit.querySelector('.popup__input.popup__input_data_description');
const linkInput = popupAddContainer.querySelector('.popup__input.popup__input_data_link');
const placeInput = popupAddContainer.querySelector('.popup__input.popup__input_data_place');
const main = content.querySelector('.main');
const photosContainer = main.querySelector('.photos');

export {page, formValidationConfig, photosContainer, popupEdit, popupChangeAvatar, popupView, popupAdd, buttonOpenEditProfilePopup, buttonOpenAddCardPopup, placeInput, linkInput, nameInput, descriptionInput, profileName, profileDescription, profileAvatar};