// Mock data for admin login (use a database in production)
const adminUsers = [
    { username: "admin", password: "admin123" }
  ];
  
  // Admin login functionality
  document.getElementById("loginBtn").addEventListener("click", () => {
    const username = document.getElementById("adminUsername").value;
    const password = document.getElementById("adminPassword").value;
  
    const admin = adminUsers.find(admin => admin.username === username && admin.password === password);
    
    if (admin) {
        alert("Admin login successful!");
        window.location.href = "admin_homepage.html"; // Redirect to admin dashboard
    } else {
        alert("Invalid credentials!");
    }
  });
  