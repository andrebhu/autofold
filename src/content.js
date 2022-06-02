// https://stackoverflow.com/questions/9515704/use-a-content-script-to-access-the-page-context-variables-and-functions
// https://stackoverflow.com/questions/54619817/how-to-fix-unchecked-runtime-lasterror-could-not-establish-connection-receivi
// https://developer.chrome.com/docs/extensions/mv3/content_scripts/#host-page-communication


function injectScript(file_path, tag) {
    var node = document.getElementsByTagName(tag)[0];
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', file_path);

    node.appendChild(script);
}

injectScript(chrome.runtime.getURL('inject.js'), 'body');








class Card {
    constructor(value, suit) {
        this.value = value; // 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A
        this.suit = suit; // s, h, c, d
    }
}

const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
const suits = ["s", "h", "c", "d"];

function isSuited(card1, card2) {
    if (card1.suit == card2.suit) { return true };
    return false;
}


function checkFold(card1, card2) {

    // return "don't fold";
    return "fold";
}





// receive data from inject.js and respond
window.addEventListener("message", (event) => {
    if (event.source != window) {
        return;
    }

    if (event.data.type && (event.data.type == "FROM_PAGE")) {
        console.log("Content script received: ");
        console.log(event.data.text);

        // parse cards
        let card1 = JSON.parse(event.data.text.split(" ")[0]);
        let card2 = JSON.parse(event.data.text.split(" ")[1]);

        console.log("content.js");

        // console.log(handsFolded);
        

        // send back to inject.js
        window.postMessage({type: "FROM_EXTENSION", text: "From content.js"}, "*");
    }
}, false);