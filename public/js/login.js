
async function loginFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector("#username").value.trim();
  const password = document.querySelector("#password").value.trim();
  console.log(username, password);

  if (username && password) {
    const response = await fetch("/api/user/login", {
      method: "post",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      console.log("Logged in")
      document.location.replace("dashboard");
    } else {
      alert(response.statusText);
    }
  } else {
    alert("Error");
  }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
