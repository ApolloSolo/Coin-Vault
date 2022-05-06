//(PLACEHOLDER) function to gather form data and call our "POST /api/user" express route
const signupFormHandler = async function (event) {
  event.preventDefault();

<<<<<<< HEAD
  const username = document.getElementById("username-1").value.trim();
  const password = document.getElementById("password-1").value.trim();
  const email = document.getElementById("email-1").value.trim();

  if (username && email && password) {
    const response = await fetch("/api/user", {
      method: "post",
=======
  const username = document.getElementById('username-1').value.trim();
  const password = document.getElementById('password-1').value.trim();
  const email = document.getElementById('email-1').value.trim();

  if(username && email && password) {
    const response = await fetch('/api/user', {
      method: 'post',
>>>>>>> d66c6e0c2526230bb593da63e103a2153dd34f73
      body: JSON.stringify({
        username,
        password,
        email,
      }),
<<<<<<< HEAD
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("dashboard");
=======
      headers: { 'Content-Type': 'application/json' }
    });

    if(response.ok) {
      document.location.replace('dashboard');
>>>>>>> d66c6e0c2526230bb593da63e103a2153dd34f73
    } else {
      alert(response.statusText);
    }
  }
<<<<<<< HEAD
=======

>>>>>>> d66c6e0c2526230bb593da63e103a2153dd34f73
};

document.querySelector('.register-form').addEventListener('submit', signupFormHandler);