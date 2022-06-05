// https://stackoverflow.com/questions/9515704/use-a-content-script-to-access-the-page-context-variables-and-functions
// https://stackoverflow.com/questions/54619817/how-to-fix-unchecked-runtime-lasterror-could-not-establish-connection-receivi
// https://developer.chrome.com/docs/extensions/mv3/content_scripts/#host-page-communication

// inject inject.js
function injectScript(file_path, tag) {
    var node = document.getElementsByTagName(tag)[0];
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', file_path);

    node.appendChild(script);
}

injectScript(chrome.runtime.getURL('js/inject.js'), 'body');





const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

function checkRange(hand) {
    // return true if fold
    let suited = false;
    if (hand.suit1 == hand.suit2) { suited = true; }

    chrome.storage.local.get(["fold", "range"], (result) => {
        let handString = "";
        let c1 = values.indexOf(hand.card1);
        let c2 = values.indexOf(hand.card2);

        if (c1 < c2) {
            handString = `${hand.card2} ${hand.card1}`;
        } else {
            handString = `${hand.card1} ${hand.card2}`;
        }

        if (suited) {
            handString = handString + " s";
        } else {
            handString = handString + " o";
        }

        // find index and check `fold` array for action
        let i = result.range.indexOf(handString);
        let action = result.fold[i];


        // if not folding play sound on potential hand
        if (action == false) {
            var sound = new Audio(chrome.runtime.getURL("/media/alert.mp3"));
            sound.volume = 0.1;
            sound.play();
        } else { // increment handsFolded counter
            chrome.storage.local.get(["handsFolded"], (result) => {
                let i = result.handsFolded + 1;
                console.log(`Folded a total of ${i} hands`);
                chrome.storage.local.set({"handsFolded": i});
            })
        }

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
        if (event.data.text) {
            // console.log(event.data.text);

            // let card1 = JSON.parse(event.data.text.split(" ")[0]);
            // let card2 = JSON.parse(event.data.text.split(" ")[1]);

            let hand = JSON.parse(event.data.text);

            // receives event on showdown, store previous card
            // TODO: this doesn't work

            checkRange(hand);
        }
    }
}, false);