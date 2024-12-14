// Function to switch to Signup form
document.getElementById("switchToSignup").addEventListener("click", () => {
  document.getElementById("authTitle").textContent = "Sign Up";
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("signupForm").style.display = "block";
});

// Function to switch to Login form
document.getElementById("switchToLogin").addEventListener("click", () => {
  document.getElementById("authTitle").textContent = "Login";
  document.getElementById("signupForm").style.display = "none";
  document.getElementById("loginForm").style.display = "block";
});

// Login Functionality
// Login Functionality
document.getElementById("loginBtn").addEventListener("click", async () => {
  const email = document.getElementById("userEmail").value;
  const password = document.getElementById("userPassword").value;

  // Send login request to the backend
  const response = await fetch('http://localhost:5000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();

  if (data.message === 'Login successful') {
    alert("Login successful!");
    // Save JWT token to localStorage
    localStorage.setItem('jwt_token', data.token);
    window.location.href = "user_homepage.html"; // Redirect to the user's dashboard
  } else {
    alert(data.message); // Show error message
  }
});


// Signup Functionality
// Signup Functionality
document.getElementById("signupBtn").addEventListener("click", async () => {
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  // Send signup request to the backend
  const response = await fetch('http://localhost:5000/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, confirmPassword })
  });

  const data = await response.json();

  if (data.message === 'User created successfully') {
    alert("Account created successfully!");
    window.location.href = "user_homepage.html"; // Redirect to login page
  } else {
    alert(data.message); // Show error message
  }
});

