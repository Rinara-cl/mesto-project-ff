// @todo: Функция создания карточки
import { removeCard, likeCard } from './api';

function createCard(cardTemplate, element, userId, delFunc, openPopupFunc, likeFunc) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__title').textContent = element.name;
    const cardImage = cardElement.querySelector('.card__image');
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCount = cardElement.querySelector('.card__like-count');
    const deleteButton = cardElement.querySelector('.card__delete-button');

      cardImage.src = element.link; 
      cardImage.alt = element.name;
      likeCount.textContent = element.likes ? element.likes.length : 0;


    // Проверка владельца карточки
    const isLikeCard = element.likes.some(el => el['_id'] === userId);
    
    if (userId !== element.owner._id) {
        deleteButton.style.display = 'none';
    } else {
        deleteButton.addEventListener('click', () => {
            delFunc(cardElement, element._id);
        });
    }

     // Установка активного класса, если лайк уже есть
     if (isLikeCard) {
      likeButton.classList.add("card__like-button_is-active");
    }

  // Обработка клика по изображению
  cardImage.addEventListener('click', () => {
    openPopupFunc(element.link, element.name);
  });


  // обработчик лайка
  likeButton.addEventListener('click', () => {
    likeFunc(likeButton, element._id, likeCount);
});

  //обработчик клика удаления карточки
  deleteButton.addEventListener('click', () => delFunc(cardElement));

    return cardElement;
}

// Функция добавления лайка
function handleLikeCard(button, id, countElement) {
  const isLiked = button.classList.contains("card__like-button_is-active");

  likeCard(id, isLiked)
      .then(element => {
          button.classList.toggle("card__like-button_is-active");
          countElement.textContent = element.likes.length;
      })
      .catch(error => {
          console.error("Ошибка при обновлении лайков:", error);
      });
}


// Функция удаления карточки
function deleteCard(cardElement, id) {
  removeCard(id)
      .then(() => {
          cardElement.remove();
      })
      .catch(error => {
          console.error("Ошибка при удалении карточки:", error);
      });
}
 
export { createCard, deleteCard, handleLikeCard };

