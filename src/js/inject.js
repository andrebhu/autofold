


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

    // debugging
    // console.log("Debug check/fold button:");

    if (checkfold_button) {
        // console.log(checkfold_button);
        checkfold_button.click();
    }
    else if (fold_button) {
        // console.log(fold_button);
        fold_button.click();
    }
}

// receive information from extension
window.addEventListener("message", (event) => {
    if (event.source != window) {
        return;
    }
    if (event.data.type && (event.data.type == "FROM_EXTENSION")) {

        console.log("From extension", event.data.text);
        if (event.data.text == true) {
            click_fold();
        }
    }
})




// read webpage and send cards back to extension
// this could use some improvement
// also figure out possibly how to read position

class Hand {
    constructor(value1, suit1, value2, suit2) {
        this.value1 = value1;
        this.suit1 = suit1;
        this.value2 = value2;
        this.suit2 = suit2;
        this.url = window.location.href;
    }
}

class Card {
    constructor(value, suit) {
        this.value = value;
        this.suit = suit;
    }
}

let observer = new MutationObserver(mutationRecords => {    
    var cards = [];

    // parse through all mutations
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
    // would sometimes send one card and undefined, extra check
    if (cards.length == 2) { 
        let card1 = cards[0];
        let card2 = cards[1];
        let hand = new Hand(card1.value, card1.suit, card2.value, card2.suit);

        console.log(JSON.stringify(hand));
        window.postMessage({type: "FROM_PAGE", text: JSON.stringify(hand)}, "*");
    }  
});



function findTotalPlayers(seats) {
    var players = seats.getElementsByClassName("table-player");

    return players.length;
}



// create observers
async function createObservers() {
    try{
        var table = document.getElementsByClassName("table")[0];
        var seats = table.getElementsByClassName("seats")[0];
        var player = seats.getElementsByClassName("you-player")[0];
        var tablePlayerCards = player.getElementsByClassName("table-player-cards")[0];

        if (table && player && tablePlayerCards) {
            observer.observe(tablePlayerCards, {
                attributes: true,
                subtree: true
            });

            console.log("Observer created!");
            return true;
        }
    } catch (error) {
        console.log("Could not find cards...");
        await new Promise(r => setTimeout(r, 3000));
        createObservers();
    }
}

createObservers();