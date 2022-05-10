//(PLACEHOLDER) function to gather form data and call our "POST /api/user" express route
const signupFormHandler = async function (event) {
  event.preventDefault();

  const username = document.getElementById("username-1").value.trim();
  const password = document.getElementById("password-1").value.trim();
  const email = document.getElementById("email-1").value.trim();

  if (username && email && password) {
    const response = await fetch("/api/user", {
      method: "post",
      body: JSON.stringify({
        username,
        password,
        email,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector('.register-form').addEventListener('submit', signupFormHandler);