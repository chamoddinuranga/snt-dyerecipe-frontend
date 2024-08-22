getAllProducts();
// function saveProduct() {
//     let productName = $('#productName').val();
//     let productType = $('#productType').val();

//     $.ajax({
//         method: "POST",
//         contentType: "application/json",
//         url: "http://192.168.8.105:8080/api/v1/product/saveProduct",
//         async: true,
//         data: JSON.stringify({
//             "productId": "00", // Assuming product ID is auto-generated and not required here
//             "productName": productName,
//             "productType": productType
//         }),
//         success: function(data) {
//             alert("Product saved successfully");
//             getAllProducts(); // Refresh the product list
//         },
//         error: function(xhr, exception) {
//             alert("Error occurred: " + xhr.status + " - " + xhr.statusText);
//         }
//     });
// }

// $(document).ready(function () {
//     let isSaving = false; // Flag to prevent multiple saves

//     function handleEnterKeyPress(event) {
//         if (event.which === 13) { // Check if Enter key is pressed
//             event.preventDefault(); // Prevent the default action (e.g., form submission)
//             if (!isSaving) {
//                 isSaving = true; // Set flag to indicate save operation is in progress
//                 saveProduct(); // Call the saveProduct function
//             }
//         }
//     }

//     $('#productName, #productType').on('keydown', handleEnterKeyPress);
//     $('#add_product_section').on('keydown', function(event) {
//         if (event.which === 13) { // Enter key
//             event.preventDefault(); // Prevent the default action
//             if (!isSaving) {
//                 isSaving = true; // Set flag to indicate save operation is in progress
//                 saveProduct(); // Call the saveProduct function
//             }
//         }
//     });

//     function saveProduct() {
//         let productName = $('#productName').val().toUpperCase();
//         let productType = $('#productType').val();

//         $.ajax({
//             method: "POST",
//             contentType: "application/json",
//             url: "http://192.168.8.105:8080/api/v1/product/saveProduct",
//             async: true,
//             data: JSON.stringify({
//                 "productId": "00", // Assuming product ID is auto-generated and not required here
//                 "productName": productName,
//                 "productType": productType
//             }),
//             success: function(data) {
//                 alert("Product saved successfully");
//                 getAllProducts(); // Refresh the product list
//                 isSaving = false; // Reset flag after successful save
//             },
//             error: function(xhr, exception) {
//                 alert("Error occurred: " + xhr.status + " - " + xhr.statusText);
//                 isSaving = false; // Reset flag on error
//             }
//         });
//     }
// });
$(document).ready(function () {
  let isSaving = false; // Flag to prevent multiple saves

  // Function to handle saving the product
  function saveProduct() {
    let productName = $("#productName").val().toUpperCase();
    let productType = $("#productType").val();

    if (isSaving) return; // Prevent multiple saves

    isSaving = true; // Set flag to indicate save operation is in progress
    $("#productName").val("");
    $.ajax({
      method: "POST",
      contentType: "application/json",
      url: "http://192.168.8.105:8080/api/v1/product/saveProduct",
      async: true,
      data: JSON.stringify({
        productId: "00", // Assuming product ID is auto-generated and not required here
        productName: productName,
        productType: productType,
      }),
      success: function (data) {
        alert("Product saved successfully");
        getAllProducts(); // Refresh the product list
        isSaving = false; // Reset flag after successful save
      },
      error: function (xhr, exception) {
        alert("Error occurred: " + xhr.status + " - " + xhr.statusText);
        isSaving = false; // Reset flag on error
      },
    });
  }

  // Function to handle Enter key press
  function handleEnterKeyPress(event) {
    if (event.which === 13) {
      // Check if Enter key is pressed
      event.preventDefault(); // Prevent the default action (e.g., form submission)
      saveProduct(); // Call the saveProduct function
    }
  }

  // Attach keydown event listeners to input fields
  $("#productName, #productType").on("keydown", handleEnterKeyPress);

  // Attach keydown event listener to the section
  $("#add_product_section").on("keydown", function (event) {
    if (event.which === 13) {
      // Enter key
      event.preventDefault(); // Prevent the default action
      saveProduct(); // Call the saveProduct function
    }
  });

  // Attach click event listener to the Save button
  $("#productSaveButton").on("click", function () {
    saveProduct(); // Call the saveProduct function
  });
});

// Update product

function updateProduct() {
  let productId = $("#productId").val(); // Assuming product ID is fetched and set somewhere
  let productName = $("#productName").val();
  let productType = $("#productType").val();

  $.ajax({
    method: "PUT",
    contentType: "application/json",
    url: "http://192.168.8.105:8080/api/v1/product/updateProduct",
    async: true,
    data: JSON.stringify({
      productId: productId,
      productName: productName,
      productType: productType,
    }),
    success: function (data) {
      alert("Product updated successfully");
      getAllProducts(); // Refresh the product list
    },
    error: function (xhr, exception) {
      alert("Error occurred: " + xhr.status + " - " + xhr.statusText);
    },
  });
}

// Delete product

function deleteProduct() {
  let productName = $("#productName").val();

  $.ajax({
    method: "DELETE",
    contentType: "application/json",
    url:
      "http://192.168.8.105:8080/api/v1/product/deleteProductByProductName/" +
      encodeURIComponent(productName),
    async: true,
    success: function (data) {
      alert("Product deleted successfully");
      getAllProducts(); // Refresh the product list
    },
    error: function (xhr, exception) {
      alert("Error occurred: " + xhr.status + " - " + xhr.statusText);
    },
  });
}

// Get all products

function getAllProducts() {
  $.ajax({
    method: "GET",
    contentType: "application/json",
    url: "http://192.168.8.105:8080/api/v1/product/getAllProducts",
    async: true,
    success: function (data) {
      if (data.code === "00") {
        $("#productTable").empty();
        for (let product of data.content) {
          let productId = product.productId;
          let productName = product.productName;
          let productType = product.productType;

          var row = `<tr><td>${productId}</td><td>${productName}</td><td>${productType}</td></tr>`;
          $("#productTable").append(row);
        }
      }
    },
    error: function (xhr, exception) {
      alert("Error occurred: " + xhr.status + " - " + xhr.statusText);
    },
  });
}

// Call getAllProducts() function to load products when the page loads
$(document).ready(function () {
  $(document).on("click", "#productTable tr", function () {
    var col0 = $(this).find("td:eq(0)").text();
    var col1 = $(this).find("td:eq(1)").text();
    var col2 = $(this).find("td:eq(2)").text();

    $("#productId").val(col0);
    $("#productName").val(col1);
    $("#productType").val(col2);
  });
});
