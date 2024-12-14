// Array to store added turfs (loaded from localStorage)
let turfs = JSON.parse(localStorage.getItem("turfs")) || [];

// Handle logout functionality
document.getElementById("logoutBtn").addEventListener("click", () => {
    alert("Logging out...");
    window.location.href = "index_page.html"; // Redirect to the admin login page
});

// Show turf form when "Add New Turf" is clicked
document.getElementById("addNewTurf").addEventListener("click", () => {
    document.getElementById("turfFormSection").style.display = "block";
    document.getElementById("turfListSection").style.display = "none";
});

// Show turfs list when "Manage Turfs" is clicked
document.getElementById("manageTurfs").addEventListener("click", () => {
    document.getElementById("turfFormSection").style.display = "none";
    document.getElementById("turfListSection").style.display = "block";
    displayTurfs(); // Display the added turfs
});

// Handle adding a new turf
document.getElementById("addTurfForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const sportName = document.getElementById("sportName").value;
    const turfName = document.getElementById("turfName").value;
    const location = document.getElementById("location").value;
    const image = document.getElementById("image").files[0];
    const pricing = document.getElementById("pricing").value;

    if (sportName && turfName && location && image && pricing) {
        // Create a new turf object
        const newTurf = {
            sportName,
            turfName,
            location,
            image: URL.createObjectURL(image), // Display uploaded image as a URL
            pricing
        };

        // Add the new turf to the array and save to localStorage
        turfs.push(newTurf);
        localStorage.setItem("turfs", JSON.stringify(turfs));

        // Refresh the displayed turfs
        displayTurfs();

        // Show success message
        alert("Turf added successfully!");

        // Clear the form
        document.getElementById("addTurfForm").reset();
    } else {
        alert("Please fill in all fields.");
    }
});

// Function to display turfs in a card layout with delete buttons
function displayTurfs() {
    const turfsContainer = document.getElementById("turfsContainer");
    turfsContainer.innerHTML = "";

    turfs.forEach((turf, index) => {
        const turfItem = document.createElement("div");
        turfItem.classList.add("turf-card");

        turfItem.innerHTML = `
            <img src="${turf.image}" alt="${turf.turfName}" class="turf-image">
            <div class="turf-details">
                <h3>${turf.turfName}</h3>
                <p><strong>Sport:</strong> ${turf.sportName}</p>
                <p><strong>Location:</strong> ${turf.location}</p>
                <p><strong>Pricing:</strong> ₹${turf.pricing}/hr</p>
                <button class="delete-btn" data-index="${index}">Delete</button>
            </div>
        `;

        turfsContainer.appendChild(turfItem);
    });

    // Add event listeners for delete buttons
    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = e.target.getAttribute("data-index");
            deleteTurf(index);
        });
    });
}

// Function to delete a turf
function deleteTurf(index) {
    // Remove turf from the local array
    const deletedTurf = turfs[index];
    turfs.splice(index, 1);

    // Update localStorage
    localStorage.setItem("turfs", JSON.stringify(turfs));

    // Refresh the admin view
    displayTurfs();

    // Inform the user
    alert(`${deletedTurf.turfName} has been deleted successfully!`);
}
