const toggleButton = document.getElementById("toggleButton");


const user = document.getElementsByClassName("you-player");


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




// jQuery code
$(document).ready(function () {
  $("#toggleButton").click(function () {
    $("#toggleButton").text(($("#toggleButton").text() == "Turn On") ? "Turn Off" : "Turn On");
  })
  
})

$(document).append(getCurrentTab());