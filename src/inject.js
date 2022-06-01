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






// kind of the main function where all the logic is
let observer = new MutationObserver(mutationRecords => {
    var cards = [];
    for (let record of mutationRecords) {
        let e = record["target"];

        let value = e.getElementsByClassName("value")[0].innerHTML;
        let suit = e.getElementsByClassName("suit")[0].innerHTML;
        cards.push(new Card(value, suit));
    }

    window.postMessage({type: "FROM_PAGE", text: JSON.stringify(cards[0]) + JSON.stringify(cards[1])}, "*");

    click_fold();
});




// receive information from extension
window.addEventListener("message", (event) => {
    if (event.source != window) {
        return;
    }

    if (event.data.type && (event.data.type == "FROM_EXTENSION")) {
        console.log("Inject.js received: ");
        console.log(event.data.text);
    }
})





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