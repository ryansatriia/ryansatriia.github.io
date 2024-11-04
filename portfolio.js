// Sample project data
const projects = [
    {
        title: 'Worldle',
        image: '/img/Wordle.png', // Ensure this path is correct
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
}

function openModal(project) {
    const modal = document.getElementById('project-modal');
    document.getElementById('modal-image').src = project.image;
    document.getElementById('modal-title').innerText = project.title;
    document.getElementById('modal-languages').innerText = project.languages;
    document.getElementById('modal-description').innerText = project.description;
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('project-modal').style.display = 'none';
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

// Initialize carousel
updateCarousel();
setInterval(nextProjects, 5000); // Automatically move to the next set every 5 seconds

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
