const content = document.querySelector('.content');
const placeList = document.querySelector('.places__list');


const cardTemplate = document.querySelector('#card-template');
const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
const deleteButton = cardTemplate.querySelector('.card__delete-button');


// @todo: Функция создания карточки
const addCard = function(cardTemplate, element, callback) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    cardElement.querySelector('.card__title').textContent = element.name;
    cardElement.querySelector('.card__image').src = element.link;
    cardElement.querySelector('.card__image').alt = element.name;
    

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => callback());

    return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((addCard, cardElement) => {
  const cardElement = createCard(cardElement, addCard, deleteCard);
  placeList.append(cardElement);
 });