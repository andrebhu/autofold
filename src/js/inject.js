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

    // debugging
    console.log("Debug check/fold button:");


    if (checkfold_button) {
        console.log(checkfold_button);
        checkfold_button.click();
    }
    else if (fold_button) {
        console.log(fold_button);
        fold_button.click();
    }
}

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




// read webpage and send cards back to extension
class Card {
    constructor(value, suit) {
        this.value = value;
        this.suit = suit;
    }
}

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





async function createObservers() {
    try{
        let table = document.getElementsByClassName("table")[0];
        var player = table.getElementsByClassName("you-player")[0];
        var tablePlayerCards = player.getElementsByClassName("table-player-cards")[0];

        if (table && player && tablePlayerCards) {
            observer.observe(tablePlayerCards, {
                attributes: true,
                childList: true,
                subtree: true
            });

            console.log("Observer created!");
            return true;
        }
    } catch (error) {
        console.log("Could not find cards...");
        // return false;
        await new Promise(r => setTimeout(r, 3000));
        createObservers();
    }
}

createObservers();