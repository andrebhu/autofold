console.log("background.js!");

// create ranges
class Hand {
    constructor(values, suited) {
        this.values = values;
        this.suited = suited;
    }
}

const values = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];

chrome.runtime.onInstalled.addListener(() => {
        let handsFolded = 0;
        chrome.storage.sync.set({"handsFolded": 0});
        // chrome.storage.sync.set(handsFolded);

        // create range hands
        // NOTE: had issues with storing chrome.storage as an object so 
        // falling back to using a string
        let hands = [];
        for (let i = 0; i < values.length; i++) {
            for(let j = 0; j < values.length; j++) {
                if (i > j) {
                    // hands.push(new Hand([values[i], values[j]], false));
                    hands.push(values[j] + " " + values[i] + " " + "s");
                }
                else {
                    // hands.push(new Hand([values[i], values[j]], true));
                    hands.push(values[i] + " " + values[j] + " " + "o");
                }
            }
        }

        console.log(hands);
        chrome.storage.local.set({"range": hands});


        // create associated booleans that map to hands
        let fold = new Array(169).fill(true);
        chrome.storage.local.set({"fold": fold});
});





// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message == 'get-range') {
//         console.log("Received checkHand...");
//         sendResponse();
//     }

//     if (message == 'addFolded') {
//         chrome.storage.sync.get(['handsFolded'], function(result) {
//             let i = result['handsFolded'] + 1;
//             chrome.storage.sync.set({ 'handsFolded': i});
//         });
//         console.log("Added to handsFolded");
//     }
// });