// https://stackoverflow.com/questions/9515704/use-a-content-script-to-access-the-page-context-variables-and-functions
// https://stackoverflow.com/questions/54619817/how-to-fix-unchecked-runtime-lasterror-could-not-establish-connection-receivi
// https://developer.chrome.com/docs/extensions/mv3/content_scripts/#host-page-communication

class Card {
    constructor(value, suit) {
        this.value = value;
        this.suit = suit;
    }
}

function injectScript(file_path, tag) {
    var node = document.getElementsByTagName(tag)[0];
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', file_path);

    node.appendChild(script);
}

injectScript(chrome.runtime.getURL('inject.js'), 'body');


function isSuited(card1, card2) {
    if (card1.suit == card2.suit) { return true };
    return false;
}




// receive data from inject.js and respond
window.addEventListener("message", (event) => {
    if (event.source != window) {
        return;
    }

    if (event.data.type && (event.data.type == "FROM_PAGE")) {
        console.log("Content script received: ");
        console.log(event.data.text);

        let card1 = JSON.parse(event.data.text.split(" ")[0]);
        let card2 = JSON.parse(event.data.text.split(" ")[1]);

        if (isSuited(card1, card2)) {
            console.log("They're suited!")
        } else {
            console.log("They're not suited...")
        }

        // send back to inject.js
        window.postMessage({type: "FROM_EXTENSION", text: "unsuited..."}, "*");
    }
}, false);