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
    url: "http://192.168.8.155:8080/api/v1/user/saveUser",
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
  let userID = $("#userId").val();
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
    url: "http://192.168.8.155:8080/api/v1/user/updateUser",
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
    },
  });
}

function deleteUser() {
  let userName = $("#user_name").val(); // Retrieve the username from the input field
  console.log(userName);

  $.ajax({
    method: "DELETE",
    contentType: "application/json",
    url:
      "http://192.168.8.155:8080/api/v1/user/deleteUserByUserName/" +
      encodeURIComponent(userName), // Encode the username to handle special characters
    async: true,
    success: function (data) {
      if (data === "RSP_SUCCESS") {
        alert("User deleted successfully");
        getAllUsers(); // Replace with your function to refresh the user list
      } else {
        alert("User not found");
      }
    },
    error: function (xhr, exception) {
      alert("Error occurred: " + xhr.status + " - " + xhr.statusText);
    },
  });
}

function getAllUsers() {
  $.ajax({
    method: "GET",
    contentType: "application/json",
    url: "http://192.168.8.155:8080/api/v1/user/getAllUsers",
    async: true,
    success: function (data) {
      if (data.code === "00") {
        $("#empTable").empty();
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
          $("#empTable").append(row);
        }
      } else {
        alert("No users found.");
      }
    },
    error: function (xhr, exception) {
      alert("Error fetching users: " + xhr.responseText);
      console.error("Error details:", exception);
    },
  });
}

$(document).ready(function () {
  $(document).on("click", "#empTable tr", function () {
    var col0 = $(this).find("td:eq(0)").text();
    var col1 = $(this).find("td:eq(1)").text();
    var col2 = $(this).find("td:eq(2)").text();
    var col3 = $(this).find("td:eq(3)").text();
    var col4 = $(this).find("td:eq(4)").text();

    $("#userId").val(col0); // Assuming this is userId
    $("#fullName").val(col1); // Assuming this is fullName
    $("#user_name").val(col2); // Assuming this is userName
    $("#userPassword").val(col3); // Assuming this is password
    $("#userRole").val(col4); // Assuming this is role
  });
});
