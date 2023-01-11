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

let nameInput = formElement.querySelector('.popup__name');

let descriptionInput = formElement.querySelector('.popup__description');

function openPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
}

editButton.addEventListener('click', openPopup);

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', handleFormSubmit);


function closePopup() {
    popup.classList.remove('popup_opened');
}

popupCloseButton.addEventListener('click', closePopup);