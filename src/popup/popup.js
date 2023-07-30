// TODO: can make this more efficient by having the elements modify an array
// so far no performance issues?
function saveRangeTable() {
  var fold = Array(169);
  const rangeTable = $('#range');

  for (let i = 0; i < 169; i++) {
      let e = $(`#${i}`);

      if (e.is(":checked")) {
          fold[i] = true;
      }
      else {
          fold[i] = false;
      }
  }
  chrome.storage.local.set({"fold": fold});
}


function resetRangeTable() {
    let fold = new Array(169).fill(false);
    chrome.storage.local.set({"fold": fold});

    var rangeTable = document.getElementById("range");
    var boxes = rangeTable.getElementsByClassName("box");

    for (let box of boxes) {
        if (box.classList.contains("fold")) {
            box.classList.remove("fold");
            box.classList.add("no-fold");
        }

        let checkbox = box.getElementsByTagName('input')[0];
        if (checkbox.checked) {
            checkbox.checked = false;
        } else {
            checkbox.checked = true;
        }
    }
}


function toggleBox(box) {
    var checkbox = box.getElementsByTagName('input')[0];
    
    if (box.classList.contains("fold")) {
        box.classList.remove("fold");
        box.classList.add("no-fold");
    } else if (box.classList.contains("no-fold")) {
        box.classList.remove("no-fold");
        box.classList.add("fold");
    }

    if (checkbox.checked) {
        checkbox.checked = false;
    } else {
        checkbox.checked = true;
    }

    saveRangeTable();
}


function createBox(name, index, checked) {

    // create outside toggle
    var box = document.createElement("div");
    box.setAttribute("class", "box");

    // create label for box
    var label = document.createElement("p");
    label.innerHTML = `${name}`;

    // input for keeping track of value
    var checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", `${index}`);

    // set colors
    if (checked) {
        checkbox.checked = true;
        box.classList.add("fold");
    } else {
        box.classList.add("no-fold");
    }

    box.append(label);
    box.append(checkbox);

    return box;
}


function createRangeTable() {
  var rangeTable = $('#range');

  chrome.storage.local.get(["fold", "range"], (result) => {
      for (let i = 0; i < 13; i++) {
          for (let j = 0; j < 13; j++) {
              let index = (i * 13) + j;
              let name = result.range[index].replaceAll("10", "T").split(" ").join("");

              // remove `o` from pocket pairs
              if (name[0] == name[1]) {
                  name = name.slice(0, name.length - 1);
              }

              var box = createBox(name, index, result.fold[index]);
              rangeTable.append(box);
          }
          rangeTable.append('<br>');

          // jQuery selectable
          rangeTable.selectable({
            filter: "div",
            selected: function(event, ui) {
                toggleBox(ui["selected"]);
            }
          });
      }
  });
}


function createResetButton() {
    var resetButton = document.createElement("button");
    resetButton.innerHTML = "Reset Range";
    resetButton.onclick = function () {
        resetRangeTable();
    };
    document.body.appendChild(resetButton);
}


$(document).ready(function () {
    createRangeTable();
    createResetButton();
});
