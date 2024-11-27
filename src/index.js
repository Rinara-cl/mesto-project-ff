import './pages/index.css'; 
import { initialCards } from './cards';
import { createCard, deleteCard } from './card';
import { openModal, closeModal } from './modal';



const placeList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

const popupImage = document.querySelector('.popup_type_image');
const cardImage = popupImage.querySelector('.popup__image');
const cardCaption = popupImage.querySelector('.popup__caption');

const modals = document.querySelectorAll('.popup');
const profileEditPopup = document.querySelector('.popup_type_edit');
const profileEditButton = document.querySelector('.profile__edit-button');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const formElement = document.forms['edit-profile'];
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;



const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardButton = document.querySelector('.profile__add-button');
const formNewCard = document.forms['new-place'];
const placeNameInput = formNewCard.elements['place-name'];
const placeLinkInput = formNewCard.elements.link;

const closePopupButton = document.querySelectorAll('.popup__close');

//функции
function handleOpenImagePopup(link, name) {
    cardImage.src = link;
    cardImage.alt = name;
    cardCaption.textContent = name;

    openModal(popupImage);
}

function handleFormSubmit (evt) {
    evt.preventDefault();

    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(profileEditPopup);
}

function handleNewCardSubmit (evt) {
    evt.preventDefault();

    const newCardPlace = {
        name: placeNameInput.value,
        link:  placeLinkInput.value
    }

   createCard(cardTemplate, newCardPlace,
        deleteCard, 
        handleOpenImagePopup
    );
        placeList.prepend(createCard);
        formNewCard.reset(); 
        closeModal(newCardPopup);
}


// @todo: Вывести карточки на страницу
initialCards.forEach((element) => {
  const cardElement = createCard(cardTemplate, element, deleteCard, handleOpenImagePopup);
  placeList.append(cardElement);
 });



 modals.forEach((modal) => {
     modal.classList.add('popup_is-animated');
});

profileEditButton.addEventListener ('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(profileEditPopup);
});

newCardButton.addEventListener('click', () => {
    openModal(newCardPopup);
});

closePopupButton.forEach (button => {
    button.addEventListener('click', (evt) => {
        const modal = evt.target.closest('.popup');
        closeModal(modal);
    });
});

formElement.addEventListener('submit', handleFormSubmit);
formNewCard.addEventListener('submit', handleNewCardSubmit);