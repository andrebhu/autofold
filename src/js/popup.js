
// TODO: can make this more efficient by having the elements modify an array
function save() {
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


              // HANDLING USER INPUT
              // adding click listener for the entire box
              // should probably handle this in a seperate function but will figure that out later
              // box.addEventListener("click", function() {
              //   let e = document.getElementById(`${index}`);
              
              //   if (e.checked == false) {
              //     e.checked = true;
              //     this.style.backgroundColor = "gainsboro";
              //   } else {
              //     e.checked = false;
              //     this.style.backgroundColor = "lightgreen";
              //   }

              //   // save click
              //   handleSaveButton();
              // });


              // $(box).on("mousedown mouseover", function (e) {
              //   if (e.buttons == 1 || e.buttons == 3) {

              //   let obj = document.getElementById(`${index}`);
              
              //   if (obj.checked == false) {
              //     obj.checked = true;
              //     this.style.backgroundColor = "gainsboro";
              //   } else {
              //     obj.checked = false;
              //     this.style.backgroundColor = "lightgreen";
              //   }

              //   // save click
              //   handleSaveButton();


                  // $(this).click();

                  // console.log($(this).checked);
                  // if ($(this).checked) {
                  //   $(this).checked = false;
                  //   $(this).css("background-color", "lightgreen");
                  // } else {
                  //   $(this).checked = true;
                  //   $(this).css("background-color", "gainsboro");
                  // }
                // }
              // });


              // box.classList.add("selectable");
              // box.classList.add("ui-state-default");

              // $(box).selectable();



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

    save();
}


function createBox(name, index, checked) {

    // create outside toggle
    var box = document.createElement("div");
    box.setAttribute("class", "box");

    // create label for box
    var label = document.createElement("p");
    label.setAttribute("for", `${index}`);
    label.innerHTML = `${name}`;

    // input for keeping track of value
    var checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", `${index}`);

    // set colors
    if (checked) {
        checkbox.checked = true;
        // box.style.backgroundColor = "gainsboro";      
        box.classList.add("no-fold");
    } else {
        // box.style.backgroundColor = "lightgreen";
        box.classList.add("fold");
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

          rangeTable.selectable({
            filter: "div",
            selected: function(event, ui) {
                toggleBox(ui["selected"]);
                save();
            }
          });
      }
  });
}




$(document).ready(function () {
    createRangeTable();
});