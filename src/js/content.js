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

injectScript(chrome.runtime.getURL('js/inject.js'), 'body');



class Card {
    constructor(value, suit) {
        this.value = value; // 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A
        this.suit = suit; // s, h, c, d
    }
}

const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

function checkRange(card1, card2) {
    // return true if fold
    let suited = false;
    if (card1.suit == card2.suit) { suited = true; }

    let ret = false;
    chrome.storage.local.get(["fold", "range"], (result) => {

        
        let handString = "";
        let c1 = values.indexOf(card1.value);
        let c2 = values.indexOf(card2.value);

        if (c1 < c2) {
            handString = `${card2.value} ${card1.value}`;
        } else {
            handString = `${card1.value} ${card2.value}`;
        }

        if (suited) {
            handString = handString + " s";
        } else {
            handString = handString + " o";
        }

        let i = result.range.indexOf(handString);
        let action = result.fold[i];

        // send back to inject.js
        window.postMessage({type: "FROM_EXTENSION", text: action}, "*");
    });
}





// receive data from inject.js and respond
window.addEventListener("message", (event) => {
    if (event.source != window) {
        return;
    }

    if (event.data.type && (event.data.type == "FROM_PAGE")) {
        
        console.log(`content.js received ${event.data.text}`);

        // parse cards
        let card1 = JSON.parse(event.data.text.split(" ")[0]);
        let card2 = JSON.parse(event.data.text.split(" ")[1]);

        checkRange(card1, card2);       
    }
}, false);