function handleButtonClick() {
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

              if (result.fold[index] == true) {
                  rangeTable.append(`<label for="${index}">${name}</label>`);
                  rangeTable.append(`<input type="checkbox" id="${index}" name="${result.range[index]}" checked>`);
              }
              else {
                  rangeTable.append(`<label for="${index}">${name}</label>`);
                  rangeTable.append(`<input type="checkbox" id="${index}" name="${result.range[index]}">`);
              }
          }
          rangeTable.append('<br>');
      }

      // create save button
      let button = document.createElement("button");
      button.addEventListener("click", handleButtonClick);
      button.innerText = "Save";
      rangeTable.append(button);
  });
}

createRangeTable();