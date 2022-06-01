const toggleButton = document.getElementById("toggleButton");




// config for DOM Observer
// const config = { attributes: true };

// callback function for mutations

// const observer = new MutationObserver(function (event) {
//   console.log(event);
// });

// observer.observe(user, {
//   arrtributes: true,
//   subtree: true
// });









// function getCurrentTab() {
//   var activeTabUrl = "";



  
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     // since only one tab should be active and in the current window at once
//     // the return variable should only have one entry
//     var activeTab = tabs[0];
//     activeTabUrl = activeTab.url;

//     alert(activeTab.url);
//     return activeTab.url;
//   });
// }


function addMessage(m) {
  $("#messages").append("<div class='message'>" + m + "</div>");

  setTimeout(function() {
    $(".message").remove();
  }, 5000);
}




const user = document.getElementsByClassName("you-player");
alert(user.length);


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

