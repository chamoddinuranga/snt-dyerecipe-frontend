function togglePassword() {
    const passwordInput = document.getElementById("password");
    const togglePasswordIcon = document.getElementById("togglePasswordIcon");
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    togglePasswordIcon.classList.toggle("fa-eye-slash");
}

function validatePassword() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    $.ajax({
        method: "GET",
        contentType: "application/json",
        url: "http://localhost:8080/api/v1/user/getAllUsers",
        async: true,
        success: function(data) {
            if (data.code === "00") {
                const user = data.content.find(user => user.userName === username && user.password === password);
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
        error: function(xhr, exception) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Error fetching users: " + xhr.responseText,
            });
            console.error("Error details:", exception);
        }
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
    const formattedDate = now.toISOString().split('T')[0];
    const formattedTime = now.toTimeString().split(' ')[0].slice(0, 5);
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
