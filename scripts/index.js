let page = document.querySelector('.page');
let content = page.querySelector('.content');
let profileContainer = content.querySelector('.profile');
let editButton = profileContainer.querySelector('.profile__edit-button');
const addButton = profileContainer.querySelector('.profile__add-button');
const popup = page.querySelector('.popup');
const popupEdit = page.querySelector('.popup_type_edit');
const popupAdd = page.querySelector('.popup_type_add');
const popupView = page.querySelector('.popup_type_view');
let profileInfo = profileContainer.querySelector('.profile__info');
let profileName = profileInfo.querySelector('.profile__name');
let profileDescription = profileInfo.querySelector('.profile__description');
let popupContainer = popup.querySelector('.popup__container');
let popupCloseButton = popupContainer.querySelector('.popup__close-button');
const popupCloseButtonEdit = popupEdit.querySelector('.popup__close-button_type_edit');
const popupCloseButtonAdd = popupAdd.querySelector('.popup__close-button_type_add');
const popupCloseButtonView = popupView.querySelector('.popup__close-button_type_view');
let formElement = popupContainer.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input.popup__input_data_name');
let descriptionInput = formElement.querySelector('.popup__input.popup__input_data_description');
const linkInput = popupAdd.querySelector('.popup__input.popup__input_data_link');
const placeInput = popupAdd.querySelector('.popup__input.popup__input_data_place'); 
const createButton = popupAdd.querySelector('.popup__submit-button_type_create');
const createElement = popupAdd.querySelector('.popup__form_type_create');


function openPopup(popupEdit, popupAdd, popupView) {
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
    popupEdit.classList.add('popup_opened');
    popupAdd.classList.add('popup_opened');
    
}

function closePopup(popupEdit, popupAdd, popupView) {
    popupEdit.classList.remove('popup_opened');
    popupAdd.classList.remove('popup_opened');
    popupView.classList.remove('.popup_opened');
}

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closePopup(popupEdit);
}

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const main = content.querySelector('.main');
const photosContainer = main.querySelector('.photos');
const cardTemplate = photosContainer.querySelector('#card').content;

const createCard = (place, link) => {
    
    const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
    const cardDescription = cardItem.querySelector('.card__description');
    const cardPic = cardItem.querySelector('.card__pic');
    const cardName = cardDescription.querySelector('.card__name');
    cardName.textContent = place;
    cardPic.src = link;
    cardPic.alt = place;

    const likeButton = cardItem.querySelector('.card__like-button');
    likeButton.addEventListener('click', () => likeButton.classList.toggle('card__like-button_active'));

    const deleteButton = cardItem.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => cardItem.remove());

    cardPic.addEventListener('click', function() {
        popupView.classList.add('popup_opened');
        popupView.querySelector('.popup__big-picture').src = link;
        popupView.querySelector('.popup__big-picture').alt = place;
        popupView.querySelector('.popup__place-name').textContent = place;
    });
    popupCloseButtonView.addEventListener('click', function () {
        popupView.classList.remove('popup_opened');
    });

    return cardItem;
};

const renderCard = (place, link) => {
    photosContainer.append(createCard(place, link));
};

initialCards.forEach((item) => {
    const place = item.name;
    const link = item.link;
    renderCard(place, link);
});

const myCardForm = (evt) => {
    evt.preventDefault();
    const place = placeInput.value;
    const link = linkInput.value;
    photosContainer.prepend(createCard(place, link));
    closePopup(popupAdd);
};



editButton.addEventListener('click', () => openPopup(popupEdit));
addButton.addEventListener('click', () => openPopup(popupAdd));
popupCloseButtonEdit.addEventListener('click', () => closePopup(popupEdit));
popupCloseButtonAdd.addEventListener('click', () => closePopup(popupAdd));

formElement.addEventListener('submit', handleFormSubmit);
createElement.addEventListener('submit', myCardForm);