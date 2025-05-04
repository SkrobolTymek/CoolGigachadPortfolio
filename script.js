document.addEventListener('DOMContentLoaded', function() {
    const projects = [
        {
            title: "Gooncord",
            description: "An experimental Discord-inspired chat platform using Rust backend, Supabase for real-time database features, and a lightweight web_view frontend. Built for chaotic stress-testing with custom protocols and random user bans.",
            technologies: ["Rust", "Supabase", "web_view"],
            codeUrl: "https://github.com/xFerrix/GooncordPublic",
        },
        {
            title: "File Explorer",
            description: "A fast, custom file manager written in Rust, using egui for the graphical interface. Designed for speed and simplicity with a keyboard-driven workflow, ideal for Linux power users.",
            technologies: ["Rust", "egui", "Linux"],
            codeUrl: "https://github.com/xFerrix/Explorator-plikow",
        },
        {
            title: "Void Engine",
            description: "An upcoming 2D game engine written in Rust, designed to make building platformers and action games easy. Features a built-in level editor where you can place blocks, platforms, and enemies to build maps visually — then export and play instantly with WebAssembly.",
            technologies: ["Rust", "ECS", "WebAssembly", "2D Editor"],
            codeUrl: "#",
        },        
        {
            title: "Secret Project",
            description: "A mysterious experiment in progress. More details coming soon... or maybe not.",
            technologies: ["Classified", "Experimental", "Cutting-edge"],
            codeUrl: "#",
            hidden: true
        }
    ];
    

    const projectsGrid = document.querySelector('.projects-grid');
    const themeToggle = document.querySelector('.theme-toggle');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    const easterEggTrigger = document.querySelector('.easter-egg-trigger');
    const currentYear = document.querySelector('.year');

    renderProjects();
    setCurrentYear();
    setupEventListeners();

    function renderProjects() {
        projectsGrid.innerHTML = '';

        projects.forEach(project => {
            if (project.hidden && !localStorage.getItem('easterEggFound')) return;

            const projectCard = document.createElement('div');
            projectCard.className = `project-card ${project.hidden ? 'hidden-project' : ''}`;

            projectCard.innerHTML = `
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <a href="${project.codeUrl}" target="_blank" class="code-link">View Code</a>
                    </div>
                </div>
            `;

            projectsGrid.appendChild(projectCard);
        });
    }

    function setCurrentYear() {
        currentYear.textContent = new Date().getFullYear();
    }

    function setupEventListeners() {
        themeToggle.addEventListener('click', toggleTheme);

        hamburger.addEventListener('click', toggleMobileMenu);

        window.addEventListener('scroll', handleScroll);

        easterEggTrigger.addEventListener('click', revealEasterEgg);

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });

                    if (navLinks.classList.contains('active')) {
                        toggleMobileMenu();
                    }
                }
            });
        });
    }

    function toggleTheme() {
        const isDark = document.body.getAttribute('data-theme') !== 'light';
        document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
        themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', isDark ? 'light' : 'dark');
    }

    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    }

    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    function revealEasterEgg() {
        if (!localStorage.getItem('easterEggFound')) {
            localStorage.setItem('easterEggFound', 'true');
            easterEggTrigger.textContent = 'Secret unlocked! Refresh to see.';
            easterEggTrigger.style.color = 'var(--accent)';

            const notification = document.createElement('div');
            notification.textContent = 'Secret project unlocked!';
            notification.style.position = 'fixed';
            notification.style.bottom = '20px';
            notification.style.left = '50%';
            notification.style.transform = 'translateX(-50%)';
            notification.style.backgroundColor = 'var(--accent)';
            notification.style.color = 'white';
            notification.style.padding = '10px 20px';
            notification.style.borderRadius = '50px';
            notification.style.zIndex = '1000';
            notification.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
            document.body.appendChild(notification);

            setTimeout(() => {
                notification.style.opacity = '0';
                notification.style.transition = 'opacity 0.5s';
                setTimeout(() => notification.remove(), 500);
            }, 3000);
        }
    }

    if (localStorage.getItem('theme') === 'light') {
        document.body.setAttribute('data-theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    if (localStorage.getItem('easterEggFound')) {
        easterEggTrigger.textContent = 'Secret unlocked!';
        easterEggTrigger.style.color = 'var(--accent)';
        renderProjects();
    }
});
