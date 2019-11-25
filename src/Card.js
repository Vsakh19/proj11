export class Card {
    constructor(name, link, likes){
        this.likes = likes;
        this.name = name;
        this.link = link;
        this.card = this.create(this.name, this.link, this.likes);
    }

    events(card){
        card.querySelector(".place-card__like-icon").addEventListener("click", ()=>{
            this.like(card);
        });
        card.querySelector(".place-card__delete-icon").addEventListener("click", ()=>{
            this.remove(card);
        });
    }

    like(card){
        card.querySelector(".place-card__like-icon").classList.toggle("place-card__like-icon_liked");
    }

    remove(card){
        card.parentNode.removeChild(card);
    }

    create(name, link, likes){
        const plcard = document.createElement("div");
        plcard.classList.add("place-card");
        const cardimg = document.createElement("div");
        cardimg.classList.add("place-card__image");
        cardimg.setAttribute("style", `background-image: url(${link})`);
        const cardbtn = document.createElement("button");
        cardbtn.classList.add("place-card__delete-icon");
        cardimg.appendChild(cardbtn);
        const desc = document.createElement("div");
        desc.classList.add("place-card__description");
        const header = document.createElement("h3");
        header.classList.add("place-card__name");
        header.textContent = name;
        const likeContainer = document.createElement("div");
        likeContainer.classList.add("place-card__like-container");
        const likebtn = document.createElement("button");
        likebtn.classList.add("place-card__like-icon");
        const likeAmount = document.createElement("p");
        likeAmount.classList.add("place-card__name");
        likeAmount.textContent = likes;
        desc.appendChild(header);
        likeContainer.appendChild(likebtn);
        likeContainer.appendChild(likeAmount);
        desc.appendChild(likeContainer);
        plcard.appendChild(cardimg);
        plcard.appendChild(desc);
        this.events(plcard);
        return plcard;
    }
}