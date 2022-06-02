// const toggleButton = document.getElementById("toggleButton");


// document.addEventListener('DOMContentLoaded', async () => {
//   const toggleButton = document.getElementById("toggleButton");
//   const user = document.getElementsByClassName("you-player")[0];
  
// });
// // config for DOM Observer
// // const config = { attributes: true };

// // callback function for mutations

// // const observer = new MutationObserver(function (event) {
// //   console.log(event);
// // });

// // observer.observe(user, {
// //   arrtributes: true,
// //   subtree: true
// // });



function addMessage(m) {
  $("#messages").append("<div class='message'>" + m + "</div>");

  setTimeout(function() {
    $(".message").remove();
  }, 5000);
}


// jQuery
$(document).ready(function () {
  $("#toggleButton").click(async function () {
    // turn on autofold
    if ($("#toggleButton").text() == "Turn On") {

      // check if user is on pokernow
      let tab = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
      let check = tab[0].url.includes("https://www.pokernow.club/games/");
      
      if (check == false) {
        addMessage("Get in a game");
        return;
      }

      // alert($("#main-container").hasClass("you-player"));


      $("#toggleButton").text("Turn Off");
      return;
    }

    $("#toggleButton").text("Turn On");    
  })
})