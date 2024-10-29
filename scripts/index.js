const content = document.querySelector('.content');
const placeList = document.querySelector('.places__list');


const cardTemplate = document.querySelector('#card-template').content;
const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);


// @todo: Функция создания карточки
function createCard(cardTemplate, element, callback) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    cardElement.querySelector('.card__title').textContent = element.name;
    const cardImage = cardElement.querySelector('.card__image')
      cardImage.src = element.link; 
      cardImage.alt = element.name;
    

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', callback);

    return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
  const evtTarget = evt.target;
  const listItem = evtTarget.closest('.places__item');
  listItem.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((element) => {
  const cardElement = createCard(cardTemplate, element, deleteCard);
  placeList.append(cardElement);
 });
