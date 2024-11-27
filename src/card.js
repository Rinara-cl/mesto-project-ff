// @todo: Функция создания карточки
function createCard(cardTemplate, element, delFunc, openPopupFunc, likeFunc) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    cardElement.querySelector('.card__title').textContent = element.name;
    const cardImage = cardElement.querySelector('.card__image');
      cardImage.src = element.link; 
      cardImage.alt = element.name;
    

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', delFunc);

    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', handleLikeCard, likeFunc);


    cardImage.addEventListener ('click', () => {
      openPopupFunc(element.link, element.name);
    });

    return cardElement;
}

function handleLikeCard (evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}


// @todo: Функция удаления карточки
function deleteCard(evt) {
    const evtTarget = evt.target;
    const listItem = evtTarget.closest('.places__item');
    listItem.remove();
 }
 
export { createCard, deleteCard };

