import './pages/index.css'; 
import { initialCards } from './cards';
import { createCard, deleteCard, handleLikeCard } from './card';
import { openModal, closeModal } from './modal';
import { enableValidation, clearValidation } from './validation';
import { 
    getUserInfo, 
    getInitialCards, 
    updateUserInfo,
    addNewCard,
    updateUserAvatar
} from './api';


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
const profileImege = document.querySelector('.profile__image');

const сardAddModal = document.querySelector('.popup_type_new-card');
const сardAddButton = document.querySelector('.profile__add-button');
const newCardForm = document.forms['new-place'];
const newCardFormNameInput = document.forms['new-place'].elements['place-name'];
const newCardFormLinkInput = document.forms['new-place'].elements.link;

const modalCloseButton = document.querySelectorAll('.popup__close');


const newAvatarButton = document.querySelector('.profile__image-button');
const newAvatarModal = document.querySelector('.popup_type_new-avatar');
const newAvatarForm = document.forms['new-avatar'];
const newAvatarInput = newAvatarForm.elements.link;

const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  };

  let myId ="";

//функции

function handleAvatarForm(evt) {
    evt.preventDefault();

    const button = newAvatarForm.querySelector(".popup__button");
    button.textContent = "Сохранение...";

    updateUserAvatar(newAvatarInput.value)
    .then(function (userData) {
        profileImage.style.backgroundImage = `url(${userData.avatar})`;
        closeModal(newAvatarModal);
        newAvatarForm.reset();
    })
    .catch(function (err) {
        console.error("Ошибка при выполнении запроса:", err);
        alert("Возникла ошибка. Пожалуйста, попробуйте снова.");
    })
    .finally(function () {
        button.textContent = "Сохранить";
    });
}

function handleOpenImagePopup(link, name) {
    cardModalImage.src = link;
    cardModalImage.alt = name;
    cardModalCaption.textContent = name;

    openModal(cardModal);
}

function handleProfileFormSubmit (evt) {
    evt.preventDefault(); 

    updateUserInfo(profileFormNameInput.value, profileFormDescriptionInput.value)
    .then(userData => {
        profileTitle.textContent = userData.name; 
        profileDescription.textContent = userData.about; 

        closeModal(profileEditModal); 
    })
} 

function handleNewCardSubmit (evt) {
    evt.preventDefault();

    addNewCard(newCardFormNameInput.value, newCardFormLinkInput.value)
    .then(newCardData => {
        const newCard = {
            name: newCardData.name,
            link: newCardData.link
        }
    
       const createdCard = createCard
           (cardTemplate, 
            newCard,
            myId,
            deleteCard, 
            handleOpenImagePopup,
            handleLikeCard);
    
            placeList.prepend(createdCard);
            newCardForm.reset(); 
            closeModal(сardAddModal); 
    })
    }

    
Promise.all([getUserInfo(), getInitialCards()]).then(([userData, cards]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImege.style.backgroundImage = `url(${userData.avatar})`;
    myId = userData._id;

    cards.forEach(function (element) { 
        const cardElement = createCard( 
          cardTemplate,  
          element,
          myId,   
          deleteCard, 
          handleOpenImagePopup, 
          handleLikeCard); 
        placeList.append(cardElement); 
    });

})

// @todo: Вывести карточки на страницу

 modals.forEach((modal) => {
     modal.classList.add('popup_is-animated');
});

newAvatarButton.addEventListener('click', () => {
    clearValidation(newAvatarForm, validationConfig);
    openModal(newAvatarModal);
});

profileEditButton.addEventListener ('click', () => {
    profileFormNameInput.value = profileTitle.textContent;
    profileFormDescriptionInput.value = profileDescription.textContent;
    clearValidation(profileForm, validationConfig);
    openModal(profileEditModal);
});

сardAddButton.addEventListener('click', () => {
    clearValidation(newCardForm, validationConfig);
    openModal(сardAddModal);
});

modalCloseButton.forEach (button => {
    button.addEventListener('click', (evt) => {
        const modal = evt.target.closest('.popup');
        closeModal(modal);
    });
});


newAvatarForm.addEventListener('submit', handleAvatarForm);
profileForm.addEventListener('submit', handleProfileFormSubmit);
document.forms['new-place'].addEventListener('submit', handleNewCardSubmit);

enableValidation(validationConfig);