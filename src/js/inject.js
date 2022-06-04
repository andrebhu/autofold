class Card {
    constructor(value, suit) {
        this.value = value;
        this.suit = suit;
    }
}


// click 'fold'
function click_fold() {
    
    
    // retrieve fold and checkfold buttons
    var fold_button, checkfold_button;

    var buttons = document.getElementsByTagName("button");

    for (var i = 0; i < buttons.length; i++) {
        if (buttons[i].classList.contains("fold")) {
            fold_button = buttons[i];
        }
        else if (buttons[i].classList.contains("check-fold")) {
            checkfold_button = buttons[i];
        }
    }   

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

            // send cards to extension 
            // https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage 
            // would sometimes send one card and undefined, extra check
            if (cards.length == 2) { 
                window.postMessage({type: "FROM_PAGE", text: JSON.stringify(cards[0]) + " " + JSON.stringify(cards[1])}, "*");
            }        
        }
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
    }
})



// prevent extension from loading too fast?
// temporary solution, add a function to check for the object
function sleep(ms) {
    return new Promise(resolveFunc => setTimeout(resolveFunc, ms));
  }

sleep(3000);



// find elements
const player = document.getElementsByClassName("you-player")[0];
const tablePlayerCards = player.getElementsByClassName("table-player-cards")[0];


// create observers
observer.observe(tablePlayerCards, {
    attributes: true,
    childList: true,
    subtree: true
});