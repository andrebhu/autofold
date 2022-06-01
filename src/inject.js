console.log("inject.js!");

class Card {
    constructor(value, suit) {
        this.value = value;
        this.suit = suit;
    }
}

// find elements
const player = document.getElementsByClassName("you-player")[0];
const card1 = player.getElementsByClassName("card-container")[0];
const card2 = player.getElementsByClassName("card-container")[1];


// sleep function, probably a better way to do this
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// click 'fold'
function click_fold() {
    // var k_event = new KeyboardEvent('keypress', { key: "f"});
    sleep(1000);
    var fold_button = document.getElementsByClassName("fold")[0];
    var checkfold_button = document.getElementsByClassName("check-fold")[0];


    // check if bb, then press `check-fold`
    if (checkfold_button) {
        checkfold_button.click();
    }
    else {
        fold_button.click();
    }
}


// declare observer to see card changes
let observer = new MutationObserver(mutationRecords => {
    var cards = [];
    for (let record of mutationRecords) {
        let e = record["target"];

        let value = e.getElementsByClassName("value")[0].innerHTML;
        let suit = e.getElementsByClassName("suit")[0].innerHTML;
        cards.push(new Card(value, suit));
    }

    console.log(cards);
    click_fold();
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