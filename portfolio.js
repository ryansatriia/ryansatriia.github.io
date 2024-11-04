// Sample project data
const projects = [
    {
        title: 'Worldle',
        image: '/img/Wordle.png',
        languages: 'HTML, CSS, JavaScript',
        description: 'Description of project 1.',
    },
    {
        title: 'Wizdrawal',
        image: '/img/Wizdrawal.jpg',
        languages: 'Python, Django',
        description: 'Description of project 2.',
    },
    {
        title: 'Retro Hardware Store',
        image: '/img/Retro.png',
        languages: 'Java, Spring Boot',
        description: 'Description of project 3.',
    },
    {
        title: 'Orchid Forest Cikole',
        image: '/img/Orchid.jpg',
        languages: 'C#, ASP.NET',
        description: 'Description of project 4.',
    },
    {
        title: 'MRS Architect',
        image: '/img/Wizdrawal3.jpg',
        languages: 'PHP, Laravel',
        description: 'Description of project 5.',
    },
    {
        title: 'Urban vs Greenery Classification',
        image: '/img/Wizdrawal2.jpg',
        languages: 'React, Node.js',
        description: 'Description of project 6.',
    },
];

let currentIndex = 0;
const cardsToShow = 3;
let autoScrollInterval;
let autoScrollTimeout;

// Function to update the carousel with three projects
function updateCarousel() {
    const carousel = document.getElementById('carousel');
    carousel.innerHTML = ''; // Clear previous content

    for (let i = 0; i < cardsToShow; i++) {
        const projectIndex = (currentIndex + i) % projects.length;
        const project = projects[projectIndex];

        // Create the project card
        const card = document.createElement('div');
        card.classList.add('project-card');
        card.onclick = () => openModal(project);
        
        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <h3>${project.title}</h3>
            <p>${project.languages}</p>
        `;
        carousel.appendChild(card);
    }

    // Update class for animation effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.classList.remove('active', 'prev', 'next');
        if (index === 0) {
            card.classList.add('active');
        } else if (index === 1) {
            card.classList.add('next');
        } else {
            card.classList.add('prev');
        }
    });
}

// Define the images for each project
const projectImages = {
    'Worldle': ["/img/Wordle.png", "/img/Wordle2.png", "/img/Wordle3.png"],
    'Wizdrawal': ["/img/Wizdrawal.jpg", "/img/Wizdrawal2.jpg", "/img/Wizdrawal3.jpg"],
    'Retro Hardware Store': ["/img/Retro.png", "/img/Retro2.png", "/img/Retro3.png"],
    'Orchid Forest Cikole': ["/img/Orchid.jpg", "/img/Orchid2.jpg", "/img/Orchid3.jpg"],
    'MRS Architect': ["image1.jpg", "image2.jpg", "image3.jpg"],
    'Urban vs Greenery Classification': ["image1.jpg", "image2.jpg", "image3.jpg"]
};

let currentImageIndex = 0;
let currentProjectImages = []; // Store the image array for the current project

// Open modal and load project-specific images
function openModal(project) {
    currentProjectImages = projectImages[project.title] || []; // Load the specific images for the project
    currentImageIndex = 0;

    const modal = document.getElementById('project-modal');
    const modalImage = document.querySelector('.modal-image');
    
    if (currentProjectImages.length > 0) {
        modalImage.src = currentProjectImages[currentImageIndex]; // Set initial image
    }
    
    // Populate other modal details
    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-languages').textContent = project.languages;
    document.getElementById('modal-description').textContent = project.description;
    
    modal.style.display = "block"; // Show modal
}

// Close modal
function closeModal() {
    document.getElementById('project-modal').style.display = "none"; // Hide modal
}

// Next and previous image functions for cycling through project images
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % currentProjectImages.length;
    document.querySelector('.modal-image').src = currentProjectImages[currentImageIndex];
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + currentProjectImages.length) % currentProjectImages.length;
    document.querySelector('.modal-image').src = currentProjectImages[currentImageIndex];
}

// Handle the auto-scroll of the project carousel
function nextProjects() {
    currentIndex = (currentIndex + 1) % projects.length; // Increment by 1
    updateCarousel();
}

function prevProjects() {
    currentIndex = (currentIndex - 1 + projects.length) % projects.length; // Decrement by 1 and wrap around
    updateCarousel();
}

// Function to start auto-scrolling
function startAutoScroll() {
    autoScrollInterval = setInterval(nextProjects, 5000); // Automatically move to the next set every 5 seconds
}

// Function to stop auto-scrolling for 5 seconds
function stopAutoScroll() {
    clearInterval(autoScrollInterval); // Stop auto-scrolling
    clearTimeout(autoScrollTimeout); // Clear any existing timeout

    // Set a timeout to restart auto-scrolling after 5 seconds
    autoScrollTimeout = setTimeout(() => {
        startAutoScroll(); // Restart auto-scrolling
    }, 5000); // 5 seconds delay
}

// Initialize carousel
updateCarousel();
startAutoScroll(); // Start auto-scrolling

// Event listeners for navigation buttons
document.getElementById('next-button').onclick = function() {
    stopAutoScroll(); // Stop auto-scrolling when the button is pressed
    nextProjects();
};

document.getElementById('prev-button').onclick = function() {
    stopAutoScroll(); // Stop auto-scrolling when the button is pressed
    prevProjects();
};

// Close the modal when clicking anywhere outside the modal
window.onclick = function(event) {
    const modal = document.getElementById('project-modal');
    if (event.target === modal) {
        closeModal();
    }
}

// Toggle skill details
function toggleSkill(skillId) {
    const skill = document.getElementById(skillId);
    skill.style.display = skill.style.display === 'block' ? 'none' : 'block';
}
