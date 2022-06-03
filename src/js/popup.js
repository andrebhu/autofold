function handleSaveButton() {
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




function createRangeTable() {
  const rangeTable = $('#range');

  chrome.storage.local.get(["fold", "range"], (result) => {
      for (let i = 0; i < 13; i++) {
          for (let j = 0; j < 13; j++) {
              let index = (i * 13) + j;
              let name = result.range[index].replaceAll("10", "T").split(" ").join("");

              // remove `o` from pocket pairs
              if (name[0] == name[1]) {
                  name = name.slice(0, name.length - 1);
              }

              let box = document.createElement("div");
              box.setAttribute("class", "box");

              // create label for checkbox
              let checkboxLabel = document.createElement("label");
              checkboxLabel.setAttribute("for", `${index}`);
              checkboxLabel.innerHTML = `${name}`;
              // rangeTable.append(checkboxLabel);
              box.append(checkboxLabel);

              // create checkbox
              let checkbox = document.createElement("input");
              checkbox.setAttribute("type", "checkbox");
              checkbox.setAttribute("id", `${index}`);
              checkbox.setAttribute("name", `${result.range[index]}`);
              checkbox.style.display = "none";
              
              // check checkbox if already set from local storage
              if (result.fold[index] == true) {
                  checkbox.checked = true;
                  box.style.backgroundColor = "gainsboro";
              } else {
                box.style.backgroundColor = "lightseagreen";
              }

              // rangeTable.append(checkbox);
              box.append(checkbox);
              
              // adding click listener for the entire box
              // should probably handle this in a seperate function but will figure that out later
              box.addEventListener("click", function() {
                let e = document.getElementById(`${index}`);

                if (e.checked == false) {
                  e.checked = true;
                  box.style.backgroundColor = "gainsboro";
                } else {
                  e.checked = false;
                  box.style.backgroundColor = "lightseagreen";
                }
              });



              rangeTable.append(box);
          }
          rangeTable.append('<br>');
      }

      // create save button
      let button = document.createElement("button");
      button.addEventListener("click", handleSaveButton);
      button.innerText = "Save";
      rangeTable.append(button);
  });
}

createRangeTable();