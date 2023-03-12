import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import { initialCards, photosContainer, popupView } from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";



// formsList.forEach((form) => {
//     const formValidator = new FormValidator(formValidationConfig, form);
//     formValidator.enableValidation();
// })

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

// const openPopupEdit = () => {
//     nameInput.value = profileName.textContent;
//     descriptionInput.value = profileDescription.textContent;
//     openPopup(popupEdit);
// }

// function openPopup(popup) {
//     popup.classList.add('popup_opened');
//     document.addEventListener('keydown', keyHandler);
// }

// const keyHandler = (evt) => {
//     if (evt.key == 'Escape') {
//       const popup = page.querySelector('.popup_opened');
//       closePopup(popup);
//     };
// };

// function closePopup(popup) {
//     popup.classList.remove('popup_opened');
//     document.removeEventListener('keydown', keyHandler);
// }

// function handleFormEditSubmit (evt) {
//     evt.preventDefault();
//     profileName.textContent = nameInput.value;
//     profileDescription.textContent = descriptionInput.value;
//     closePopup(popupEdit);
// }

// const handleCardFormSubmit = (evt) => {
//     evt.preventDefault();
//     const name = placeInput.value;
//     const link = linkInput.value;
//     photosContainer.prepend(createCard(name, link));
//     //formAdd.reset();
//     //closePopup(popupAdd);
// };

// export default handleCardFormSubmit;

// const openPopupView = (link, name) => {
//     popupViewBigPic.src = link;
//     popupViewBigPic.alt = name;
//     popupViewPlaceName.textContent = name;
//     openPopup(popupView);
// }

// // initialCards.forEach((item) => {
// //         const name = item.name;
// //         const link = item.link;
// //         photosContainer.append(createCard(name, link));
// // });

// const overlayHandler = (evt) => {
//   if (evt.target.classList.contains('popup_opened')) {
//     closePopup(evt.target);
//   };
// }

// popupCloseButtonView.addEventListener('click', () => closePopup(popupView));
// buttonOpenEditProfilePopup.addEventListener('click', () => openPopupEdit());
// buttonOpenAddCardPopup.addEventListener('click', () => {
//     openPopup(popupAdd);
// });
// popupCloseButtonEdit.addEventListener('click', () => closePopup(popupEdit));
// popupCloseButtonAdd.addEventListener('click', () => closePopup(popupAdd));
// formEdit.addEventListener('submit', handleFormEditSubmit);
// formAdd.addEventListener('submit', handleCardFormSubmit);
// document.addEventListener('click', overlayHandler);