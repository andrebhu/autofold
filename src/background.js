console.log("background.js!");

// create ranges
class Hand {
    constructor(values, suited) {
        this.values = values;
        this.suited = suited;
        this.fold = false;
    }
}

const values = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];

chrome.runtime.onInstalled.addListener(() => {
        chrome.storage.sync.set({"handsFolded": 0});

        // create default range
        let hands = [];
        for (let i = 0; i < values.length; i++) {
            for (let j = 0; j < values.length; j++) {
                // hands.push("AKo");
                if (i >= j) {
                    hands.push(new Hand([values[i], values[j]], false));
                }
                else {
                    hands.push(new Hand([values[i], values[j]], true));
                }
            }
        }

        chrome.storage.local.set({"range": hands});
});


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message == 'get-range') {
        console.log("Received checkHand...");
        sendResponse();
    }

    if (message == 'addFolded') {
        chrome.storage.sync.get(['handsFolded'], function(result) {
            let i = result['handsFolded'] + 1;
            chrome.storage.sync.set({ 'handsFolded': i});
        });
        console.log("Added to handsFolded");
    }
});