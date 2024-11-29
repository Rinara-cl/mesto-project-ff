import './pages/index.css'; 
import { initialCards } from './cards';
import { createCard, deleteCard, handleLikeCard } from './card';
import { openModal, closeModal } from './modal';


const cardTemplate = document.querySelector('#card-template').content;
const placeList = document.querySelector('.places__list');

const modals = document.querySelectorAll('.popup');

const cardModal = document.querySelector('.popup_type_image');
const cardModalImage = cardModal.querySelector('.popup__image');
const cardModalCaption = cardModal.querySelector('.popup__caption');

const profileEditModal = document.querySelector('.popup_type_edit');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileForm = document.forms['edit-profile'];
const profileFormNameInput = profileForm.elements.name;
const profileFormDescriptionInput = profileForm.elements.description;


const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');


const CardAddModal = document.querySelector('.popup_type_new-card');
const CardAddButton = document.querySelector('.profile__add-button');
const newCardForm = document.forms['new-place'];
const newCardFormNameInput = newCardForm.elements['place-name'];
const newCardFormLinkInput = newCardForm.elements.link;

const modalCloseButton = document.querySelectorAll('.popup__close');

//функции
function handleOpenImagePopup(link, name) {
    cardModalImage.src = link;
    cardModalImage.alt = name;
    cardModalCaption.textContent = name;

    openModal(cardModal);
}

function handleProfileFormSubmit (evt) {
    evt.preventDefault();

    profileTitle.textContent = profileFormNameInput.value;
    profileDescription.textContent = profileFormDescriptionInput.value;
    closeModal(profileEditModal);
}

function handleNewCardSubmit (evt) {
    evt.preventDefault();

    const newCard = {
        name: newCardFormNameInput.value,
        link: newCardFormLinkInput.value
    }

   const createdCard = createCard
       (cardTemplate, 
        newCard,
        deleteCard, 
        handleOpenImagePopup,
        handleLikeCard
    );

        placeList.prepend(createdCard);
        newCardForm.reset(); 
        closeModal(CardAddModal);
}


// @todo: Вывести карточки на страницу
initialCards.forEach((element) => {
  const cardElement = createCard(
    cardTemplate, 
    element, 
    deleteCard,
    handleOpenImagePopup,
    handleLikeCard);
  placeList.append(cardElement);
 });



 modals.forEach((modal) => {
     modal.classList.add('popup_is-animated');
});

profileEditButton.addEventListener ('click', () => {
    profileFormNameInput.value = profileTitle.textContent;
    profileFormDescriptionInput.value = profileDescription.textContent;
    openModal(profileEditModal);
});

CardAddButton.addEventListener('click', () => {
    openModal(CardAddModal);
});

modalCloseButton.forEach (button => {
    button.addEventListener('click', (evt) => {
        const modal = evt.target.closest('.popup');
        closeModal(modal);
    });
});

profileForm.addEventListener('submit', handleProfileFormSubmit);
newCardForm.addEventListener('submit', handleNewCardSubmit);