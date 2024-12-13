const config = {
    baseUrl: "https://nomoreparties.co/v1/wff-cohort-27",
    headers: {
        authorization: "0971fc6d-ecf8-4c4f-8143-7a13e060bd67",
        "Content-Type": "application/json",
    },
};

function getFeedbackData(res) {
  if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`); 
  }
  return res.json();
}


export const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers
    })
      .then(getFeedbackData);
      
}

export const updateUserInfo = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(getFeedbackData);
}

export const updateUserAvatar = (link) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: link
      })
    })
    .then(getFeedbackData);
}


export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
      
    })
    .then(getFeedbackData);
} 

export const addNewCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(getFeedbackData);
} 

export const removeCard = (id) => {
    return fetch(`${config.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: config.headers
    })
    .then(getFeedbackData);
} 

export const likeCard = (id, isLiked) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
      method: isLiked? 'DELETE': 'PUT',
      headers: config.headers
    })
    .then(getFeedbackData);
} 