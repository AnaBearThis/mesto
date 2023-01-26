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

initialCards.forEach(function (item) {
        const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
        const cardDescription = cardItem.querySelector('.card__description');
        const cardPic = cardItem.querySelector('.card__pic');
        const cardName = cardDescription.querySelector('.card__name');
        cardName.textContent = item.name;
        cardPic.src = item.link;
        cardPic.alt = item.name;
        photosContainer.append(cardItem);
        const likeButton = cardDescription.querySelector('.card__like-button');
        likeButton.addEventListener('click', function () {
            likeButton.classList.toggle('card__like-button_active');
        });
        const deleteButtons = photosContainer.querySelectorAll('.card__delete-button');
        deleteButtons.forEach (function (button) {
            button.addEventListener('click', function () {
            const cardToDelete = button.closest('.card').
            cardToDelete.remove();
            });
        })
        cardPic.addEventListener('click', function() {
            popupView.classList.add('popup_opened');
            popupView.querySelector('.popup__big-picture').src = item.link;
            popupView.querySelector('.popup__big-picture').alt = item.name;
            popupView.querySelector('.popup__place-name').textContent = item.name;
        });
        popupCloseButtonView.addEventListener('click', function () {
            popupView.classList.remove('popup_opened');
        })
})

function createCard(evt) {
   evt.preventDefault();
   //создаю пустую карточку
   const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
   const cardDescription = cardItem.querySelector('.card__description');
   const cardPic = cardItem.querySelector('.card__pic');
   const cardName = cardDescription.querySelector('.card__name');

   //проверяю, сколько карточек уже есть
   const cards = querySelectorAll('.card');
   console.log(cards.length);

   //создаю начальные карточки в первом условии, и "свои" в else
   if (cards.length < 6) {
        initialCards.forEach(function (item) {
            cardName.textContent = item.name;
            cardPic.src = item.link;
            cardPic.alt = item.name;
            photosContainer.append(cardItem);
        })
   } else {
        cardName.textContent = placeInput.value;
        cardPic.src = linkInput.value;
        cardPic.alt = placeInput.value;
        photosContainer.prepend(cardItem);
        popupAdd.classList.remove('popup_opened');
   }

   //нахожу все кнопки удаления и пишу им логику
   const deleteButtons = photosContainer.getElementsByClassName('.card__delete-button');
   const deleteButtonsArray = Array.from(deleteButtons);
   deleteButtonsArray.forEach(function (button) {
        const cardToDelete = button.closest('.card');
        button.addEventListener('click', function () {
            cardToDelete.remove();
        });
   });

   //нахожу все кнопки лайков и пишу им логику
   const likeButtons = cardDescription.getElementsByClassName('.card__like-button');
   const likeButtonsArray = Array.from(likeButtons);
   likeButtonsArray.forEach(function (button) {
        button.classList.toggle('card__like-button_active');
   });

   //открываю картинки в просмотр
   const cardPics = cardItem.getElementsByClassName('.card__pic');
   const cardPicsArray = Array.from(cardPics);
   cardPicsArray.forEach(function () {
        if (cards.length < 6) {
            cardPic.addEventListener('click', function() {
                popupView.classList.add('popup_opened');
                popupView.querySelector('.popup__big-picture').src = item.link;
                popupView.querySelector('.popup__big-picture').alt = item.name;
                popupView.querySelector('.popup__place-name').textContent = item.name;
            });
        } else {
            cardPic.addEventListener('click', function() {
                popupView.classList.add('popup_opened');
                popupView.querySelector('.popup__big-picture').src = linkInput.value;
                popupView.querySelector('.popup__big-picture').alt = placeInput.value;
                popupView.querySelector('.popup__place-name').textContent = placeInput.value;
            });
        }
        popupCloseButtonView.addEventListener('click', function () {
            popupView.classList.remove('popup_opened');
        });
   });

   const deleteButton = photosContainer.querySelector('.card__delete-button');
   const likeButton = cardDescription.querySelector('.card__like-button');
   likeButton.addEventListener('click', function () {
        likeButton.classList.toggle('card__like-button_active');
   })
   deleteButton.addEventListener('click', function () {
        cardItem.remove();
    })
    cardPic.addEventListener('click', function() {
        popupView.classList.add('popup_opened');
        popupView.querySelector('.popup__big-picture').src = linkInput.value;
        popupView.querySelector('.popup__big-picture').alt = placeInput.value;
        popupView.querySelector('.popup__place-name').textContent = placeInput.value;
    });
    popupCloseButtonView.addEventListener('click', function () {
        popupView.classList.remove('popup_opened');
    })
}

editButton.addEventListener('click', () => openPopup(popupEdit));
addButton.addEventListener('click', () => openPopup(popupAdd));
popupCloseButtonEdit.addEventListener('click', () => closePopup(popupEdit));
popupCloseButtonAdd.addEventListener('click', () => closePopup(popupAdd));

formElement.addEventListener('submit', handleFormSubmit);
createElement.addEventListener('submit', createCard);