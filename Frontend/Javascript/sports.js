// Function to load turfs for a specific sport type from localStorage
function loadTurfs(sportType) {
  // Fetch all turfs from localStorage
  const allTurfs = JSON.parse(localStorage.getItem("turfs")) || [];
  
  // Filter turfs for the specific sport
  const filteredTurfs = allTurfs.filter(turf => turf.sportName.toLowerCase() === sportType.toLowerCase());

  // Select the turf cards container
  const turfContainer = document.querySelector(".turf-cards");
  turfContainer.innerHTML = ""; // Clear existing cards

  // Display filtered turfs as cards
  filteredTurfs.forEach((turf, index) => {
      const turfCard = document.createElement("div");
      turfCard.classList.add("turf-card");

      turfCard.innerHTML = `
          <img src="${turf.image}" alt="${turf.turfName}">
          <h3>${turf.turfName}</h3>
          <p><strong>Sport:</strong> ${turf.sportName}</p>
          <p><strong>Location:</strong> ${turf.location}</p>
          <p><strong>Pricing:</strong> ₹${turf.pricing}/hr</p>
          <button class="delete-btn" data-index="${index}">Delete</button>
      `;

      turfContainer.appendChild(turfCard);
  });

  // Add event listeners for delete buttons
  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach(btn => {
      btn.addEventListener("click", (e) => {
          const index = e.target.getAttribute("data-index");
          deleteTurf(index, sportType); // Pass sportType to update the user page
      });
  });
}

// Function to delete a turf
function deleteTurf(index, sportType) {
  // Fetch all turfs from localStorage
  const allTurfs = JSON.parse(localStorage.getItem("turfs")) || [];
  const deletedTurf = allTurfs[index]; // Get the turf that is being deleted

  // Remove the turf from the array
  allTurfs.splice(index, 1);

  // Save the updated list of turfs back to localStorage
  localStorage.setItem("turfs", JSON.stringify(allTurfs));

  // Refresh the displayed turfs for the selected sport
  loadTurfs(sportType);

  // Inform the user that the turf has been deleted
  alert(`${deletedTurf.turfName} has been deleted successfully!`);

  // Also remove the turf from the corresponding sport's page
  removeTurfFromUserPage(deletedTurf, sportType);
}

// Function to remove the deleted turf from the user page
function removeTurfFromUserPage(deletedTurf, sportType) {
  // Fetch the user's turfs for that sport
  const userTurfContainer = document.querySelector(".turf-cards");
  const userTurfs = userTurfContainer.querySelectorAll(".turf-card");

  userTurfs.forEach(turfCard => {
      const turfName = turfCard.querySelector("h3").textContent;
      if (turfName === deletedTurf.turfName) {
          turfCard.remove(); // Remove the deleted turf from the user page
      }
  });
}

// Call loadTurfs based on the sport type (this will be dynamically set on each page like cricket.html, football.html, etc.)
loadTurfs("cricket"); // Replace with the sport type you want to load (cricket, football, badminton, etc.)
