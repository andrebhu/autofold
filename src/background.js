console.log("background.js!");

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.get(["handsFolded"], function(result) {
        if (result["handsFolded"] == null) {
            chrome.storage.sync.set({ "handsFolded": 0});
        }
        console.log("Hands Folded: " + result["handsFolded"]);
    });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    
    
    if (message == 'checkHand') {
        console.log("Received checkHand...");
        sendResponse("Response!");
    }



    if (message == 'addFolded') {
        chrome.storage.sync.get(["handsFolded"], function(result) {
            let i = result["handsFolded"] + 1;
            chrome.storage.sync.set({ "handsFolded": i});
        });
        console.log("Added to handsFolded");
    }
    

    // if (message == 'getCurrentTab') {
    //     let queryOptions = { active: true, lastFocusedWindow: true };
    //     let tab = await chrome.tabs.query(queryOptions);
    //     return tab;
    // }
});


async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}