// let page = document.getElementById("buttonDiv");
// let selectedClassName = "current";
// const presetButtonColors = ["#3aa757", "#e8453c", "#f9bb2d", "#4688f1"];

// // Reacts to a button click by marking the selected button and saving
// // the selection
// function handleButtonClick(event) {
//   // Remove styling from the previously selected color
//   let current = event.target.parentElement.querySelector(
//     `.${selectedClassName}`
//   );
//   if (current && current !== event.target) {
//     current.classList.remove(selectedClassName);
//   }

//   // Mark the button as selected
//   let color = event.target.dataset.color;
//   event.target.classList.add(selectedClassName);
//   chrome.storage.sync.set({ color });
// }

// // Add a button to the page for each supplied color
// function constructOptions(buttonColors) {
//   chrome.storage.sync.get("color", (data) => {
//     let currentColor = data.color;
//     // For each color we were provided…
//     for (let buttonColor of buttonColors) {
//       // …create a button with that color…
//       let button = document.createElement("button");
//       button.dataset.color = buttonColor;
//       button.style.backgroundColor = buttonColor;

//       // …mark the currently selected color…
//       if (buttonColor === currentColor) {
//         button.classList.add(selectedClassName);
//       }

//       // …and register a listener for when that button is clicked
//       button.addEventListener("click", handleButtonClick);
//       page.appendChild(button);
//     }
//   });
// }

// // Initialize the page by constructing the color options
// constructOptions(presetButtonColors);



// chrome.storage.local.get(["range"], (result) => {
//     // const e = document.createElement('div');
//     // e.innerHTML = result.range;

//     // document.body.appendChild(e);
//     // console.log(result.range);

//     range = result.range;
// });


function createRangeTable() {
    const container = $('.range-container');
    chrome.storage.local.get(["fold", "range"], (result) => {

        console.log(result.fold);
        console.log(result.fold[44]);



        for (let i = 0; i < 13; i++) {
            for (let j = 0; j < 13; j++) {
                let index = (i * 13) + j;
                let name = result.range[index].split(" ").join("")
                if (result.fold[index] == true) {
                    container.append(`<label for="${name}">${name}</label>`);
                    container.append(`<input type="checkbox" id="${name}" name="${result.range[index]}" checked>`);
                }
                else {
                    container.append(`<label for="${name}">${name}</label>`);
                    container.append(`<input type="checkbox" id="${name}" name="${result.range[index]}">`);
                }
                
            }
            container.append('<br>')
        }
    });
}

createRangeTable();



// chrome.storage.sync.get(["handsFolded"], (result) => {
//     // const e = document.createElement('div');
//     // e.innerHTML = result.result;
//     // document.body.appendChild(e);
//     console.log(result.handsFolded);
// });