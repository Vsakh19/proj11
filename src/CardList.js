import {Card} from "./Card";

export class CardList {
    constructor(container, masCards){
        this.container = container;
        this.masCards = masCards;
    }


    addCard(card){
        this.container.appendChild(card);
    }

    render(){
        for (let i = 0; i<this.masCards.length; i++){
            this.addCard(new Card(this.masCards[i].name, this.masCards[i].link, this.masCards[i].likes.length).card);
        }
    }
}