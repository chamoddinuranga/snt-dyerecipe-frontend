// $(document).ready(function () {
//   // Load products when the user types in the product field
//   $("#product").on("input", function () {
//     let query = $(this).val();
//     if (query.length >= 2) {
//       // Trigger search when at least 2 characters are entered
//       loadProductSuggestions(query);
//     }
//   });

//   // Function to load product suggestions
//   function loadProductSuggestions(query) {
//     $.ajax({
//       method: "GET",
//       contentType: "application/json",
//       url:
//         "http://192.168.8.102:8080/api/v1/product/searchProducts?query=" +
//         encodeURIComponent(query),
//       success: function (response) {
//         if (response.code === "00") {
//           let suggestions = response.content;
//           let datalist = $("#productSuggestions");
//           datalist.empty(); // Clear previous suggestions
//           for (let product of suggestions) {
//             datalist.append(`<option value="${product.productName}">`);
//           }
//         }
//       },
//       error: function (xhr, exception) {
//         console.error("Error occurred: " + xhr.status + " - " + xhr.statusText);
//       },
//     });
//   }
// });

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
//   A;
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

// function addRow() {
//   // Get values from input fields
//   const functionValue = document.getElementById("function").value;
//   const productValue = document.getElementById("product").value;
//   const doseValue = parseFloat(document.getElementById("dose").value); // Ensure it's a number
//   const tempValue = document.getElementById("temp").value;
//   const timeValue = document.getElementById("time").value;

//   // Determine product type and calculate amtsInGrams
//   let amtsInGramsValue;
//   let weight = $("#weight").val();
//   let volume = $("#volume").val();

//   // Fetch product type
//   $.ajax({
//     method: "GET",
//     url:
//       "http://192.168.8.102:8080/api/v1/product/getProductType?productName=" +
//       encodeURIComponent(productValue),
//     success: function (response) {
//       // Check if the response is as expected
//       console.log("API Response:", response);

//       if (
//         response.code === "00" &&
//         response.content &&
//         response.content.productType
//       ) {
//         const productType = response.content.productType;
//         console.log("Product type:", productType);

//         // Calculate amtsInGrams based on product type
//         if (productType === "Dye") {
//           amtsInGramsValue = doseValue * weight * 10;
//         } else if (productType === "Chemical") {
//           amtsInGramsValue = doseValue * volume;
//         } else {
//           amtsInGramsValue = 0; // Default value if type is unknown
//         }

//         // Create a new row
//         const tableBody = document.getElementById("processTableBody");
//         const newRow = document.createElement("tr");
//         newRow.innerHTML = `
//             <td>${functionValue}</td>
//             <td>${productValue}</td>
//             <td>${doseValue}</td>
//             <td>${tempValue}</td>
//             <td>${timeValue}</td>
//             <td>${amtsInGramsValue}</td>
//           `;

//         // Add the new row to the table
//         tableBody.appendChild(newRow);

//         // Clear input fields
//         clearFields();
//       } else {
//         console.error("Error fetching product type:", response);
//         alert("Error fetching product type or product type is undefined");
//       }
//     },
//     error: function (xhr, exception) {
//       console.error(
//         "Error fetching product type: " + xhr.status + " - " + xhr.statusText
//       );
//       alert("Error fetching product type");
//     },
//   });
// }

// // Assuming clearFields function clears input fields
// function clearFields() {
//   document.getElementById("function").value = "";
//   document.getElementById("product").value = "";
//   document.getElementById("dose").value = "";
//   document.getElementById("temp").value = "";
//   document.getElementById("time").value = "";
// }

// function moveRow(direction) {
//   const tableBody = document.getElementById("processTableBody");
//   const selectedRow = document.querySelector("tr.selected");

//   if (!selectedRow) {
//     alert("Please select a row to move.");
//     return;
//   }

//   const rows = Array.from(tableBody.getElementsByTagName("tr"));
//   const index = rows.indexOf(selectedRow);

//   if (direction === "up" && index > 0) {
//     tableBody.insertBefore(selectedRow, rows[index - 1]);
//   } else if (direction === "down" && index < rows.length - 1) {
//     tableBody.insertBefore(selectedRow, rows[index + 2] || null);
//   }
// }

// function deleteSelectedRow() {
//   const selectedRow = document.querySelector("tr.selected");

//   if (!selectedRow) {
//     alert("Please select a row to delete.");
//     return;
//   }

//   selectedRow.remove();
// }

// function clearFields() {
//   document.getElementById("function").value = "";
//   document.getElementById("product").value = "";
//   document.getElementById("dose").value = "";
//   document.getElementById("temp").value = "";
//   document.getElementById("time").value = "";
//   document.getElementById("amtsInGrams").value = "";
// }

// // Add event listener to table rows for selection
// document
//   .getElementById("processTableBody")
//   .addEventListener("click", function (e) {
//     if (e.target.tagName === "TD") {
//       const row = e.target.parentNode;
//       const previouslySelected = document.querySelector("tr.selected");

//       if (previouslySelected) {
//         previouslySelected.classList.remove("selected");
//       }

//       row.classList.add("selected");

//       // Load row values into input fields
//       const cells = row.getElementsByTagName("td");
//       document.getElementById("function").value = cells[0].textContent;
//       document.getElementById("product").value = cells[1].textContent;
//       document.getElementById("dose").value = cells[2].textContent;
//       document.getElementById("temp").value = cells[3].textContent;
//       document.getElementById("time").value = cells[4].textContent;
//       document.getElementById("amtsInGrams").value = cells[5].textContent;
//     }
//   });

// // Event listener for Enter key to trigger button actions
// document.addEventListener("keydown", function (e) {
//   if (e.key === "Enter") {
//     const activeElement = document.activeElement;

//     if (
//       activeElement.id === "function" ||
//       activeElement.id === "product" ||
//       activeElement.id === "dose" ||
//       activeElement.id === "temp" ||
//       activeElement.id === "time" ||
//       activeElement.id === "amtsInGrams"
//     ) {
//       e.preventDefault(); // Prevent default form submission

//       // Simulate clicking the ADD button
//       document.querySelector(".btn-group .btn-info").click();
//     }
//   }
// });
