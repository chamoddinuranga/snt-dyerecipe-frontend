function togglePassword() {
  const passwordInput = document.getElementById("password");
  const togglePasswordIcon = document.getElementById("togglePasswordIcon");
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
  togglePasswordIcon.classList.toggle("fa-eye-slash");
}

function validatePassword() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  $.ajax({
    method: "GET",
    contentType: "application/json",
    url: "http://192.168.8.155:8080/api/v1/user/getAllUsers",
    async: true,
    success: function (data) {
      if (data.code === "00") {
        const user = data.content.find(
          (user) => user.userName === username && user.password === password
        );
        if (user) {
          sessionStorage.setItem("userType", user.role);
          showDashboard();
        } else {
          Swal.fire({
            icon: "error",
            title: "Invalid Credentials",
            text: "The username or password you entered is incorrect.",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch user data.",
        });
      }
    },
    error: function (xhr, exception) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error fetching users: " + xhr.responseText,
      });
      console.error("Error details:", exception);
    },
  });

  return false;
}

function showDashboard() {
  const userType = sessionStorage.getItem("userType");
  toggleVisibility("admin_dashboard", userType === "admin");
  toggleVisibility("user_dashboard", userType === "user");
  toggleVisibility("loginSection", false);
}

function toggleVisibility(elementId, isVisible) {
  const element = document.getElementById(elementId);
  if (element) {
    element.style.display = isVisible ? "block" : "none";
  }
}

function setDateTime(dateInputId, timeInputId) {
  const now = new Date();
  const formattedDate = now.toISOString().split("T")[0];
  const formattedTime = now.toTimeString().split(" ")[0].slice(0, 5);
  document.getElementById(dateInputId).value = formattedDate;
  document.getElementById(timeInputId).value = formattedTime;
}

function showAddUser() {
  toggleVisibility("admin_dashboard", false);
  toggleVisibility("add_user_section", true);
}

function showAddProduct() {
  toggleVisibility("admin_dashboard", false);
  toggleVisibility("user_dashboard", false);
  toggleVisibility("add_product_section", true);
}

function showAddRecipe() {
  toggleVisibility("admin_dashboard", false);
  toggleVisibility("user_dashboard", false);
  toggleVisibility("new_recipe_section", true);
  setDateTime("rp_date", "rp_time");
}

function showNewOrder() {
  toggleVisibility("admin_dashboard", false);
  toggleVisibility("user_dashboard", false);
  toggleVisibility("new_order_section", true);
  setDateTime("date", "time");
}

function backToDashboard() {
  const userType = sessionStorage.getItem("userType");
  toggleVisibility("admin_dashboard", userType === "admin");
  toggleVisibility("user_dashboard", userType === "user");
  toggleVisibility("add_user_section", false);
  toggleVisibility("add_product_section", false);
  toggleVisibility("new_order_section", false);
  toggleVisibility("new_recipe_section", false);
}

function logout() {
  sessionStorage.removeItem("userType");
  location.reload();
}
{
  /* <script>
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

//</script> function saveEmployee() { */
}
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
