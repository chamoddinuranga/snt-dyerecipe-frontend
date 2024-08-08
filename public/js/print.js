// // 3rd
// function printRecipe() {
//   // Create a style element for print-specific styles
//   const printStyle = document.createElement("style");
//   printStyle.id = "printStyle";
//   printStyle.innerHTML = `
//           @media print {
//             body {
//               background-color: purple;
//       color: black;
//       height: auto;
//             }

//             /* Hide elements not needed in print */
//             .no-print,
//             .btn,
//             .btn-group,
//             #function,
//             #product,
//             #dose,
//             #temp,
//             #time,
//             #amtsInGrams,
//             #new_recipe_section > .form-section > .row > .col-md-3:not(:last-child),
//             .form-label-inset {
//               display: none; /* Hide specified fields and labels */
//             }

//             /* Container for horizontal fixation */
//             .print-container {
//             border: 1px solid black;
//               position: relative; /* Fix the container horizontally */
//               max-width: 1000px; /* Ensure the container fits within the page */
//               top: 0; /* Adjust as needed for vertical position */
//               left: 0; /* Full width of the page */
//               right: 0; /* Full width of the page */
//               background-color: green; /* Ensure background color */
//               padding: 0; /* Remove padding */
//               box-sizing: border-box; /* Include padding and border in the element's total width and height */
//               overflow: hidden; /* Hide overflow */
//             }

//             /* Ensure the printable section is visible and fits horizontally */
//             #new_recipe_section {
//             background-color: red;
//               position: relative; /* Relative position within the fixed container */
//               width: 100%; /* Full width of the container */
//               height: auto; /* Adjust height based on content */
//               background-color: #fae2fc; /* Background color for print */
//               overflow: auto; /* Manage overflow */
//               padding: 20px; /* Add some padding */
//               box-shadow: none; /* Remove box-shadow for print */
//               margin: 0; /* Remove margin */
//               box-sizing: border-box; /* Include padding and border in the element's total width and height */
//             }

//             /* Adjust table styling for print */
//             .table-container,
//             .table-section {
//               max-height: none; /* Remove max-height restriction for print */
//               overflow: auto; /* Ensure overflow is managed */
//             }

//             /* Page breaks */
//             @page {
//               margin: 0; /* Remove margins for print pages */
//             }

//             .page-break {
//               page-break-before: always; /* Force a new page */
//             }
//           }
//         `;

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
///////////////////////////////////////
// // JavaScript Function
// function printRecipe() {
//   // Change labels before printing
//   const originalLabels = {};
//   const labelsToChange = {
//     function: "Load Date",
//     product: "Load Time",
//     dose: "Unload Date",
//     temp: "Unload Time",
//     time: "Operat",
//   };

//   Object.keys(labelsToChange).forEach((id) => {
//     const label = document.querySelector(`label[for=${id}]`);
//     if (label) {
//       originalLabels[id] = label.innerHTML;
//       label.innerHTML = labelsToChange[id];
//     }
//   });

//   // Create a style element for print-specific styles
//   const printStyle = document.createElement("style");
//   printStyle.id = "printStyle";
//   printStyle.innerHTML = `
//       @media print {
//         body {
//           background-color: purple; 
//           color: black;
//           height: auto;
//         }
  
//         /* Hide elements not needed in print */
        
//         .btn,
//         .btn-group,
//         #function,
//         #product,
//         #dose,
//         #temp,
//         #time,
//         #amtsInGrams,
//         #new_recipe_section > .form-section > .row > .col-md-3:not(:last-child),
//          .form-label-inset {
//            display: none; /* Hide specified fields and labels */
//          }
  
//         /* Container for horizontal fixation */
//         .print-container {
//           border: 1px solid black;
//           position: relative; /* Fix the container horizontally */
//           max-width: 1000px; /* Ensure the container fits within the page */
//           top: 0; /* Adjust as needed for vertical position */
//           left: 0; /* Full width of the page */
//           right: 0; /* Full width of the page */
//           background-color: green; /* Ensure background color */
//           padding: 0; /* Remove padding */
//           box-sizing: border-box; /* Include padding and border in the element's total width and height */
//           overflow: hidden; /* Hide overflow */
//         }
  
//         /* Ensure the printable section is visible and fits horizontally */
//         #new_recipe_section {
//           background-color: red;
//           position: relative; /* Relative position within the fixed container */
//           width: 100%; /* Full width of the container */
//           height: auto; /* Adjust height based on content */
//           background-color: #fae2fc; /* Background color for print */
//           overflow: auto; /* Manage overflow */
//           padding: 20px; /* Add some padding */
//           box-shadow: none; /* Remove box-shadow for print */
//           margin: 0; /* Remove margin */
//           box-sizing: border-box; /* Include padding and border in the element's total width and height */
//         }
  
//         /* Adjust table styling for print */
//         .table-container,
//         .table-section {
//           max-height: none; /* Remove max-height restriction for print */
//           overflow: auto; /* Ensure overflow is managed */
//         }
  
//         /* Page breaks */
//         @page {
//           margin: 0; /* Remove margins for print pages */
//         }
  
//         .page-break {
//           page-break-before: always; /* Force a new page */
//         }
//       }
//     `;

//   // Append the style element to the head of the document
//   document.head.appendChild(printStyle);

//   // Trigger the print dialog
//   window.print();

//   // Remove the style element and revert label text after printing
//   setTimeout(() => {
//     const style = document.getElementById("printStyle");
//     if (style) {
//       style.remove();
//     }

//     // Revert labels to original text
//     Object.keys(originalLabels).forEach((id) => {
//       const label = document.querySelector(`label[for=${id}]`);
//       if (label) {
//         label.innerHTML = originalLabels[id];
//       }
//     });
//   }, 1000);
// }



// function printRecipe() {
//     // Change labels before printing
//     const originalLabels = {};
//     const labelsToChange = {
//       'function': 'Load Date',
//       'product': 'Load Time',
//       'dose': 'Unload Date',
//       'temp': 'Unload Time',
//       'amtsInGrams': 'Macnine Operator',
//     };
  
//     // Store original placeholders and clear them
//     const originalPlaceholders = {};
//     const placeholdersToRemove = ['product', 'dose', 'temp', 'amtsInGrams'];
    
//     placeholdersToRemove.forEach(id => {
//       const input = document.getElementById(id);
//       if (input) {
//         originalPlaceholders[id] = input.placeholder;
//         input.placeholder = ''; // Clear the placeholder
//       }
//     });
  
//     Object.keys(labelsToChange).forEach(id => {
//       const label = document.querySelector(`label[for=${id}]`);
//       if (label) {
//         originalLabels[id] = label.innerHTML;
//         label.innerHTML = labelsToChange[id];
//       }
//     });
  
//     // Create a style element for print-specific styles
//     const printStyle = document.createElement("style");
//     printStyle.id = "printStyle";
//     printStyle.innerHTML = `
//       @media print {
//         body {
//           background-color: purple; 
//           color: black;
//           height: auto;
//         }
  
//         /* Hide elements not needed in print */
//         #timeRecipe,
//         #time,
//         .no-print,
//         .btn,
//         .btn-group,
//         #new_recipe_section > .form-section > .row > .col-md-3:not(:last-child) {
//           display: none; /* Hide specified fields and labels */
//         }
  
//         /* Container for horizontal fixation */
//         .print-container {
//           border: 1px solid black;
//           position: relative; /* Fix the container horizontally */
//           max-width: 1000px; /* Ensure the container fits within the page */
//           top: 0; /* Adjust as needed for vertical position */
//           left: 0; /* Full width of the page */
//           right: 0; /* Full width of the page */
//           background-color: green; /* Ensure background color */
//           padding: 0; /* Remove padding */
//           box-sizing: border-box; /* Include padding and border in the element's total width and height */
//           overflow: hidden; /* Hide overflow */
//         }
  
//         /* Ensure the printable section is visible and fits horizontally */
//         #new_recipe_section {
//           background-color: red;
//           position: relative; /* Relative position within the fixed container */
//           width: 100%; /* Full width of the container */
//           height: auto; /* Adjust height based on content */
//           background-color: #fae2fc; /* Background color for print */
//           overflow: auto; /* Manage overflow */
//           padding: 20px; /* Add some padding */
//           box-shadow: none; /* Remove box-shadow for print */
//           margin: 0; /* Remove margin */
//           box-sizing: border-box; /* Include padding and border in the element's total width and height */
//         }
  
//         /* Adjust table styling for print */
//         .table-container,
//         .table-section {
//           max-height: none; /* Remove max-height restriction for print */
//           overflow: auto; /* Ensure overflow is managed */
//         }
  
//         /* Page breaks */
//         @page {
//           margin: 0; /* Remove margins for print pages */
//         }
  
//         .page-break {
//           page-break-before: always; /* Force a new page */
//         }
//       }
//     `;
  
//     // Append the style element to the head of the document
//     document.head.appendChild(printStyle);
  
//     // Trigger the print dialog
//     window.print();
  
//     // Remove the style element and revert label text and placeholders after printing
//     setTimeout(() => {
//       const style = document.getElementById("printStyle");
//       if (style) {
//         style.remove();
//       }
  
//       // Revert labels to original text
//       Object.keys(originalLabels).forEach(id => {
//         const label = document.querySelector(`label[for=${id}]`);
//         if (label) {
//           label.innerHTML = originalLabels[id];
//         }
//       });
  
//       // Restore placeholders
//       placeholdersToRemove.forEach(id => {
//         const input = document.getElementById(id);
//         if (input) {
//           input.placeholder = originalPlaceholders[id];
//         }
//       });
//     }, 1000);
//   }
  
// function printRecipe() {
//     // Change labels before printing
//     const originalLabels = {};
//     const labelsToChange = {
//         'function': 'Load Date',
//         'product': 'Load Time',
//         'dose': 'Unload Date',
//         'temp': 'Unload Time',
//         'amtsInGrams': 'Machine Operator',
//     };

//     // Store original placeholders and clear them
//     const originalPlaceholders = {};
//     const placeholdersToRemove = ['product', 'dose', 'temp', 'amtsInGrams'];

//     placeholdersToRemove.forEach(id => {
//         const input = document.getElementById(id);
//         if (input) {
//             originalPlaceholders[id] = input.placeholder;
//             input.placeholder = ''; // Clear the placeholder
//         }
//     });

//     Object.keys(labelsToChange).forEach(id => {
//         const label = document.querySelector(`label[for=${id}]`);
//         if (label) {
//             originalLabels[id] = label.innerHTML;
//             label.innerHTML = labelsToChange[id];
//         }
//     });

//     // Create a style element for print-specific styles
//     const printStyle = document.createElement("style");
//     printStyle.id = "printStyle";
//     printStyle.innerHTML = `
//         @media print {
//             body {
//                 background-color: purple; 
//                 color: black;
//                 height: auto;
//             }

//             /* Hide elements not needed in print */
//             #timeRecipe,
//             #time,
//             .no-print,
//             .btn,
//             .btn-group,
//             #new_recipe_section > .form-section > .row > .col-md-3:not(:last-child) {
//                 display: none; /* Hide specified fields and labels */
//             }

//             /* Container for horizontal fixation */
//             .print-container {
//                 border: 1px solid black;
//                 position: relative; /* Fix the container horizontally */
//                 max-width: 1000px; /* Ensure the container fits within the page */
//                 top: 0; /* Adjust as needed for vertical position */
//                 left: 0; /* Full width of the page */
//                 right: 0; /* Full width of the page */
//                 background-color: green; /* Ensure background color */
//                 padding: 0; /* Remove padding */
//                 box-sizing: border-box; /* Include padding and border in the element's total width and height */
//                 overflow: hidden; /* Hide overflow */
//             }

//             /* Ensure the printable section is visible and fits horizontally */
//             #new_recipe_section {
//                 background-color: red;
//                 position: relative; /* Relative position within the fixed container */
//                 width: 100%; /* Full width of the container */
//                 height: auto; /* Adjust height based on content */
//                 background-color: #fae2fc; /* Background color for print */
//                 overflow: auto; /* Manage overflow */
//                 padding: 20px; /* Add some padding */
//                 box-shadow: none; /* Remove box-shadow for print */
//                 margin: 0; /* Remove margin */
//                 box-sizing: border-box; /* Include padding and border in the element's total width and height */
//             }

//             /* Adjust table styling for print */
//             .table-container,
//             .table-section {
//                 max-height: none; /* Remove max-height restriction for print */
//                 overflow: auto; /* Ensure overflow is managed */
//             }

//             /* Page breaks */
//             @page {
//                 margin: 0; /* Remove margins for print pages */
//             }

//             .page-break {
//                 page-break-before: always; /* Force a new page */
//             }

//             /* Add headers to the end of printout */
//             .print-end-headers {
//                 position: absolute;
//                 bottom: 0;
//                 left: 0;
//                 right: 0;
//                 text-align: center;
//                 background-color: #fae2fc;
//                 padding: 10px;
//                 box-shadow: none; /* Remove shadow for print */
//             }
//         }
//     `;

//     // Append the style element to the head of the document
//     document.head.appendChild(printStyle);

//     // Add headers to the end of the document for print
//     const printEndHeaders = document.createElement('div');
//     printEndHeaders.className = 'print-end-headers';
//     printEndHeaders.innerHTML = `
//         <h4>run</h4>
//         <h4>left</h4>
//     `;
//     document.body.appendChild(printEndHeaders);

//     // Trigger the print dialog
//     window.print();

//     // Remove the style element and revert label text and placeholders after printing
//     setTimeout(() => {
//         const style = document.getElementById("printStyle");
//         if (style) {
//             style.remove();
//         }

//         // Remove headers
//         const headers = document.querySelector('.print-end-headers');
//         if (headers) {
//             headers.remove();
//         }

//         // Revert labels to original text
//         Object.keys(originalLabels).forEach(id => {
//             const label = document.querySelector(`label[for=${id}]`);
//             if (label) {
//                 label.innerHTML = originalLabels[id];
//             }
//         });

//         // Restore placeholders
//         placeholdersToRemove.forEach(id => {
//             const input = document.getElementById(id);
//             if (input) {
//                 input.placeholder = originalPlaceholders[id];
//             }
//         });
//     }, 1000);
// }


// function printRecipe() {
//     // Change labels before printing
//     const originalLabels = {};
//     const labelsToChange = {
//         'function': 'Load Date',
//         'product': 'Load Time',
//         'dose': 'Unload Date',
//         'temp': 'Unload Time',
//         'amtsInGrams': 'Machine Operator',
//     };

//     // Store original placeholders and clear them
//     const originalPlaceholders = {};
//     const placeholdersToRemove = ['product', 'dose', 'temp', 'amtsInGrams'];

//     placeholdersToRemove.forEach(id => {
//         const input = document.getElementById(id);
//         if (input) {
//             originalPlaceholders[id] = input.placeholder;
//             input.placeholder = ''; // Clear the placeholder
//         }
//     });

//     Object.keys(labelsToChange).forEach(id => {
//         const label = document.querySelector(`label[for=${id}]`);
//         if (label) {
//             originalLabels[id] = label.innerHTML;
//             label.innerHTML = labelsToChange[id];
//         }
//     });

//     // Create a style element for print-specific styles
//     const printStyle = document.createElement("style");
//     printStyle.id = "printStyle";
//     printStyle.innerHTML = `
//         @media print {
//             body {
//                 background-color: purple; 
//                 color: black;
//                 height: auto;
//             }

//             /* Hide elements not needed in print */
//             #timeRecipe,
//             #time,
//             .no-print,
//             .btn,
//             .btn-group,
//             #new_recipe_section > .form-section > .row > .col-md-3:not(:last-child) {
//                 display: none; /* Hide specified fields and labels */
//             }

//             /* Container for horizontal fixation */
//             .print-container {
//                 border: 1px solid black;
//                 position: relative; /* Fix the container horizontally */
//                 max-width: 1000px; /* Ensure the container fits within the page */
//                 top: 0; /* Adjust as needed for vertical position */
//                 left: 0; /* Full width of the page */
//                 right: 0; /* Full width of the page */
//                 background-color: green; /* Ensure background color */
//                 padding: 0; /* Remove padding */
//                 box-sizing: border-box; /* Include padding and border in the element's total width and height */
//                 overflow: hidden; /* Hide overflow */
//             }

//             /* Ensure the printable section is visible and fits horizontally */
//             #new_recipe_section {
//                 background-color: red;
//                 position: relative; /* Relative position within the fixed container */
//                 width: 100%; /* Full width of the container */
//                 height: auto; /* Adjust height based on content */
//                 background-color: #fae2fc; /* Background color for print */
//                 overflow: auto; /* Manage overflow */
//                 padding: 20px; /* Add some padding */
//                 box-shadow: none; /* Remove box-shadow for print */
//                 margin: 0; /* Remove margin */
//                 box-sizing: border-box; /* Include padding and border in the element's total width and height */
//             }

//             /* Adjust table styling for print */
//             .table-container,
//             .table-section {
//                 max-height: none; /* Remove max-height restriction for print */
//                 overflow: auto; /* Ensure overflow is managed */
//             }

//             /* Page breaks */
//             @page {
//                 margin: 0; /* Remove margins for print pages */
//             }

//             .page-break {
//                 page-break-before: always; /* Force a new page */
//             }

//             /* Add headers to the end of printout in one row */
//             .print-end-headers {
//                 position: absolute;
//                 bottom: 0;
//                 left: 0;
//                 right: 0;
//                 text-align: center;
//                 background-color: #fae2fc;
//                 padding: 10px;
//                 display: flex;
//                 justify-content: space-around;
//                 box-shadow: none; /* Remove shadow for print */
//             }

//             .print-end-headers h4 {
//                 margin: 0;
//             }
//         }
//     `;

//     // Append the style element to the head of the document
//     document.head.appendChild(printStyle);

//     // Add headers to the end of the document for print
//     const printEndHeaders = document.createElement('div');
//     printEndHeaders.className = 'print-end-headers';
//     printEndHeaders.innerHTML = `
//         <h4>run</h4>
//         <h4>left</h4>
//     `;
//     document.body.appendChild(printEndHeaders);

//     // Trigger the print dialog
//     window.print();

//     // Remove the style element and revert label text and placeholders after printing
//     setTimeout(() => {
//         const style = document.getElementById("printStyle");
//         if (style) {
//             style.remove();
//         }

//         // Remove headers
//         const headers = document.querySelector('.print-end-headers');
//         if (headers) {
//             headers.remove();
//         }

//         // Revert labels to original text
//         Object.keys(originalLabels).forEach(id => {
//             const label = document.querySelector(`label[for=${id}]`);
//             if (label) {
//                 label.innerHTML = originalLabels[id];
//             }
//         });

//         // Restore placeholders
//         placeholdersToRemove.forEach(id => {
//             const input = document.getElementById(id);
//             if (input) {
//                 input.placeholder = originalPlaceholders[id];
//             }
//         });
//     }, 1000);
// }


// function printRecipe() {
//     // Change labels before printing
//     const originalLabels = {};
//     const labelsToChange = {
//         'function': 'Load Date',
//         'product': 'Load Time',
//         'dose': 'Unload Date',
//         'temp': 'Unload Time',
//         'amtsInGrams': 'Machine Operator',
//     };

//     // Store original placeholders and clear them
//     const originalPlaceholders = {};
//     const placeholdersToRemove = ['product', 'dose', 'temp', 'amtsInGrams'];

//     placeholdersToRemove.forEach(id => {
//         const input = document.getElementById(id);
//         if (input) {
//             originalPlaceholders[id] = input.placeholder;
//             input.placeholder = ''; // Clear the placeholder
//         }
//     });

//     Object.keys(labelsToChange).forEach(id => {
//         const label = document.querySelector(`label[for=${id}]`);
//         if (label) {
//             originalLabels[id] = label.innerHTML;
//             label.innerHTML = labelsToChange[id];
//         }
//     });

//     // Create a style element for print-specific styles
//     const printStyle = document.createElement("style");
//     printStyle.id = "printStyle";
//     printStyle.innerHTML = `
//         @media print {
//             body {
//                 background-color: purple; 
//                 color: black;
//                 height: auto;
//             }

//             /* Hide elements not needed in print */
//             #timeRecipe,
//             #time,
//             .no-print,
//             .btn,
//             .btn-group,
//             #new_recipe_section > .form-section > .row > .col-md-3:not(:last-child) {
//                 display: none; /* Hide specified fields and labels */
//             }

//             /* Container for horizontal fixation */
//             .print-container {
//                 border: 1px solid black;
//                 position: relative; /* Fix the container horizontally */
//                 max-width: 1000px; /* Ensure the container fits within the page */
//                 top: 0; /* Adjust as needed for vertical position */
//                 left: 0; /* Full width of the page */
//                 right: 0; /* Full width of the page */
//                 background-color: green; /* Ensure background color */
//                 padding: 0; /* Remove padding */
//                 box-sizing: border-box; /* Include padding and border in the element's total width and height */
//                 overflow: hidden; /* Hide overflow */
//             }

//             /* Ensure the printable section is visible and fits horizontally */
//             #new_recipe_section {
//                 background-color: red;
//                 position: relative; /* Relative position within the fixed container */
//                 width: 100%; /* Full width of the container */
//                 height: auto; /* Adjust height based on content */
//                 background-color: #fae2fc; /* Background color for print */
//                 overflow: auto; /* Manage overflow */
//                 padding: 20px; /* Add some padding */
//                 box-shadow: none; /* Remove box-shadow for print */
//                 margin: 0; /* Remove margin */
//                 box-sizing: border-box; /* Include padding and border in the element's total width and height */
//             }

//             /* Adjust table styling for print */
//             .table-container,
//             .table-section {
//                 max-height: none; /* Remove max-height restriction for print */
//                 overflow: auto; /* Ensure overflow is managed */
//             }

//             /* Page breaks */
//             @page {
//                 margin: 0; /* Remove margins for print pages */
//             }

//             .page-break {
//                 page-break-before: always; /* Force a new page */
//             }

//             /* Add text to the end of printout */
//             .print-end-text {
//                 position: absolute;
//                 bottom: 0;
//                 left: 0;
//                 right: 0;
//                 text-align: center;
//                 background-color: #fae2fc;
//                 padding: 10px;
//                 box-shadow: none; /* Remove shadow for print */
//             }

//             .print-end-text p {
//                 margin: 0;
//                 font-size: 16px; /* Adjust font size as needed */
//             }
//         }
//     `;

//     // Append the style element to the head of the document
//     document.head.appendChild(printStyle);

//     // Add text to the end of the document for print
//     const printEndText = document.createElement('div');
//     printEndText.className = 'print-end-text';
//     printEndText.innerHTML = `
//         <p>run</p>
//         <p>left</p>
//     `;
//     document.body.appendChild(printEndText);

//     // Trigger the print dialog
//     window.print();

//     // Remove the style element and revert label text and placeholders after printing
//     setTimeout(() => {
//         const style = document.getElementById("printStyle");
//         if (style) {
//             style.remove();
//         }

//         // Remove text
//         const text = document.querySelector('.print-end-text');
//         if (text) {
//             text.remove();
//         }

//         // Revert labels to original text
//         Object.keys(originalLabels).forEach(id => {
//             const label = document.querySelector(`label[for=${id}]`);
//             if (label) {
//                 label.innerHTML = originalLabels[id];
//             }
//         });

//         // Restore placeholders
//         placeholdersToRemove.forEach(id => {
//             const input = document.getElementById(id);
//             if (input) {
//                 input.placeholder = originalPlaceholders[id];
//             }
//         });
//     }, 1000);
// }


// function printRecipe() {
//     // Change labels before printing
//     const originalLabels = {};
//     const labelsToChange = {
//         'function': 'Load Date',
//         'product': 'Load Time',
//         'dose': 'Unload Date',
//         'temp': 'Unload Time',
//         'amtsInGrams': 'Machine Operator',
//     };

//     // Store original placeholders and clear them
//     const originalPlaceholders = {};
//     const placeholdersToRemove = ['product', 'dose', 'temp', 'amtsInGrams'];

//     placeholdersToRemove.forEach(id => {
//         const input = document.getElementById(id);
//         if (input) {
//             originalPlaceholders[id] = input.placeholder;
//             input.placeholder = ''; // Clear the placeholder
//         }
//     });

//     Object.keys(labelsToChange).forEach(id => {
//         const label = document.querySelector(`label[for=${id}]`);
//         if (label) {
//             originalLabels[id] = label.innerHTML;
//             label.innerHTML = labelsToChange[id];
//         }
//     });

//     // Create a style element for print-specific styles
//     const printStyle = document.createElement("style");
//     printStyle.id = "printStyle";
//     printStyle.innerHTML = `
//         @media print {
//             body {
//                 background-color: purple; 
//                 color: black;
//                 height: auto;
//             }

//             /* Hide elements not needed in print */
//             #timeRecipe,
//             #time,
//             .no-print,
//             .btn,
//             .btn-group,
//             #new_recipe_section > .form-section > .row > .col-md-3:not(:last-child) {
//                 display: none; /* Hide specified fields and labels */
//             }

//             /* Container for horizontal fixation */
//             .print-container {
//                 border: 1px solid black;
//                 position: relative; /* Fix the container horizontally */
//                 max-width: 1000px; /* Ensure the container fits within the page */
//                 top: 0; /* Adjust as needed for vertical position */
//                 left: 0; /* Full width of the page */
//                 right: 0; /* Full width of the page */
//                 background-color: green; /* Ensure background color */
//                 padding: 0; /* Remove padding */
//                 box-sizing: border-box; /* Include padding and border in the element's total width and height */
//                 overflow: hidden; /* Hide overflow */
//             }

//             /* Ensure the printable section is visible and fits horizontally */
//             #new_recipe_section {
//                 background-color: red;
//                 position: relative; /* Relative position within the fixed container */
//                 width: 100%; /* Full width of the container */
//                 height: auto; /* Adjust height based on content */
//                 background-color: #fae2fc; /* Background color for print */
//                 overflow: auto; /* Manage overflow */
//                 padding: 20px; /* Add some padding */
//                 box-shadow: none; /* Remove box-shadow for print */
//                 margin: 0; /* Remove margin */
//                 box-sizing: border-box; /* Include padding and border in the element's total width and height */
//             }

//             /* Adjust table styling for print */
//             .table-container,
//             .table-section {
//                 max-height: none; /* Remove max-height restriction for print */
//                 overflow: auto; /* Ensure overflow is managed */
//             }

//             /* Page breaks */
//             @page {
//                 margin: 0; /* Remove margins for print pages */
//             }

//             .page-break {
//                 page-break-before: always; /* Force a new page */
//             }

//             /* Add text to the end of printout in one row */
//             .print-end-text {
//                 position: absolute;
//                 bottom: 0;
//                 left: 0;
//                 right: 0;
//                 text-align: center;
//                 background-color: #fae2fc;
//                 padding: 10px;
//                 box-shadow: none; /* Remove shadow for print */
//                 display: flex;
//                 justify-content: space-around; /* Align text horizontally */
//                 align-items: center; /* Center text vertically */
//             }

//             .print-end-text p {
//                 margin: 0;
//                 font-size: 16px; /* Adjust font size as needed */
//                 flex: 1; /* Ensure items are distributed evenly */
//                 text-align: center; /* Center text horizontally */
//             }
//         }
//     `;

//     // Append the style element to the head of the document
//     document.head.appendChild(printStyle);

//     // Add text to the end of the document for print
//     const printEndText = document.createElement('div');
//     printEndText.className = 'print-end-text';
//     printEndText.innerHTML = `
//         <p>ISSUED NO: 01</p>
//         <p>ISSUED DATE : 08.08.2024</p>
//     `;
//     document.body.appendChild(printEndText);

//     // Trigger the print dialog
//     window.print();

//     // Remove the style element and revert label text and placeholders after printing
//     setTimeout(() => {
//         const style = document.getElementById("printStyle");
//         if (style) {
//             style.remove();
//         }

//         // Remove text
//         const text = document.querySelector('.print-end-text');
//         if (text) {
//             text.remove();
//         }

//         // Revert labels to original text
//         Object.keys(originalLabels).forEach(id => {
//             const label = document.querySelector(`label[for=${id}]`);
//             if (label) {
//                 label.innerHTML = originalLabels[id];
//             }
//         });

//         // Restore placeholders
//         placeholdersToRemove.forEach(id => {
//             const input = document.getElementById(id);
//             if (input) {
//                 input.placeholder = originalPlaceholders[id];
//             }
//         });
//     }, 1000);
// }
function printRecipe() {
    // Change labels before printing
    const originalLabels = {};
    const labelsToChange = {
        'function': 'Load Date',
        'product': 'Load Time',
        'dose': 'Unload Date',
        'temp': 'Unload Time',
        'amtsInGrams': 'Machine Operator',
    };

    // Store original placeholders and clear them
    const originalPlaceholders = {};
    const placeholdersToRemove = ['product', 'dose', 'temp', 'amtsInGrams'];

    placeholdersToRemove.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            originalPlaceholders[id] = input.placeholder;
            input.placeholder = ''; // Clear the placeholder
        }
    });

    Object.keys(labelsToChange).forEach(id => {
        const label = document.querySelector(`label[for=${id}]`);
        if (label) {
            originalLabels[id] = label.innerHTML;
            label.innerHTML = labelsToChange[id];
        }
    });

    // Create a style element for print-specific styles
    const printStyle = document.createElement("style");
    printStyle.id = "printStyle";
    printStyle.innerHTML = `
        @media print {
            body {
                background-color: purple; 
                color: black;
                height: auto;
                margin: 0; /* Remove default margins */
            }

            /* Hide elements not needed in print */
            #timeRecipe,
            #time,
            .no-print,
            .btn,
            .btn-group,
            #new_recipe_section > .form-section > .row > .col-md-3:not(:last-child) {
                display: none; /* Hide specified fields and labels */
            }

            /* Container for horizontal fixation */
            .print-container {
                border: 1px solid black;
                position: relative; /* Fix the container horizontally */
                max-width: 1000px; /* Ensure the container fits within the page */
                top: 0; /* Adjust as needed for vertical position */
                left: 0; /* Full width of the page */
                right: 0; /* Full width of the page */
                background-color: green; /* Ensure background color */
                padding: 0; /* Remove padding */
                box-sizing: border-box; /* Include padding and border in the element's total width and height */
                overflow: hidden; /* Hide overflow */
            }

            /* Ensure the printable section is visible and fits horizontally */
            #new_recipe_section {
                background-color: red;
                position: relative; /* Relative position within the fixed container */
                width: 100%; /* Full width of the container */
                height: auto; /* Adjust height based on content */
                background-color: #fae2fc; /* Background color for print */
                overflow: auto; /* Manage overflow */
                padding: 20px; /* Add some padding */
                box-shadow: none; /* Remove box-shadow for print */
                margin: 0; /* Remove margin */
                box-sizing: border-box; /* Include padding and border in the element's total width and height */
            }

            /* Adjust table styling for print */
            .table-container,
            .table-section {
                max-height: none; /* Remove max-height restriction for print */
                overflow: auto; /* Ensure overflow is managed */
            }

            /* Page breaks */
            @page {
                margin: 0; /* Remove margins for print pages */
            }

            .page-break {
                page-break-before: always; /* Force a new page */
            }

            /* Add footer text to the end of printout */
            .print-footer {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                text-align: center;
                background-color: #fae2fc;
                padding: 10px;
                box-shadow: none; /* Remove shadow for print */
                display: flex;
                justify-content: space-around; /* Align text horizontally */
                align-items: center; /* Center text vertically */
                font-size: 16px; /* Adjust font size as needed */
            }

            .print-footer p {
                margin: 0;
                flex: 1; /* Ensure items are distributed evenly */
                text-align: center; /* Center text horizontally */
            }
        }
    `;

    // Append the style element to the head of the document
    document.head.appendChild(printStyle);

    // Add footer text to the end of the document for print
    const printFooter = document.createElement('div');
    printFooter.className = 'print-footer';
    printFooter.innerHTML = `
        <p>ISSUED NO: 01</p>
        <p>ISSUED DATE : 08.08.2024</p>
    `;
    document.body.appendChild(printFooter);

    // Trigger the print dialog
    window.print();

    // Remove the style element and footer text after printing
    setTimeout(() => {
        const style = document.getElementById("printStyle");
        if (style) {
            style.remove();
        }

        // Remove footer text
        const footer = document.querySelector('.print-footer');
        if (footer) {
            footer.remove();
        }

        // Revert labels to original text
        Object.keys(originalLabels).forEach(id => {
            const label = document.querySelector(`label[for=${id}]`);
            if (label) {
                label.innerHTML = originalLabels[id];
            }
        });

        // Restore placeholders
        placeholdersToRemove.forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                input.placeholder = originalPlaceholders[id];
            }
        });
    }, 1000);
}
