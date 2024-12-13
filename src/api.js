const config = {
    baseUrl: "https://nomoreparties.co/v1/wff-cohort-27",
    headers: {
        authorization: "0971fc6d-ecf8-4c4f-8143-7a13e060bd67",
        "Content-Type": "application/json",
    },
};

export const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers
    })
      .then(res => res.json());
      
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
    .then(res => res.json());
}

export const updateUserAvatar = (link) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: link
      })
    })
    .then(res => res.json());
}


export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
      
    })
    .then(res => res.json());
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
    .then(res => res.json());
} 

export const removeCard = (id) => {
    return fetch(`${config.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: config.headers
    })
    .then(res => res.json());
} 

export const likeCard = (id, isLiked) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
      method: isLiked? 'DELETE': 'PUT',
      headers: config.headers
    })
    .then(res => res.json());
} 