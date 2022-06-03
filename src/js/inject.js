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

const tablePlayerCards = player.getElementsByClassName("table-player-cards")[0];

// sleep function, probably a better way to do this
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}




// click 'fold'
function click_fold() {
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




// main important code
let observer = new MutationObserver(mutationRecords => {
    var cards = [];
    for (let record of mutationRecords) {
        let e = record["target"];
        
        if (e.classList.contains("card-container")) {
            let value = e.getElementsByClassName("value")[0].innerHTML;
            let suit = e.getElementsByClassName("suit")[0].innerHTML;
            cards.push(new Card(value, suit));
        }
        
    }

    // send cards to extension
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage 

    // making sure cards has 2 elements before sending
    if (cards.length == 2) { 
        window.postMessage({type: "FROM_PAGE", text: JSON.stringify(cards[0]) + " " + JSON.stringify(cards[1])}, "*");
    }
});




// receive information from extension
window.addEventListener("message", (event) => {
    if (event.source != window) {
        return;
    }

    if (event.data.type && (event.data.type == "FROM_EXTENSION")) {

        if (event.data.text == true) {
            click_fold();
        }
        else {
            // TODO: notification stuff here 
        }
    }
})




// create observers
observer.observe(tablePlayerCards, {
    attributes: true,
    childList: true,
    subtree: true
});
// observer.observe(card2, {
//     attributes: true,
//     childList: true,
//     subtree: true
// });