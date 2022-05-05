const loginFormHandler = async function (event) {
  event.preventDefault();

  const username = document.querySelector("#username").value.trim();
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value.trim();

  if (username && email && password) {
    const response = await fetch("/api/user/login", {
      method: "post",
      body: JSON.stringify({
        username,
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
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
