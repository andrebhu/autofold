console.log("inject.js!");

const player = document.getElementsByClassName("you-player")[0];
const playerHand = player.querySelector(".table-player-cards");

let observer = new MutationObserver(mutationRecords => {
    // console.log(mutationRecords);
    for (let record of mutationRecords) {
        console.log(record["target"]);
    }
});

observer.observe(playerHand, {
    attributes: true,
    childList: true,
    subtree: true
});