"use strict";

import "./style.css";
import {serverUrl, session, API} from "./src/api.js";
import {Card} from "./src/Card.js";
import {CardList} from "./src/CardList.js";
import {Popup} from "./src/Popup.js";



  const formButton = document.querySelector(".user-info__button");
  const editButton = document.querySelector(".user-info__edit-button");
  const popupEdit = new Popup(document.querySelector(".popup-edit"));
  const popupNewPlace = new Popup(document.querySelector(".popup-newPlace"));
  const pictureBlur = new Popup(document.querySelector(".background-blur"));
  const initialCards = [];
  let cardList = null;



session.setUser();
session.CardsNAddPlace(session.request.baseUrl, session.request.headers.authorization, session.request.headers.ContentType)
    .then((res)=>{

    res.forEach((value)=>{
        initialCards.push(value);
    });
    cardList = new CardList(document.querySelector(".places-list"), initialCards);
    cardList.render();
})
    .catch((res)=>{console.log("Ошибка: "+res)});


        popupNewPlace.formWithin.addEventListener("submit", function (event) {
            event.preventDefault();
            popupNewPlace.formWithin.submitNew.textContent = "Загрузка...";
            fetch(`${session.request.baseUrl}/cards`, {
                method: "POST",
                headers: {
                    authorization: `${session.request.headers.authorization}`,
                    'Content-Type': `${session.request.headers.ContentType}`
                },
                body: JSON.stringify({
                    name: popupNewPlace.formWithin.namePlace.value,
                    link: popupNewPlace.formWithin.link.value
                })
            })
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    } else return Promise.reject(res.status)
                })
                .then(() => {
                    cardList.addCard(new Card(popupNewPlace.formWithin.namePlace.value, popupNewPlace.formWithin.link.value).card);
                    popupNewPlace.close();
                    popupNewPlace.formWithin.reset();
                    popupNewPlace.formWithin.submitNew.textContent = "+";
                })
                .then(()=>{

                    cardList.container.addEventListener("click", (event) => {
                        if (event.target.classList.contains("place-card__image")) {
                            pictureBlur.image = pictureBlur.elem.querySelector(".popup-image");
                            pictureBlur.open();
                            pictureBlur.image.setAttribute("src", `${event.target.style.backgroundImage.substr(5,
                                event.target.style.backgroundImage.length - 7)}`);
                        }
                    });
                })
                .catch(() => {
                    popupNewPlace.formWithin.submitNew.textContent = "Ошибка. Попробовать снова?";
                })
        });





  function checkValid(inputField){
    const val = inputField.value;
    const err = document.querySelector(`.error-${inputField.name}`);
    if(val.length === 0){
        err.textContent = "Это обязательное поле";
        return false;
    }
    else if (val.length>30||val.length<2){
        err.textContent = "Должно быть от 2 до 30 символов";
        return false;
    }
    else {
        err.textContent = "";
        return true
    }
}




  editButton.addEventListener("click", ()=>{
      popupEdit.open();});


  popupEdit.formWithin.name.addEventListener("input",()=>{
    if(checkValid(popupEdit.formWithin.name)&&checkValid(popupEdit.formWithin.job)){
        popupEdit.formWithin.submitInfo.classList.add("popup__button_active");
        popupEdit.formWithin.submitInfo.removeAttribute("disabled");
    }
    else{
        popupEdit.formWithin.submitInfo.classList.remove("popup__button_active");
        popupEdit.formWithin.submitInfo.setAttribute("disabled", "");
    }
  });

  popupEdit.formWithin.job.addEventListener("input",()=>{
       if(checkValid(popupEdit.formWithin.job)&&checkValid(popupEdit.formWithin.name)){
           popupEdit.formWithin.submitInfo.classList.add("popup__button_active");
           popupEdit.formWithin.submitInfo.removeAttribute("disabled");
        }
        else{
           popupEdit.formWithin.submitInfo.classList.remove("popup__button_active");
           popupEdit.formWithin.submitInfo.setAttribute("disabled", "");
        }
  });

  popupEdit.formWithin.addEventListener("submit",(event)=>{
        event.preventDefault();
        session.editUserData();
  });



  formButton.addEventListener("click", function(){
        popupNewPlace.open();
  });



  popupNewPlace.formWithin.namePlace.addEventListener("input",()=>{
    if(checkValid(popupNewPlace.formWithin.namePlace)){
        popupNewPlace.formWithin.submitNew.classList.add("popup__button_active");
        popupNewPlace.formWithin.submitNew.removeAttribute("disabled");
    }
    else{
        popupNewPlace.formWithin.submitNew.classList.remove("popup__button_active");
        popupNewPlace.formWithin.submitNew.setAttribute("disabled", "");
    }
  });
