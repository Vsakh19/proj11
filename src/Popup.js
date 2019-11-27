export class  Popup {
    constructor(elem){
        this.elem = elem;
        this.formWithin = elem.querySelector(".popup__form");
        this.closeButton = elem.querySelector(".popup__close");
        this.addEvents();
    }

    open(){
        this.elem.classList.add("popup_is-opened");
    }
    close(){
        this.elem.classList.remove("popup_is-opened");
    }
    addEvents(){
        this.closeButton.addEventListener("click", ()=>{
            this.close();
        });
    }
}