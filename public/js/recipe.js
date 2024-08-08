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

// function updateRow() {
//   // Get the selected row
//   const selectedRow = document.querySelector("tr.selected");

//   if (!selectedRow) {
//     alert("Please select a row to update.");
//     return;
//   }

//   // Get values from input fields
//   const functionValue = document.getElementById("function").value;
//   const productValue = document.getElementById("product").value;
//   const doseValue = document.getElementById("dose").value;
//   const tempValue = document.getElementById("temp").value;
//   const timeValue = document.getElementById("time").value;
//   const amtsInGramsValue = document.getElementById("amtsInGrams").value;

//   // Update the selected row with the new values
//   const cells = selectedRow.getElementsByTagName("td");
//   cells[0].textContent = functionValue;
//   cells[1].textContent = productValue;
//   cells[2].textContent = doseValue;
//   cells[3].textContent = tempValue;
//   cells[4].textContent = timeValue;
//   cells[5].textContent = amtsInGramsValue;
// }
function updateRow() {
  // Get the selected row
  const selectedRow = document.querySelector("tr.selected");

  if (!selectedRow) {
    alert("Please select a row to update.");
    return;
  }

  // Get values from input fields
  const functionValue = document.getElementById("function").value;
  const productValue = document.getElementById("product").value;
  const doseValue = parseFloat(document.getElementById("dose").value); // Ensure it's a number
  const tempValue = document.getElementById("temp").value;
  const timeValue = document.getElementById("time").value;
  
  // Fetch product type and calculate amtsInGrams
  let amtsInGramsValue;
  let weight = $("#weight").val();
  let volume = $("#volume").val();

  $.ajax({
    method: "GET",
    url: "http://localhost:8080/api/v1/product/getProductType?productName=" + encodeURIComponent(productValue),
    success: function (response) {
      if (response.code === "00" && response.content && response.content.productType) {
        const productType = response.content.productType;

        // Calculate amtsInGrams based on product type
        if (productType === "Dye") {
          amtsInGramsValue = doseValue * weight * 10;
        } else if (productType === "Chemical") {
          amtsInGramsValue = doseValue * volume;
        } else {
          amtsInGramsValue = 0; // Default value if type is unknown
        }
        // Format amtsInGramsValue to 2 decimal places
        amtsInGramsValue = amtsInGramsValue.toFixed(2);

        // Update the selected row with the new values
        const cells = selectedRow.getElementsByTagName("td");
        cells[0].textContent = functionValue;
        cells[1].textContent = productValue;
        cells[2].textContent = doseValue;
        cells[3].textContent = tempValue;
        cells[4].textContent = timeValue;
        cells[5].textContent = amtsInGramsValue;

        // Set the updated value in the amtsInGrams input field
        document.getElementById("amtsInGrams").value = amtsInGramsValue;
      } else {
        console.error("Error fetching product type:", response);
        alert("Error fetching product type or product type is undefined");
      }
    },
    error: function (xhr, exception) {
      console.error("Error fetching product type: " + xhr.status + " - " + xhr.statusText);
      alert("Error fetching product type");
    }
  });
}


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

        // format the value to 2 decimal places
        amtsInGramsValue = amtsInGramsValue.toFixed(2);

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

//Assuming clearFields function clears input fields
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

// function addSpaceRow() {
//   // Create a new row
//   const tableBody = document.getElementById("processTableBody");
//   const newRow = document.createElement("tr");

//   // Add empty cells to the new row
//   newRow.innerHTML = `
//     <td colspan="6"></td>
//   `;

//   // Update the selected row with the new values
//   const cells = selectedRow.getElementsByTagName("td");
//   cells[0].textContent = "";
//   cells[1].textContent = "";
//   cells[2].textContent = "";
//   cells[3].textContent = "";
//   cells[4].textContent = "";
//   cells[5].textContent = "";

//   // Add the new row to the table
//   tableBody.appendChild(newRow);
// }
function addSpaceRow() {
  // Get the table body and create a new row
  const tableBody = document.getElementById("processTableBody");
  const newRow = document.createElement("tr");

  // Add empty cells to the new row
  newRow.innerHTML = `
    <td colspan="6"></td>
  `;

  // Add the new row to the table
  tableBody.appendChild(newRow);
}

function addRowAbove() {
  // Get the table body and selected row
  const tableBody = document.getElementById("processTableBody");
  const selectedRow = document.querySelector(".selected");

  if (selectedRow) {
    // Create a new row and insert it above the selected row
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td colspan="6"></td>
    `;
    tableBody.insertBefore(newRow, selectedRow);
  }
}

function addRowBelow() {
  // Get the table body and selected row
  const tableBody = document.getElementById("processTableBody");
  const selectedRow = document.querySelector(".selected");

  if (selectedRow) {
    // Create a new row and insert it below the selected row
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td colspan="6"></td>
    `;
    tableBody.insertBefore(newRow, selectedRow.nextSibling);
  }
}

function deleteSelectedRow() {
  // Get the selected row and its parent (table body)
  const selectedRow = document.querySelector(".selected");

  if (selectedRow) {
    selectedRow.remove();
  }
}

//Save the recipe

function saveRecipe() {
  // Retrieve values from the form
  let reciNo = $("#reciNo").val();
  let grn = $("#grn").val();
  let rpDate = $("#rp_date").val();
  let machineNo = $("#machineNo").val();
  let rpTime = $("#rp_time").val();
  let labDip = $("#labDip").val().toUpperCase();
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
      productName: cells.eq(1).text(),
      //productId: productId,  // Assuming this is the correct index for productId
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

// // These are not valid Methods

// // Function to fetch product ID by name
// function getProductIdByName(productName) {
//   console.log(`Fetching product ID for name: ${productName}`);
//   return $.ajax({
//     method: "GET",
//     url: `http://localhost:8080/api/v1/product/getProductByProductName/${encodeURIComponent(productName)}`,
//     dataType: "json"
//   }).then(function (response) {
//     if (response.code === "00" && response.content) {
//       console.log(`API Response: ${JSON.stringify(response)}`);
//       // Log the product name and ID to the console
//       console.log(productName, response.content.productId);

//       return response.content.productId; // Adjust based on your DTO
//     } else {
//       console.error(`Product not found for name: ${productName}`);
//       return null;
//     }
//   }).catch(function (error) {
//     console.error("Error fetching product ID:", error);
//     return null;
//   });
// }

// // Function to save a recipe
// async function saveRecipe() {
//   // Retrieve values from the form
//   let reciNo = $("#reciNo").val();
//   let grn = $("#grn").val();
//   let rpDate = $("#rp_date").val();
//   let machineNo = $("#machineNo").val();
//   let rpTime = $("#rp_time").val();
//   let labDip = $("#labDip").val();
//   let color = $("#color").val();
//   let fabric = $("#fabric").val();
//   let weight = $("#weight").val();
//   let liquorRatio = $("#liquorRatio").val();
//   let volume = $("#volume").val();
//   let roleCount = $("#roleCount").val();

//   // Collect the rows of the table
//   let tableRows = [];
//   let rowPromises = [];

//   $("#processTableBody tr").each(function () {
//     let cells = $(this).find("td");
//     let productName = cells.eq(1).text(); // Assuming productName is in the second column

//     if (productName.trim() === "") {
//       console.warn("Skipping row with empty product name");
//       return; // Skip rows with empty product names
//     }

//     // Fetch product ID
//     let rowPromise = getProductIdByName(productName).then(function (productId) {
//       // Log the product ID to the console
//       console.log(`Product ID for ${productName}: ${productId}`);
//       if (productId) {
//         tableRows.push({
//           addFunction: cells.eq(0).text(),
//           productId: productId, // Use the productId
//           dose: cells.eq(2).text(),
//           temp: cells.eq(3).text(),
//           time: cells.eq(4).text(),
//           quantityInGrams: cells.eq(5).text(),
//         });
//       } else {
//         console.warn(`Skipping row with product name: ${productName} due to invalid product ID`);
//       }
//     });
//     rowPromises.push(rowPromise);
//   });

//   // Wait for all promises to resolve
//   await Promise.all(rowPromises);

//   // Prepare data for the request
//   let recipeData = {
//     reciNo: reciNo,
//     color: color,
//     labDip: labDip,
//     roleCount: roleCount,
//     weight: weight,
//     liquorRatio: liquorRatio,
//     volume: volume,
//     createdUser: "user123", // Assuming a static user or get from session
//     createdDateTime: new Date().toISOString(),
//     recipeDetails: tableRows,
//   };

//   // Log the data to the console to view the format
//   console.log(
//     "Data being sent to the server:",
//     JSON.stringify(recipeData, null, 2)
//   );

//   // Perform AJAX request
//   $.ajax({
//     method: "POST",
//     contentType: "application/json",
//     url: "http://localhost:8080/api/v1/recipe/saveRecipe",
//     data: JSON.stringify(recipeData),
//     success: function (data) {
//       alert("Recipe saved successfully");
//       clearFields();
//       $("#processTableBody").empty();
//     },
//     error: function (xhr, exception) {
//       alert("Error saving recipe: " + xhr.responseText);
//       console.error("Error details:", exception); // Log response text for debugging
//     },
//   });
// }

// const productIdCache = {}; // Cache for storing product IDs

// function getProductIdByName(productName) {
//   if (productIdCache[productName]) {
//     console.log(`Using cached product ID for name: ${productName}`);
//     return Promise.resolve(productIdCache[productName]);
//   }

//   console.log(`Fetching product ID for name: ${productName}`);
//   return $.ajax({
//     method: "GET",
//     url: `http://localhost:8080/api/v1/product/getProductByProductName/${encodeURIComponent(productName)}`,
//     dataType: "json"
//   }).then(function (response) {
//     if (response.code === "00" && response.content) {
//       console.log(`API Response: ${JSON.stringify(response)}`);
//       console.log(productName, response.content.productId);

//       // Cache the product ID
//       productIdCache[productName] = response.content.productId;
//       return response.content.productId;
//     } else {
//       console.error(`Product not found for name: ${productName}`);
//       return null;
//     }
//   }).catch(function (error) {
//     console.error("Error fetching product ID:", error);
//     return null;
//   });
// }

// // Function to save a recipe
// async function saveRecipe() {
//   let reciNo = $("#reciNo").val();
//   let grn = $("#grn").val();
//   let rpDate = $("#rp_date").val();
//   let machineNo = $("#machineNo").val();
//   let rpTime = $("#rp_time").val();
//   let labDip = $("#labDip").val();
//   let color = $("#color").val();
//   let fabric = $("#fabric").val();
//   let weight = $("#weight").val();
//   let liquorRatio = $("#liquorRatio").val();
//   let volume = $("#volume").val();
//   let roleCount = $("#roleCount").val();

//   let tableRows = [];
//   let rowPromises = [];

//   $("#processTableBody tr").each(function () {
//     let cells = $(this).find("td");
//     let productName = cells.eq(1).text(); // Assuming productName is in the second column

//     if (productName.trim() === "") {
//       console.warn("Skipping row with empty product name");
//       return; // Skip rows with empty product names
//     }

//     let rowPromise = getProductIdByName(productName).then(function (productId) {
//       console.log(`Product ID for ${productName}: ${productId}`);
//       if (productId) {
//         tableRows.push({
//           addFunction: cells.eq(0).text(),
//           productId: productId,
//           dose: cells.eq(2).text(),
//           temp: cells.eq(3).text(),
//           time: cells.eq(4).text(),
//           quantityInGrams: cells.eq(5).text(),
//         });
//       } else {
//         console.warn(`Skipping row with product name: ${productName} due to invalid product ID`);
//       }
//     });
//     rowPromises.push(rowPromise);
//   });

//   await Promise.all(rowPromises);

//   let recipeData = {
//     reciNo: reciNo,
//     color: color,
//     labDip: labDip,
//     roleCount: roleCount,
//     weight: weight,
//     liquorRatio: liquorRatio,
//     volume: volume,
//     createdUser: "user123",
//     createdDateTime: new Date().toISOString(),
//     recipeDetails: tableRows,
//   };

//   console.log("Data being sent to the server:", JSON.stringify(recipeData, null, 2));

//   $.ajax({
//     method: "POST",
//     contentType: "application/json",
//     url: "http://localhost:8080/api/v1/recipe/saveRecipe",
//     data: JSON.stringify(recipeData),
//     success: function (data) {
//       alert("Recipe saved successfully");
//       clearFields();
//       $("#processTableBody").empty();
//     },
//     error: function (xhr, exception) {
//       alert("Error saving recipe: " + xhr.responseText);
//       console.error("Error details:", exception);
//     },
//   });
// }

//Load all labdips to the textbox
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

// Function to print the recipe
// function printRecipe() {
//   // Create a style element for print-specific styles
//   const printStyle = document.createElement("style");
//   printStyle.id = "printStyle";
//   printStyle.innerHTML = `
//     @media print {
//       /* Hide all buttons and fields */
//       .btn,
//       .btn-group,

//       #function,
//       #product,
//       #dose,
//       #temp,
//       #time,
//       #amtsInGrams,
//       #new_recipe_section > .form-section > .row > .col-md-3:not(:last-child) {
//         display: none; /* Hide specified fields and some labels */
//       }

//       /* Ensure the table is fully visible and well formatted */
//       #processTable,
//       #processTableBody {
//         display: table;
//         width: 100%;
//       }

//       #processTable th,
//       #processTable td {
//         border: 1px solid #000;
//         padding: 5px;
//         text-align: left;
//       }

//       /* Ensure the table takes up most of the page */
//       @page {
//         size: auto;
//         margin: 0.5in;
//       }

//       body {
//         margin: 0;
//         padding: 0;
//       }
//     }
//   `;

//   // Append the style element to the head of the document
//   document.head.appendChild(printStyle);

//   // Trigger the print dialog
//   window.print();

//   // Remove the style element after printing
//   setTimeout(() => {
//     const style = document.getElementById("printStyle");
//     if (style) {
//       style.remove();
//     }
//   }, 1000);
// }

//Print the recipe 1
// function printRecipe() {
//   // Create a style element for print-specific styles
//   const printStyle = document.createElement("style");
//   printStyle.id = "printStyle";
//   printStyle.innerHTML = `
//     @media print {
//       /* Hide all buttons and fields */
//       .btn,
//       .btn-group,
//       #function,
//       #product,
//       #dose,
//       #temp,
//       #time,
//       #amtsInGrams,
//       #new_recipe_section > .form-section > .row > .col-md-3:not(:last-child),
//       .form-label-inset { /* Hide form-label-inset class */
//         display: none; /* Hide specified fields and some labels */
//       }

//       // /* Ensure the table is fully visible and well formatted */
//       // #processTable,
//       // #processTableBody {
//       //   display: table;
//       //   width: 100%;
//       // }

//       #processTable th,
//       #processTable td {
//         border: 1px solid #000;
//         padding: 5px;
//         text-align: left;
//       }

//       /* Ensure the table takes up most of the page */
//       @page {
//         size: auto;
//         margin: 0.5in;
//       }

//       body {
//         margin: 0;
//         padding: 0;
//       }
//     }
//   `;

// method 2
// function printRecipe() {
//   // Create a style element for print-specific styles
//   const printStyle = document.createElement("style");
//   printStyle.id = "printStyle";
//   printStyle.innerHTML = `
//     @media print {
//       /* Hide non-printable elements */
//       .btn,
//       .btn-group,
//       #function,
//       #product,
//       #dose,
//       #temp,
//       #time,
//       #amtsInGrams,
//       #new_recipe_section > .form-section > .row > .col-md-3:not(:last-child),
//       .form-label-inset { /* Hide specified fields and some labels */
//         display: none;
//       }

//       /* Ensure the table is fully visible and well formatted */
//       #processTable {
//         width: 100%;
//         border-collapse: collapse;
//       }

//       #processTable th,
//       #processTable td {
//         border: 1px solid #000;
//         padding: 5px;
//         text-align: left;
//       }

//       /* Ensure the table takes up most of the page */
//       @page {
//         size: auto;
//         margin: 0.5in;
//       }

//       body {
//         margin: 0;
//         padding: 0;
//       }

//       /* Handle page breaks */
//       #processTable {
//         page-break-inside: auto;
//       }

//       #processTable tr {
//         page-break-inside: avoid;
//         page-break-after: auto;
//       }

//       /* Make sure headers repeat on each page */
//       thead { display: table-header-group; }
//       tfoot { display: table-footer-group; }
//     }
//   `;

//   // Append the style element to the head of the document
//   document.head.appendChild(printStyle);

//   // Trigger the print dialog
//   window.print();

//   // Remove the style element after printing
//   setTimeout(() => {
//     const style = document.getElementById("printStyle");
//     if (style) {
//       style.remove();
//     }
//   }, 1000);
// }

// function printRecipe() {
//   // Create a style element for print-specific styles
//   const printStyle = document.createElement("style");
//   printStyle.id = "printStyle";
//   printStyle.innerHTML = `
//     @media print {
//       body {
//         background-color: white; /* Print-friendly background color */
//         color: black; /* Ensure text is legible in print */
//         width: auto; /* Ensure body width is auto for printing */
//         height: auto; /* Ensure body height is auto for printing */
//         margin: 0; /* Remove margins */
//       }

//       /* Hide elements not needed in print */
//       .no-print {
//         display: none;
//       }

//       /* Ensure the printable section is visible */
//       #new_recipe_section {
//         position: static; /* Remove fixed position for print */
//         width: auto; /* Ensure width is auto for printing */
//         height: auto; /* Ensure height is auto for printing */
//         background-color: #fae2fc; /* Background color for print */
//         overflow: visible; /* Ensure overflow is visible */
//         padding: 20px; /* Add some padding */
//         box-shadow: none; /* Remove box-shadow for print */
//       }

//       /* Adjust table styling for print */
//       .table-container, .table-section {
//         max-height: none; /* Remove max-height restriction for print */
//         overflow: visible; /* Ensure overflow is visible */
//       }

//       /* Page breaks */
//       @page {
//         margin: 0.5in; /* Set margins for print pages */
//       }

//       .page-break {
//         page-break-before: always; /* Force a new page */
//       }
//     }
//   `;

//   // Append the style element to the head of the document
//   document.head.appendChild(printStyle);

//   // Trigger the print dialog
//   window.print();

//   // Remove the style element after printing
//   setTimeout(() => {
//     const style = document.getElementById("printStyle");
//     if (style) {
//       style.remove();
//     }
//   }, 1000);
// }








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

// $(document).ready(function () {

//   // Bind the click event of the search button
//   $("#searchButton").on("click", function () {
//     let labDip = $("#labDip").val();
//     if (labDip.length >= 2) {
//       // Trigger search when at least 2 characters are entered
//       searchRecipeByLabDip(labDip);
//     } else {
//       alert("Please enter at least 2 characters for lab dip.");
//     }
//   });

//   function searchRecipeByLabDip(labDip) {
//     $.ajax({
//       method: "GET",
//       contentType: "application/json",
//       url: `http://localhost:8080/api/v1/recipe/getRecipeByLabDip/${encodeURIComponent(labDip)}`,
//       success: function (response) {
//         if (response.code === "00") {
//           displayRecipe(response.content);
//         } else {
//           alert("No recipe found for this Lab Dip");
//           clearRecipeDetails();
//         }
//       },
//       error: function (xhr, exception) {
//         console.error("Error occurred: " + xhr.status + " - " + xhr.statusText);
//       },
//     });
//   }

//   async function getProductNameById(productId) {
//     if (!productId) {
//       console.error("Product ID is undefined or empty.");
//       return null;
//     }

//     return $.ajax({
//       method: "GET",
//       url: `http://localhost:8080/api/v1/product/getProductByProductId/${productId}`,
//       dataType: "json"
//     }).then(function (response) {
//       if (response.code === "00" && response.content) {
//         return response.content.productName; // Adjust based on your DTO
//       } else {
//         console.error(`Product not found for ID: ${productId}`);
//         return null;
//       }
//     }).catch(function (error) {
//       console.error("Error fetching product name:", error);
//       return null;
//     });
//   }

//   async function displayRecipe(recipe) {
//     $("#reciNo").val(recipe.reciNo);
//     $("#color").val(recipe.color);
//     $("#labDip").val(recipe.labDip);
//     $("#roleCount").val(recipe.roleCount);
//     $("#weight").val(recipe.weight);
//     $("#liquorRatio").val(recipe.liquorRatio);
//     $("#volume").val(recipe.volume);

//     let tableBody = $("#processTableBody");
//     tableBody.empty(); // Clear existing rows

//     let rowPromises = recipe.recipeDetails.map(async (detail) => {
//       // Fetch product name by productId
//       let productName = await getProductNameById(detail.productId);

//       // Append row to the table
//       tableBody.append(`
//         <tr>
//           <td>${detail.addFunction}</td>
//           <td>${productName || 'Unknown'}</td> <!-- Display product name or 'Unknown' if not found -->
//           <td>${detail.dose}</td>
//           <td>${detail.temp}</td>
//           <td>${detail.time}</td>
//           <td>${detail.quantityInGrams}</td>
//         </tr>
//       `);
//     });

//     // Wait for all rows to be appended
//     await Promise.all(rowPromises);
//   }

//   function clearRecipeDetails() {
//     $("#reciNo").val("");
//     $("#color").val("");
//     $("#labDip").val("");
//     $("#roleCount").val("");
//     $("#weight").val("");
//     $("#liquorRatio").val("");
//     $("#volume").val("");
//     $("#processTableBody").empty();
//   }
// });

// function clearFields() {
//   // Clear input fields except date and time
//   const inputs = document.querySelectorAll('#new_recipe_section input');
//   inputs.forEach(input => {
//     if (input.type !== 'date' && input.type !== 'time') {
//       input.value = '';
//     }
//   });

//   // Clear select fields
//   const selects = document.querySelectorAll('#new_recipe_section select');
//   selects.forEach(select => select.value = '');

//   // Clear table rows
//   const tableBody = document.querySelector('#processTableBody');
//   if (tableBody) {
//     tableBody.innerHTML = ''; // This removes all rows from the table
//   } else {
//     console.error('Table body not found');
//   }
// }

// Function to update the amounts in grams for all rows
function updateAmtsInGrams() {
  // Get values from input fields
  const weight = parseFloat(document.getElementById("weight").value) || 0;
  const volume = parseFloat(document.getElementById("volume").value) || 0;

  // Get all table rows
  const tableRows = document.querySelectorAll("#processTableBody tr");

  // Loop through each row and update the amtsInGrams column
  tableRows.forEach((row) => {
    const productCell = row.cells[1]; // Product column
    const doseCell = row.cells[2]; // Dose column
    const amtsInGramsCell = row.cells[5]; // Amt in grams column

    const productValue = productCell.textContent;
    const doseValue = parseFloat(doseCell.textContent) || 0;

    // Fetch product type
    $.ajax({
      method: "GET",
      url:
        "http://localhost:8080/api/v1/product/getProductType?productName=" +
        encodeURIComponent(productValue),
      success: function (response) {
        if (
          response.code === "00" &&
          response.content &&
          response.content.productType
        ) {
          const productType = response.content.productType;

          let amtsInGramsValue;

          // Calculate amtsInGrams based on product type
          if (productType === "Dye") {
            amtsInGramsValue = doseValue * weight * 10;
          } else if (productType === "Chemical") {
            amtsInGramsValue = doseValue * volume;
          } else {
            amtsInGramsValue = 0; // Default value if type is unknown
          }

          // Update the amtsInGrams cell
          amtsInGramsCell.textContent = amtsInGramsValue.toFixed(2); // Rounded to 2 decimal places
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
  });
}

// Attach event listeners to input fields
document.getElementById("weight").addEventListener("input", updateAmtsInGrams);
document.getElementById("volume").addEventListener("input", updateAmtsInGrams);





  function clearFields2() {
    // Clear all input fields except date and time
    document.querySelectorAll('.form-control').forEach(input => {
      if (input.type !== 'date' && input.type !== 'time') {
        input.value = '';
      }
    });

    // Clear the table body
    document.getElementById('processTableBody').innerHTML = '';

    // Optional: Clear the datalist options if needed
    document.getElementById('labDipSuggestions').innerHTML = '';
    document.getElementById('productSuggestions').innerHTML = '';
  }

