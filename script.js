// Sample project data
const projects = [
    {
        title: 'Worldle',
        image: 'img/WorldleMockup.png',
        languages: 'Flutter, Dart',
        description: "Worldle is a fun and engaging word-guessing game inspired by the popular game 'Wordle'. Developed by a team of four, this unique 5-letter word guessing game challenges players to guess the correct word within a limited number of attempts. Players receive feedback after each guess, with colors indicating correct letters and their positions, as well as letters that are correct but in the wrong position. The game utilizes Dart for the programming logic and Firebase for real-time data management, ensuring a smooth gameplay experience. The project showcases the use of Flutter to create a visually appealing interface.",
        buttons: [
            { text: 'GitHub', link: 'https://github.com/wennnn12/worldle_UAS_softdev' },
            { text: 'Figma', link: 'https://www.figma.com/design/slbtXL0OtazRiIFqU4Rfo7/PROTOTYPE?node-id=0-1&t=LWvM4AqOWZO0ajyE-1' }
        ]
    },    
    {
        title: 'Wizdrawal',
        image: 'img/WizdrawalMockup.png',
        languages: 'Flutter, Dart',
        description: 'Wizdrawal is a dummy e-wallet application inspired by popular e-wallets like GoPay, OVO, Dana, and ShopeePay. Designed by a team of five, this project aims to simulate the functionality of an e-wallet, allowing users to store balances, transfer funds, withdraw cash, and view their transactional history. Developed over the course of one month, this application utilizes Flutter for its interface, Dart for the programming logic, and Firebase as its database, although it is not intended for real-world use.',
        buttons: [
            { text: 'GitHub', link: 'https://github.com/GeorgeWeilisJunior/UAS_E-MONEY' },
        ]
    },    
    {
        title: 'Retro Hardware Store',
        image: 'img/RetroAll.png',
        languages: 'HTML, CSS, JavaScript, ExpressJS',
        description: 'The Retro Hardware Store is an e-commerce website inspired by popular online shopping platforms and the passion for collecting retro and old-school items, particularly technology and game consoles. Designed to facilitate the buying and selling of retro collectibles, this project aims to connect enthusiasts with a marketplace tailored to their interests. Developed by a three-person team over a period of two months, the website employs HTML, CSS, and JavaScript for its frontend, while utilizing MongoDB as the database to efficiently manage orders, item listings, and user accounts.',
        buttons: [
            { text: 'GitHub', link: 'https://github.com/GeorgeWeilisJunior/BackEnd-TugasFrontEnd' },
        ]
    },
    {
        title: 'Orchid Forest Cikole',
        image: 'img/OrchidAll.png',
        languages: 'HTML, CSS, JavaScript',
        description: 'The Orchid Forest Cikole project is a promotional website designed to showcase one of Indonesia’s beautiful destinations. Developed by a team of five, this website aims to provide visitors with essential information and insights about Orchid Forest Cikole, enhancing its visibility and appeal. The project was completed within a span of 2-3 weeks, utilizing HTML, CSS, and JavaScript to create an engaging and user-friendly interface that highlights the unique features and attractions of the forest.',
        buttons: [
            { text: 'GitHub', link: 'https://github.com/Horizon2509/FRONTEND' },
        ]
    },
    {
        title: 'MRS Architect',
        image: 'img/ClassificationAll.png',
        languages: 'HTML, CSS, JavaScript, Laravel',
        description: 'Website Portofolio MRS Architect',
        buttons: [
            { text: 'GitHub', link: 'https://github.com/GeorgeWeilisJunior/UAS-BackEnd-Arsitek' },
        ]
    },
    {
        title: 'Urban vs Greenery Classification',
        image: 'img/ClassificationAll.png',
        languages: 'MATLAB',
        description: "The Urban vs Greenery Classification project employs K-Nearest Neighbors (K-NN) algorithm to differentiate between urban and greenery images. For training, the model utilizes 30 images from urban environments and 30 from natural greenery settings. The classification is based on the predominant colors present in the images, where greenery images predominantly exhibit green hues, while urban images are characterized by shades of gray, brown, and black. Developed using MATLAB, this project showcases the effectiveness of color analysis in image classification.",
        buttons: [
            { text: 'Docs', link: 'https://drive.google.com/file/d/1zfsV9KkQgOteLNBvhjMaoJxCEMF8rARl/view?usp=sharing' },
        ]
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

    // Adjust cardsToShow based on screen width
    const currentCardsToShow = 
        window.innerWidth < 768 ? 1 :
        window.innerWidth < 1024 ? 2 : 
        cardsToShow;

    for (let i = 0; i < currentCardsToShow; i++) {
        const projectIndex = (currentIndex + i) % projects.length;
        const project = projects[projectIndex];

        // Create the project card
        const card = document.createElement('div');
        card.classList.add('project-card');
        card.onclick = () => openModal(project);
        
        card.innerHTML = `
            <div class="image-container">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="card-content">
                <h3>${project.title}</h3>
                <p>${project.languages}</p>
            </div>
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
    'Worldle': ["img/Wordle.png", "img/Wordle2.png", "img/Wordle3.png"],
    'Wizdrawal': ["img/Wizdrawal.jpg", "img/Wizdrawal2.jpg", "img/Wizdrawal3.jpg"],
    'Retro Hardware Store': ["img/Retro.png", "img/Retro2.png", "img/Retro3.png", "img/Retro4.png"],
    'Orchid Forest Cikole': ["img/Orchid.jpg", "img/Orchid4.jpg", "img/Orchid3.jpg", "img/Orchid2.jpg"],
    'MRS Architect': ["image1.jpg", "image2.jpg", "image3.jpg"],
    'Urban vs Greenery Classification': ["img/Classification.png", "img/Classification2.png", "img/Classification3.png"]
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

    // Define a mapping of button text to local image assets
    const logoUrls = {
        "GitHub": "img/GithubLogo.png", // Local asset for GitHub logo
        "Figma": "img/FigmaLogo.png", // Local asset for Figma logo
        "Docs": "img/DocsLogo.png" // Local asset for Docs logo
    };
    // Create and populate buttons in the modal
    const modalButtonsContainer = document.querySelector('.modal-buttons');
    modalButtonsContainer.innerHTML = ''; // Clear previous buttons

    project.buttons.forEach(button => {
        const btn = document.createElement('button');

        // Check if there’s a logo URL for the button text
        const logoUrl = logoUrls[button.text];
        if (logoUrl) {
            btn.style.backgroundImage = `url(${logoUrl})`;
            btn.style.backgroundSize = 'contain';
            btn.style.backgroundRepeat = 'no-repeat';
            btn.style.backgroundPosition = 'center';
            btn.textContent = ''; // Clear text if you only want the image
        } else {
            btn.textContent = button.text; // Use text if there's no specific logo
        }

        // Set button click event to open link in new tab
        btn.onclick = () => window.open(button.link, '_blank');
        
        // Append the button to the container
        modalButtonsContainer.appendChild(btn);
    });

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

window.addEventListener('resize', updateCarousel);

const sections = document.querySelectorAll('section');

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('slide-up');
            observer.unobserve(entry.target);  // Stop observing after animation
        }
    });
}, options);

sections.forEach(section => {
    observer.observe(section);
});

