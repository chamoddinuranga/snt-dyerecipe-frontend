$(document).ready(function () {
  // Load products when the user types in the product field
  $("#product").on("input", function () {
    let query = $(this).val();
    if (query.length >= 2) {
      // Trigger search when at least 2 characters are entered
      loadProductSuggestions(query);
    }
  });

  // Function to load product suggestions
  function loadProductSuggestions(query) {
    $.ajax({
      method: "GET",
      contentType: "application/json",
      url:
        "http://localhost:8080/api/v1/product/searchProducts?query=" +
        encodeURIComponent(query),
      success: function (response) {
        if (response.code === "00") {
          let suggestions = response.content;
          let datalist = $("#productSuggestions");
          datalist.empty(); // Clear previous suggestions
          for (let product of suggestions) {
            datalist.append(`<option value="${product.productName}">`);
          }
        }
      },
      error: function (xhr, exception) {
        console.error("Error occurred: " + xhr.status + " - " + xhr.statusText);
      },
    });
  }
});

function updateRow() {
  // Get the selected row
  const selectedRow = document.querySelector("tr.selected");

  if (!selectedRow) {
    alert("Please select a row to update.");
    return;
  }

  // Get values from input fields
  const functionValue = document.getElementById("function").value;
  const productValue = document.getElementById("product").value;A
  const doseValue = document.getElementById("dose").value;
  const tempValue = document.getElementById("temp").value;
  const timeValue = document.getElementById("time").value;
  const amtsInGramsValue = document.getElementById("amtsInGrams").value;

  // Update the selected row with the new values
  const cells = selectedRow.getElementsByTagName("td");
  cells[0].textContent = functionValue;
  cells[1].textContent = productValue;
  cells[2].textContent = doseValue;
  cells[3].textContent = tempValue;
  cells[4].textContent = timeValue;
  cells[5].textContent = amtsInGramsValue;
}

// function addRow() {
//   // Get values from input fields
//   const functionValue = document.getElementById("function").value;
//   const productValue = document.getElementById("product").value;
//   const doseValue = document.getElementById("dose").value;
//   const tempValue = document.getElementById("temp").value;
//   const timeValue = document.getElementById("time").value;
//   const amtsInGramsValue = document.getElementById("amtsInGrams").value;

//   // Create a new row
//   const tableBody = document.getElementById("processTableBody");
//   const newRow = document.createElement("tr");
//   newRow.innerHTML = `
//       <td>${functionValue}</td>
//       <td>${productValue}</td>
//       <td>${doseValue}</td>
//       <td>${tempValue}</td>
//       <td>${timeValue}</td>
//       <td>${amtsInGramsValue}</td>
//     `;

//   // Add the new row to the table
//   tableBody.appendChild(newRow);

//   // Clear input fields
//   clearFields();
// }
// function addRow() {
//   // Get values from input fields
//   const functionValue = document.getElementById("function").value;
//   const productValue = document.getElementById("product").value;
//   const doseValue = parseFloat(document.getElementById("dose").value); // Ensure it's a number
//   const tempValue = document.getElementById("temp").value;
//   const timeValue = document.getElementById("time").value;

//   // Determine product type and calculate amtsInGrams
//   let amtsInGramsValue;

//   // Fetch product type (Assuming you have a function to get this; otherwise, you'll need to adapt this part)
//   $.ajax({
//     method: "GET",
//     url: "http://localhost:8080/api/v1/product/getProductType?productName=" + encodeURIComponent(productValue),
//     success: function(response) {
//       if (response.code === "00") {
//         const productType = response.content.productType; // Assuming response contains productType
//         console.log

//         // Calculate amtsInGrams based on product type
//         if (productType === "DYE") {
//           amtsInGramsValue = doseValue * 10;
//         } else if (productType === "CHEMICAL") {
//           amtsInGramsValue = doseValue * 28;
//         } else {
//           amtsInGramsValue = 0; // Default value if type is unknown
//         }

//         // Create a new row
//         const tableBody = document.getElementById("processTableBody");
//         const newRow = document.createElement("tr");
//         newRow.innerHTML = `
//           <td>${functionValue}</td>
//           <td>${productValue}</td>
//           <td>${doseValue}</td>
//           <td>${tempValue}</td>
//           <td>${timeValue}</td>
//           <td>${amtsInGramsValue}</td>
//         `;

//         // Add the new row to the table
//         tableBody.appendChild(newRow);

//         // Clear input fields
//         clearFields();
//       } else {
//         alert("Error fetching product type");
//       }
//     },
//     error: function(xhr, exception) {
//       console.error("Error fetching product type: " + xhr.status + " - " + xhr.statusText);
//     }
//   });
// }

function addRow() {
  // Get values from input fields
  const functionValue = document.getElementById("function").value;
  const productValue = document.getElementById("product").value;
  const doseValue = parseFloat(document.getElementById("dose").value); // Ensure it's a number
  const tempValue = document.getElementById("temp").value;
  const timeValue = document.getElementById("time").value;

  // Determine product type and calculate amtsInGrams
  let amtsInGramsValue;
  let weight = $("#weight").val();
  let volume = $("#volume").val();

  // Fetch product type
  $.ajax({
    method: "GET",
    url:
      "http://localhost:8080/api/v1/product/getProductType?productName=" +
      encodeURIComponent(productValue),
    success: function (response) {
      // Check if the response is as expected
      console.log("API Response:", response);

      if (
        response.code === "00" &&
        response.content &&
        response.content.productType
      ) {
        const productType = response.content.productType;
        console.log("Product type:", productType);

        // Calculate amtsInGrams based on product type
        if (productType === "Dye") {
          amtsInGramsValue = doseValue * weight * 10;
        } else if (productType === "Chemical") {
          amtsInGramsValue = doseValue * volume;
        } else {
          amtsInGramsValue = 0; // Default value if type is unknown
        }

        // Create a new row
        const tableBody = document.getElementById("processTableBody");
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
          <td>${functionValue}</td>
          <td>${productValue}</td>
          <td>${doseValue}</td>
          <td>${tempValue}</td>
          <td>${timeValue}</td>
          <td>${amtsInGramsValue}</td>
        `;

        // Add the new row to the table
        tableBody.appendChild(newRow);

        // Clear input fields
        clearFields();
      } else {
        console.error("Error fetching product type:", response);
        alert("Error fetching product type or product type is undefined");
      }
    },
    error: function (xhr, exception) {
      console.error(
        "Error fetching product type: " + xhr.status + " - " + xhr.statusText
      );
      alert("Error fetching product type");
    },
  });
}

// Assuming clearFields function clears input fields
function clearFields() {
  document.getElementById("function").value = "";
  document.getElementById("product").value = "";
  document.getElementById("dose").value = "";
  document.getElementById("temp").value = "";
  document.getElementById("time").value = "";
}

function moveRow(direction) {
  const tableBody = document.getElementById("processTableBody");
  const selectedRow = document.querySelector("tr.selected");

  if (!selectedRow) {
    alert("Please select a row to move.");
    return;
  }

  const rows = Array.from(tableBody.getElementsByTagName("tr"));
  const index = rows.indexOf(selectedRow);

  if (direction === "up" && index > 0) {
    tableBody.insertBefore(selectedRow, rows[index - 1]);
  } else if (direction === "down" && index < rows.length - 1) {
    tableBody.insertBefore(selectedRow, rows[index + 2] || null);
  }
}

function deleteSelectedRow() {
  const selectedRow = document.querySelector("tr.selected");

  if (!selectedRow) {
    alert("Please select a row to delete.");
    return;
  }

  selectedRow.remove();
}

function clearFields() {
  document.getElementById("function").value = "";
  document.getElementById("product").value = "";
  document.getElementById("dose").value = "";
  document.getElementById("temp").value = "";
  document.getElementById("time").value = "";
  document.getElementById("amtsInGrams").value = "";
}

// Add event listener to table rows for selection
document
  .getElementById("processTableBody")
  .addEventListener("click", function (e) {
    if (e.target.tagName === "TD") {
      const row = e.target.parentNode;
      const previouslySelected = document.querySelector("tr.selected");

      if (previouslySelected) {
        previouslySelected.classList.remove("selected");
      }

      row.classList.add("selected");

      // Load row values into input fields
      const cells = row.getElementsByTagName("td");
      document.getElementById("function").value = cells[0].textContent;
      document.getElementById("product").value = cells[1].textContent;
      document.getElementById("dose").value = cells[2].textContent;
      document.getElementById("temp").value = cells[3].textContent;
      document.getElementById("time").value = cells[4].textContent;
      document.getElementById("amtsInGrams").value = cells[5].textContent;
    }
  });

// Event listener for Enter key to trigger button actions
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const activeElement = document.activeElement;

    if (
      activeElement.id === "function" ||
      activeElement.id === "product" ||
      activeElement.id === "dose" ||
      activeElement.id === "temp" ||
      activeElement.id === "time" ||
      activeElement.id === "amtsInGrams"
    ) {
      e.preventDefault(); // Prevent default form submission

      // Simulate clicking the ADD button
      document.querySelector(".btn-group .btn-info").click();
    }
  }
});

function addSpaceRow() {
  // Create a new row
  const tableBody = document.getElementById("processTableBody");
  const newRow = document.createElement("tr");

  // Add empty cells to the new row
  newRow.innerHTML = `
    <td colspan="6"></td>
  `;

  // Add the new row to the table
  tableBody.appendChild(newRow);
}




function saveRecipe() {
  // Retrieve values from the form
  let reciNo = $("#reciNo").val();
  let grn = $("#grn").val();
  let rpDate = $("#rp_date").val();
  let machineNo = $("#machineNo").val();
  let rpTime = $("#rp_time").val();
  let labDip = $("#labDip").val();
  let color = $("#color").val();
  let fabric = $("#fabric").val();
  let weight = $("#weight").val();
  let liquorRatio = $("#liquorRatio").val();
  let volume = $("#volume").val();
  let roleCount = $("#roleCount").val();

  // Collect the rows of the table
  let tableRows = [];
  $("#processTableBody tr").each(function () {
    let cells = $(this).find("td");
    tableRows.push({
      addFunction: cells.eq(0).text(),
      productName: cells.eq(1).text(), // Assuming this is the correct index for productId
      dose: cells.eq(2).text(),
      temp: cells.eq(3).text(),
      time: cells.eq(4).text(),
      quantityInGrams: cells.eq(5).text(),
    });
  });

  // Prepare data for the request
  let recipeData = {
    reciNo: "00",
    color: color,
    labDip: labDip,
    roleCount: roleCount,
    weight: weight,
    liquorRatio: liquorRatio,
    volume: volume,
    createdUser: "user123", // Assuming a static user or get from session
    createdDateTime: new Date().toISOString(),
    recipeDetails: tableRows,
  };

  // Log the data to the console to view the format
  console.log(
    "Data being sent to the server:",
    JSON.stringify(recipeData, null, 2)
  );

  // Perform AJAX request
  $.ajax({
    method: "POST",
    contentType: "application/json",
    url: "http://localhost:8080/api/v1/recipe/saveRecipe",
    data: JSON.stringify(recipeData),
    success: function (data) {
      alert("Recipe saved successfully");
      clearFields();
      $("#processTableBody").empty();
    },
    error: function (xhr, exception) {
      alert("Error saving recipe: " + xhr.responseText);
      console.error("Error details:", exception); // Log response text for debugging
    },
  });
}

// $(document).ready(function () {
//   // Event handler for input changes
//   $("#labDip").on("input", function () {
//     let query = $(this).val();
//     if (query.length >= 2) { // Trigger search when at least 2 characters are entered
//       loadLabDipSuggestions(query);
//     }
//   });

//   // Event handler for Enter key press
//   $("#labDip").on("keydown", function (event) {
//     if (event.key === "Enter") {
//       event.preventDefault(); // Prevent form submission or default action
//       let query = $(this).val();
//       if (query.length >= 2) { // Trigger search when at least 2 characters are entered
//         loadLabDipSuggestions(query);
//       }
//     }
//   });

//   function loadLabDipSuggestions(query) {
//     $.ajax({
//       method: "GET",
//       contentType: "application/json",
//       url: "http://localhost:8080/api/v1/recipe/searchLabDips?query=" + encodeURIComponent(query),
//       success: function (response) {
//         let datalist = $("#labDipSuggestions");
//         datalist.empty(); // Clear previous suggestions
//         for (let recipe of response) {
//           datalist.append(`<option value="${recipe.labDip}">`);
//         }
//       },
//       error: function (xhr, exception) {
//         console.error("Error occurred: " + xhr.status + " - " + xhr.statusText);
//       },
//     });
//   }
// });

$(document).ready(function () {
  // Load lab dip suggestions when the user types in the lab dip field
  $("#labDip").on("input", function () {
    let query = $(this).val();
    if (query.length >= 2) {
      // Trigger search when at least 2 characters are entered
      loadLabDipSuggestions(query);
    }
  });

  // Function to load lab dip suggestions
  function loadLabDipSuggestions(query) {
    $.ajax({
      method: "GET",
      contentType: "application/json",
      url:
        "http://localhost:8080/api/v1/recipe/searchLabDips?query=" +
        encodeURIComponent(query),
      success: function (response) {
        if (response.code === "00") {
          let suggestions = response.content;
          let datalist = $("#labDipSuggestions");
          datalist.empty(); // Clear previous suggestions
          for (let labDip of suggestions) {
            datalist.append(`<option value="${labDip}">`);
          }
        }
      },
      error: function (xhr, exception) {
        console.error("Error occurred: " + xhr.status + " - " + xhr.statusText);
      },
    });
  }
});

function printRecipe() {
  // Create a style element for print-specific styles
  const printStyle = document.createElement("style");
  printStyle.id = "printStyle";
  printStyle.innerHTML = `
    @media print {
      /* Hide all buttons and fields */
      .btn,
      .btn-group,
      #function, 
      #product, 
      #dose, 
      #temp, 
      #time, 
      #amtsInGrams,
      #new_recipe_section > .form-section > .row > .col-md-3:not(:last-child) {
        display: none; /* Hide specified fields and some labels */
      }
      
      /* Ensure the table is fully visible and well formatted */
      #processTable,
      #processTableBody {
        display: table;
        width: 100%;
      }

      #processTable th, 
      #processTable td {
        border: 1px solid #000;
        padding: 5px;
        text-align: left;
      }

      /* Ensure the table takes up most of the page */
      @page {
        size: auto;
        margin: 0.5in;
      }

      body {
        margin: 0;
        padding: 0;
      }
    }
  `;

  // Append the style element to the head of the document
  document.head.appendChild(printStyle);

  // Trigger the print dialog
  window.print();

  // Remove the style element after printing
  setTimeout(() => {
    const style = document.getElementById("printStyle");
    if (style) {
      style.remove();
    }
  }, 1000);
}

// $(document).ready(function () {
//   // Bind the search function to the input field for lab dip
//   $("#searchLabDip").on("input", function () {
//       let labDip = $(this).val();
//       if (labDip.length >= 2) { // Trigger search when at least 2 characters are entered
//           searchRecipeByLabDip(labDip);
//       }
//   });

//   function searchRecipeByLabDip(labDip) {
//       $.ajax({
//           method: "GET",
//           contentType: "application/json",
//           url: `http://localhost:8080/api/v1/recipe/getRecipeByLabDip/${encodeURIComponent(labDip)}`,
//           success: function (response) {
//               if (response.code === "00") {
//                   displayRecipe(response.content);
//               } else {
//                   alert("No recipe found for this Lab Dip");
//                   clearRecipeDetails();
//               }
//           },
//           error: function (xhr, exception) {
//               console.error("Error occurred: " + xhr.status + " - " + xhr.statusText);
//           }
//       });
//   }

//   function displayRecipe(recipe) {
//       // Assuming you have a form or display area to show recipe details
//       $("#reciNo").val(recipe.reciNo);
//       $("#color").val(recipe.color);
//       $("#labDip").val(recipe.labDip);
//       $("#roleCount").val(recipe.roleCount);
//       $("#weight").val(recipe.weight);
//       $("#liquorRatio").val(recipe.liquorRatio);
//       $("#volume").val(recipe.volume);
//       // Populate the table with recipe details
//       let tableBody = $("#processTableBody");
//       tableBody.empty(); // Clear existing rows
//       recipe.recipeDetails.forEach(detail => {
//           tableBody.append(`
//               <tr>
//                   <td>${detail.addFunction}</td>
//                   <td>${detail.productName}</td>
//                   <td>${detail.dose}</td>
//                   <td>${detail.temp}</td>
//                   <td>${detail.time}</td>
//                   <td>${detail.quantityInGrams}</td>
//               </tr>
//           `);
//       });
//   }

//   function clearRecipeDetails() {
//       $("#reciNo").val('');
//       $("#color").val('');
//       $("#labDip").val('');
//       $("#roleCount").val('');
//       $("#weight").val('');
//       $("#liquorRatio").val('');
//       $("#volume").val('');
//       $("#processTableBody").empty();
//   }
// });

// $(document).ready(function () {
//   // Bind the click event of the search button
//   $("#searchButton").on("click", function () {
//       let labDip = $("#labDip").val();
//       if (labDip.length >= 2) { // Trigger search when at least 2 characters are entered
//           searchRecipeByLabDip(labDip);
//       } else {
//           alert("Please enter at least 2 characters for lab dip.");
//       }
//   });

//   function searchRecipeByLabDip(labDip) {
//       $.ajax({
//           method: "GET",
//           contentType: "application/json",
//           url: `http://localhost:8080/api/v1/recipe/getRecipeByLabDip/${encodeURIComponent(labDip)}`,
//           success: function (response) {
//               if (response.code === "00") {
//                   displayRecipe(response.content);
//               } else {
//                   alert("No recipe found for this Lab Dip");
//                   clearRecipeDetails();
//               }
//           },
//           error: function (xhr, exception) {
//               console.error("Error occurred: " + xhr.status + " - " + xhr.statusText);
//           }
//       });
//   }

//   function displayRecipe(recipe) {
//       $("#reciNo").val(recipe.reciNo);
//       $("#color").val(recipe.color);
//       $("#labDip").val(recipe.labDip);
//       $("#roleCount").val(recipe.roleCount);
//       $("#weight").val(recipe.weight);
//       $("#liquorRatio").val(recipe.liquorRatio);
//       $("#volume").val(recipe.volume);

//       let tableBody = $("#processTableBody");
//       tableBody.empty(); // Clear existing rows
//       recipe.recipeDetails.forEach(detail => {
//           tableBody.append(`
//               <tr>
//                   <td>${detail.addFunction}</td>
//                   <td>${detail.productName}</td>
//                   <td>${detail.dose}</td>
//                   <td>${detail.temp}</td>
//                   <td>${detail.time}</td>
//                   <td>${detail.quantityInGrams}</td>
//               </tr>
//           `);
//       });
//   }

//   function clearRecipeDetails() {
//       $("#reciNo").val('');
//       $("#color").val('');
//       $("#labDip").val('');
//       $("#roleCount").val('');
//       $("#weight").val('');
//       $("#liquorRatio").val('');
//       $("#volume").val('');
//       $("#processTableBody").empty();
//   }
// });

$(document).ready(function () {
  // Bind the click event of the search button
  $("#searchButton").on("click", function () {
    let labDip = $("#labDip").val();
    if (labDip.length >= 2) {
      // Trigger search when at least 2 characters are entered
      searchRecipeByLabDip(labDip);
    } else {
      alert("Please enter at least 2 characters for lab dip.");
    }
  });

  function searchRecipeByLabDip(labDip) {
    $.ajax({
      method: "GET",
      contentType: "application/json",
      url: `http://localhost:8080/api/v1/recipe/getRecipeByLabDip/${encodeURIComponent(
        labDip
      )}`,
      success: function (response) {
        if (response.code === "00") {
          displayRecipe(response.content);
        } else {
          alert("No recipe found for this Lab Dip");
          clearRecipeDetails();
        }
      },
      error: function (xhr, exception) {
        console.error("Error occurred: " + xhr.status + " - " + xhr.statusText);
      },
    });
  }

  function displayRecipe(recipe) {
    $("#reciNo").val(recipe.reciNo);
    $("#color").val(recipe.color);
    $("#labDip").val(recipe.labDip);
    $("#roleCount").val(recipe.roleCount);
    $("#weight").val(recipe.weight);
    $("#liquorRatio").val(recipe.liquorRatio);
    $("#volume").val(recipe.volume);

    let tableBody = $("#processTableBody");
    tableBody.empty(); // Clear existing rows
    recipe.recipeDetails.forEach((detail) => {
      tableBody.append(`
              <tr>
                  <td>${detail.addFunction}</td>
                  <td>${detail.productName}</td>
                  <td>${detail.dose}</td>
                  <td>${detail.temp}</td>
                  <td>${detail.time}</td>
                  <td>${detail.quantityInGrams}</td>
              </tr>
          `);
    });
  }

  function clearRecipeDetails() {
    $("#reciNo").val("");
    $("#color").val("");
    $("#labDip").val("");
    $("#roleCount").val("");
    $("#weight").val("");
    $("#liquorRatio").val("");
    $("#volume").val("");
    $("#processTableBody").empty();
  }
});
