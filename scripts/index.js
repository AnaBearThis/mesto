let page = document.querySelector('.page');

let content = page.querySelector('.content');

let profileContainer = content.querySelector('.profile');

let editButton = profileContainer.querySelector('.profile__edit-button');

let popup = page.querySelector('.popup');

let profileInfo = profileContainer.querySelector('.profile__info');

let profileName = profileInfo.querySelector('.profile__name');

let profileDescription = profileInfo.querySelector('.profile__description');

let popupContainer = popup.querySelector('.popup__container');

let popupCloseButton = popupContainer.querySelector('.popup__close-button');

let formElement = popupContainer.querySelector('.popup__form');

let nameInput = formElement.querySelector('.popup__input.popup__input_data_name');

let descriptionInput = formElement.querySelector('.popup__input.popup__input_data_description');

function openPopup() {
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
    popup.classList.add('popup_opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closePopup();
}

editButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);