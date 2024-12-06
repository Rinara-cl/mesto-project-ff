(()=>{"use strict";function e(e,t,n,o,r){var c=e.querySelector(".card").cloneNode(!0);c.querySelector(".card__title").textContent=t.name;var d=c.querySelector(".card__image");d.src=t.link,d.alt=t.name;var a=c.querySelector(".card__like-button");return c.querySelector(".card__delete-button").addEventListener("click",(function(){return n(c)})),d.addEventListener("click",(function(){o(t.link,t.name)})),a.addEventListener("click",r),c}function t(e){e.target.classList.toggle("card__like-button_is-active")}function n(e){e.remove()}function o(e){e.classList.add("popup_is-opened"),e.addEventListener("mousedown",c),document.addEventListener("keydown",d)}function r(e){e.classList.remove("popup_is-opened"),e.removeEventListener("mousedown",c),document.removeEventListener("keydown",d)}function c(e){e.target===e.currentTarget&&r(e.target)}function d(e){"Escape"===e.key&&r(document.querySelector(".popup_is-opened"))}var a=document.querySelector("#card-template").content,u=document.querySelector(".places__list"),p=document.querySelectorAll(".popup"),s=document.querySelector(".popup_type_image"),i=s.querySelector(".popup__image"),l=s.querySelector(".popup__caption"),m=document.querySelector(".popup_type_edit"),v=document.querySelector(".profile__edit-button"),_=document.forms["edit-profile"],f=_.elements.name,y=_.elements.description,k=document.querySelector(".profile__title"),q=document.querySelector(".profile__description"),S=document.querySelector(".popup_type_new-card"),g=document.querySelector(".profile__add-button"),E=document.forms["new-place"],L=E.elements["place-name"],h=E.elements.link,x=document.querySelectorAll(".popup__close");function b(e,t){i.src=e,i.alt=t,l.textContent=t,o(s)}[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(o){var r=e(a,o,n,b,t);u.append(r)})),p.forEach((function(e){e.classList.add("popup_is-animated")})),v.addEventListener("click",(function(){f.value=k.textContent,y.value=q.textContent,o(m)})),g.addEventListener("click",(function(){o(S)})),x.forEach((function(e){e.addEventListener("click",(function(e){r(e.target.closest(".popup"))}))})),_.addEventListener("submit",(function(e){e.preventDefault(),k.textContent=f.value,q.textContent=y.value,r(m)})),E.addEventListener("submit",(function(o){o.preventDefault();var c={name:L.value,link:h.value},d=e(a,c,n,b,t);u.prepend(d),E.reset(),r(S)}))})();