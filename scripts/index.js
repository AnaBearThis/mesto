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
const buttonCreate = popupAdd.querySelector('.popup__submit-button_type_create');
const elementCreate = popupAdd.querySelector('.popup__form_type_create');
const popupViewContainer = popupView.querySelector('.popup__container');
const popupViewBigPic = popupViewContainer.querySelector('.popup__big-picture');
const popupViewPlaceName = popupViewContainer.querySelector('.popup__place-name');
const popups = page.querySelectorAll('.popup');

const openPopupEdit = () => {
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
    openPopup(0);
}

function openPopup(index) {
    popups[index].classList.add('popup_opened');
}

function closePopup(index) {
    popups[index].classList.remove('popup_opened');
}

function handleFormEditSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closePopup(0);
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
const cardItem = cardTemplate.querySelector('.card');

const createCard = (place, link) => {
    
    const cardItemClone = cardItem.cloneNode(true);
    const cardDescription = cardItemClone.querySelector('.card__description');
    const cardPic = cardItemClone.querySelector('.card__pic');
    const cardName = cardDescription.querySelector('.card__name');
    cardName.textContent = place;
    cardPic.src = link;
    cardPic.alt = place;

    const buttonLike = cardItemClone.querySelector('.card__like-button');
    buttonLike.addEventListener('click', () => buttonLike.classList.toggle('card__like-button_active'));

    const buttonDelete = cardItemClone.querySelector('.card__delete-button');
    buttonDelete.addEventListener('click', () => cardItemClone.remove());

    const openPopupView = () => {
        popupViewBigPic.src = cardPic.src;
        popupViewBigPic.alt = cardPic.alt;
        popupViewPlaceName.textContent = cardName.textContent;
        openPopup(2);
    }

    cardPic.addEventListener('click', () => openPopupView());

    return cardItemClone;
};

const renderCard = (place, link) => {
    photosContainer.append(createCard(place, link));
};

initialCards.forEach((item) => {
    const place = item.name;
    const link = item.link;
    renderCard(place, link);
});

const handleCardFormSubmit = (evt) => {
    evt.preventDefault();
    const place = placeInput.value;
    const link = linkInput.value;
    photosContainer.prepend(createCard(place, link));
    elementCreate.reset();
    closePopup(1);
};


popupCloseButtonView.addEventListener('click', () => closePopup(2));
buttonOpenEditProfilePopup.addEventListener('click', () => openPopupEdit());
buttonOpenAddCardPopup.addEventListener('click', () => openPopup(1));
popupCloseButtonEdit.addEventListener('click', () => closePopup(0));
popupCloseButtonAdd.addEventListener('click', () => closePopup(1));

formEdit.addEventListener('submit', handleFormEditSubmit);
elementCreate.addEventListener('submit', handleCardFormSubmit);