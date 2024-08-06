getAllUsers(); // Call function to fetch all users
function saveUser() {
    // Retrieve values from the form
    let fullName = $("#fullName").val();
    let userName = $("#user_name").val();
    let password = $("#userPassword").val();
    let userRole = $("#userRole").val();
  
    // Log values to the console
    console.log(fullName, userName, password, userRole);
  
    // Perform AJAX request
    $.ajax({
      method: "POST",
      contentType: "application/json",
      url: "http://localhost:8080/api/v1/user/saveUser",
      async: true,
      data: JSON.stringify({
        userId: "00", // Assuming backend generates this ID
        fullName: fullName,
        userName: userName,
        password: password,
        role: userRole,
      }),
      success: function (data) {
        alert("User saved successfully");
        getAllUsers(); // Call function to refresh user list
      },
      error: function (xhr, exception) {
        alert("Error saving user: " + xhr.responseText);
        console.error("Error details:", exception);
      },
    });
  }
 

  function updateUser() {
    // Retrieve values from the form
    let userID = $('#userId').val();
    let fullName = $("#fullName").val();
    let userName = $("#user_name").val();
    let password = $("#userPassword").val();
    let userRole = $("#userRole").val();

    // Log values to the console
    console.log(userID, fullName, userName, password, userRole);

    // Perform AJAX request
    $.ajax({
        method: "PUT",
        contentType: "application/json",
        url: "http://localhost:8080/api/v1/user/updateUser",
        async: true,
        data: JSON.stringify({
            userId: userID, // Use the ID provided by the form
            fullName: fullName,
            userName: userName,
            password: password,
            role: userRole,
        }),
        success: function (data) {
            alert("User updated successfully");
            getAllUsers(); // Call function to refresh user list
        },
        error: function (xhr, exception) {
            alert("Error updating user: " + xhr.responseText);
            console.error("Error details:", exception);
        }
    });
}

function deleteUser() {
    let userName = $('#user_name').val(); // Retrieve the username from the input field
    console.log(userName)

    $.ajax({
        method: "DELETE",
        contentType: "application/json",
        url: "http://localhost:8080/api/v1/user/deleteUserByUserName/" + encodeURIComponent(userName), // Encode the username to handle special characters
        async: true,
        success: function(data) {
            if (data === "RSP_SUCCESS") {
                alert("User deleted successfully");
                getAllUsers(); // Replace with your function to refresh the user list
            } else {
                alert("User not found");
            }
        },
        error: function(xhr, exception) {
            alert("Error occurred: " + xhr.status + " - " + xhr.statusText);
        }
    });
}


function getAllUsers() {
    $.ajax({
        method: "GET",
        contentType: "application/json",
        url: "http://localhost:8080/api/v1/user/getAllUsers",
        async: true,
        success: function (data) {
            if (data.code === "00") {
                $('#empTable').empty();
                for (let user of data.content) {
                    let userID = user.userId;
                    let fullName = user.fullName;
                    let userName = user.userName;
                    let password = user.password;
                    let role = user.role;

                    let row = `<tr>
                        <td>${userID}</td>
                        <td>${fullName}</td>
                        <td>${userName}</td>
                        <td>${password}</td>
                        <td>${role}</td>
                    </tr>`;
                    $('#empTable').append(row);
                }
            } else {
                alert("No users found.");
            }
        },
        error: function (xhr, exception) {
            alert("Error fetching users: " + xhr.responseText);
            console.error("Error details:", exception);
        }
    });
}


$(document).ready(function () {
    $(document).on('click', '#empTable tr', function () {
        var col0 = $(this).find('td:eq(0)').text();
        var col1 = $(this).find('td:eq(1)').text();
        var col2 = $(this).find('td:eq(2)').text();
        var col3 = $(this).find('td:eq(3)').text();
        var col4 = $(this).find('td:eq(4)').text();

        $('#userId').val(col0); // Assuming this is userId
        $('#fullName').val(col1); // Assuming this is fullName
        $('#user_name').val(col2); // Assuming this is userName
        $('#userPassword').val(col3); // Assuming this is password
        $('#userRole').val(col4); // Assuming this is role
    });
});

<!-- <script>
function togglePassword() {
  const passwordInput = document.getElementById("password");
  const togglePasswordIcon =
    document.getElementById("togglePasswordIcon");
  const type =
    passwordInput.getAttribute("type") === "password"
      ? "text"
      : "password";
  passwordInput.setAttribute("type", type);
  togglePasswordIcon.classList.toggle("fa-eye-slash");
}

function validatePassword() {
  const password = document.getElementById("password").value;
  const username = document.getElementById("username").value;

  const correctAdminUsername = "admin123";
  const correctUserUsername = "user123";
  const correctPassword = "123";

  if (
    (username === correctAdminUsername && password === correctPassword) ||
    (username === correctUserUsername && password === correctPassword)
  ) {
    const userType = username === correctAdminUsername ? "admin" : "user";
    sessionStorage.setItem("userType", userType);
    showDashboard();
  } else {
    Swal.fire({
      icon: "error",
      title: "Invalid Credentials",
      text: "The username or password you entered is incorrect.",
    });
  }
  return false;
}

function showDashboard() {
  const userType = sessionStorage.getItem("userType");
  const adminDashboard = document.getElementById("admin_dashboard");
  const userDashboard = document.getElementById("user_dashboard");
  const loginSection = document.getElementById("loginSection");

  if (userType === "admin") {
    adminDashboard.style.display = "block";
    userDashboard.style.display = "none";
  } else if (userType === "user") {
    adminDashboard.style.display = "none";
    userDashboard.style.display = "block";
  }

  loginSection.style.display = "none";
}

function logout() {
  sessionStorage.removeItem("userType");
  location.reload();
}

function showAddUser() {
  const adminDashboard = document.getElementById("admin_dashboard");
  const addUserSection = document.getElementById("add_user_section");

  adminDashboard.style.display = "none";
  addUserSection.style.display = "block";
}

function showAddProduct() {
  const adminDashboard = document.getElementById("admin_dashboard");
  const userDashboard = document.getElementById("user_dashboard");
  const addProductSection = document.getElementById(
    "add_product_section"
  );

  adminDashboard.style.display = "none";
  userDashboard.style.display = "none";
  addProductSection.style.display = "block";
}
function showAddRecipe() {
  const adminDashboard = document.getElementById("admin_dashboard");
  const userDashboard = document.getElementById("user_dashboard");
  const addRecipeSection = document.getElementById("new_recipe_section");

  const dateInput = document.getElementById("rp_date");
  const timeInput = document.getElementById("rp_time");

  // Get current date and time
  const now = new Date();

  // Format date as YYYY-MM-DD
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  // Format time as HH:MM
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const formattedTime = `${hours}:${minutes}`;

  // Set values to inputs
  dateInput.value = formattedDate;
  timeInput.value = formattedTime;

  adminDashboard.style.display = "none";
  userDashboard.style.display = "none";
  addRecipeSection.style.display = "block";
}
function showNewOrder() {
  const adminDashboard = document.getElementById("admin_dashboard");
  const userDashboard = document.getElementById("user_dashboard");
  const newOrderSection = document.getElementById("new_order_section");

  const dateInput = document.getElementById("date");
  const timeInput = document.getElementById("time");

  // Get current date and time
  const now = new Date();

  // Format date as YYYY-MM-DD
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  // Format time as HH:MM
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const formattedTime = `${hours}:${minutes}`;

  // Set values to inputs
  dateInput.value = formattedDate;
  timeInput.value = formattedTime;

  adminDashboard.style.display = "none";
  userDashboard.style.display = "none";
  newOrderSection.style.display = "block";
}

function backToDashboard() {
  const userType = sessionStorage.getItem("userType");
  const adminDashboard = document.getElementById("admin_dashboard");
  const userDashboard = document.getElementById("user_dashboard");
  const addUserSection = document.getElementById("add_user_section");
  const addProductSection = document.getElementById(
    "add_product_section"
  );
  const addOrderSection = document.getElementById("new_order_section");
  const addRecipeSection = document.getElementById("new_recipe_section");

  addUserSection.style.display = "none";
  addProductSection.style.display = "none";
  addOrderSection.style.display = "none";
  addRecipeSection.style.display = "none";

  if (userType === "admin") {
    adminDashboard.style.display = "block";
  } else if (userType === "user") {
    userDashboard.style.display = "block";
  }
}

// function saveEmployee() {
//   // Your code to save the employee
// }

// function updateEmployee() {
//   // Your code to update the employee
// }

// function deleteEmployee() {
//   // Your code to delete the employee
// }

// function saveProduct() {
//   // Your code to save the product
// }

// function updateProduct() {
//   // Your code to update the product
// }

// function deleteProduct() {
//   // Your code to delete the product
// }
</script> -->