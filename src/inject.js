console.log("inject.js!");

class Card {
    constructor(value, suit) {
        this.value = value;
        this.suit = suit;
    }
}

const player = document.getElementsByClassName("you-player")[0];
const card1 = player.getElementsByClassName("card-container")[0];
const card2 = player.getElementsByClassName("card-container")[1];




let observer = new MutationObserver(mutationRecords => {
    var cards = [];
    for (let record of mutationRecords) {
        let e = record["target"];

        let value = e.getElementsByClassName("value")[0].innerHTML;
        let suit = e.getElementsByClassName("suit")[0].innerHTML;
        cards.push(new Card(value, suit));
    }

    console.log(cards);
});


// create observers
observer.observe(card1, {
    attributes: true,
    childList: true,
    subtree: true
});
observer.observe(card2, {
    attributes: true,
    childList: true,
    subtree: true
});