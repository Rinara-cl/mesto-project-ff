// @todo: Функция создания карточки
function createCard(cardTemplate, element, delFunc, openPopupFunc, likeFunc) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__title').textContent = element.name;
    const cardImage = cardElement.querySelector('.card__image');
      cardImage.src = element.link; 
      cardImage.alt = element.name;

    const likeButton = cardElement.querySelector('.card__like-button');



    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => delFunc(cardElement));


    cardImage.addEventListener ('click', () => {
      openPopupFunc(element.link, element.name);
    });

    likeButton.addEventListener('click', likeFunc);

    return cardElement;
}

// Функция добавления лайка
function handleLikeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {  
  cardElement.remove(); 
}; 
 
export { createCard, deleteCard, handleLikeCard };

