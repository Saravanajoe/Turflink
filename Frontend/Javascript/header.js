// Function to handle the logout process
function handleLogout() {
    // Display a logout confirmation
    alert("Logged out successfully!");
    
    // Redirect to the index page
    window.location.href = "../Html/index_page.html"; // Adjust the path if needed
}

// Function to dynamically load the header
function loadHeader() {
    fetch('../Html/header.html')
        .then(response => response.text())
        .then(data => {
            // Inject the header into the DOM
            document.getElementById('header-container').innerHTML = data;

            // Attach the logout functionality after the header is loaded
            const logoutBtn = document.getElementById("logoutBtn");
            if (logoutBtn) {
                logoutBtn.addEventListener("click", handleLogout);
            } else {
                console.error("Logout button not found after loading header!");
            }
        })
        .catch(error => console.error('Error loading the header:', error));
}

// Function to dynamically load the footer
function loadFooter() {
    fetch('../Html/footer.html')
        .then(response => response.text())
        .then(data => {
            // Inject the footer into the DOM
            document.getElementById('footer-container').innerHTML = data;
        })
        .catch(error => console.error('Error loading the footer:', error));
}

// Call the functions to load header and footer when the page loads
window.onload = () => {
    loadHeader();
    loadFooter();
};
