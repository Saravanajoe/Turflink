// JavaScript for the Image Carousel
let currentIndex = 0;
const images = document.querySelectorAll('.carousel-image');

// Function to change the images
function changeImage() {
    images[currentIndex].style.opacity = 0;
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].style.opacity = 1;
}

setInterval(changeImage, 3000); // Change image every 3 seconds

// Turf Data
const turfs = [
    { name: "Blaze Arena", sport: "Cricket", location: "Coimbatore", image: "../Images/Rec_turf/rec_turf-1.jpg" },
    { name: "Gandhi Swimming Pool", sport: "Swimming", location: "Coimbatore", image: "../Images/Rec_turf/rec_turf-2.jpg" },
    { name: "Saran Turf", sport: "Football", location: "Coimbatore", image: "../Images/Rec_turf/rec_turf-3.jpg" },
    { name: "Namma Turf", sport: "Football", location: "Coimbatore", image: "../Images/Rec_turf/rec_turf-4.jpg" },
    { name: "Dharan's Court", sport: "Badminton", location: "Coimbatore", image: "../Images/Rec_turf/rec_turf-5.jpg" },
    { name: "CSK Turf", sport: "Cricket", location: "Coimbatore", image: "../Images/Rec_turf/rec_turf-6.jpg" },
    { name: "Footie Zone", sport: "Football", location: "Coimbatore", image: "../Images/Rec_turf/rec_turf-7.jpg" },
    { name: "Lokesh Swimming Pool", sport: "Swimming", location: "Coimbatore", image: "../Images/Rec_turf/rec_turf-8.jpg" },
    { name: "Vivek Playzone", sport: "Badminton", location: "Coimbatore", image: "../Images/Rec_turf/rec_turf-9.jpg" },
];

// Render Cards
const turfCardsContainer = document.querySelector('.turf-cards');
turfs.forEach(turf => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <img src="${turf.image}" alt="${turf.name}">
        <div class="info">
            <h3>${turf.name}</h3>
            <p>Sport: ${turf.sport}</p>
            <p>Location: ${turf.location}</p>
        </div>
    `;
    turfCardsContainer.appendChild(card);
});

// Logout functionality
document.getElementById("logoutBtn")?.addEventListener("click", () => {
    alert("Logged out successfully!");
    window.location.href = "../Html/index_page.html"; // Redirect to login page
});
