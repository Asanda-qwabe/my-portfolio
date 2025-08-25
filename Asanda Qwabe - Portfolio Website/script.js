
// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Typed.js initialization
const typed = new Typed('#typed-text', {
    strings: [
        'Software Developer',
        'Full Stack Engineer',
        'AI Enthusiast', 
        'Quality Assurance Expert',
        'Problem Solver'
    ],
    typeSpeed: 80,
    backSpeed: 50,
    backDelay: 2000,
    loop: true,
    showCursor: true,
    cursorChar: '|'
});

// Mobile menu functionality
let mobileMenuOpen = false;

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const toggleIcon = document.querySelector('.nav-toggle i');
    
    mobileMenuOpen = !mobileMenuOpen;
    
    if (mobileMenuOpen) {
        mobileMenu.classList.add('active');
        toggleIcon.className = 'bx bx-x';
    } else {
        mobileMenu.classList.remove('active');
        toggleIcon.className = 'bx bx-menu';
    }
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const toggleIcon = document.querySelector('.nav-toggle i');
    
    mobileMenuOpen = false;
    mobileMenu.classList.remove('active');
    toggleIcon.className = 'bx bx-menu';
}

// Navigation active link update
function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}

// Smooth scrolling for navigation
document.querySelectorAll('.nav-link, .footer-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        // Close mobile menu if open
        if (mobileMenuOpen) {
            closeMobileMenu();
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 10, 10, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
        header.style.boxShadow = 'none';
    }
    updateActiveNav();
});

// Theme toggle functionality
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.querySelector('.theme-toggle i');
    
    body.classList.toggle('light-theme');
    
    if (body.classList.contains('light-theme')) {
        themeIcon.className = 'bx bx-sun';
    } else {
        themeIcon.className = 'bx bx-moon';
    }
}

// AI Assistant functionality
let aiChatOpen = false;
const aiResponses = {
    skills: "Asanda is proficient in Python, Java, C#, JavaScript, and many other technologies. He specializes in full-stack development, AI integration, and quality assurance.",
    projects: "Some of Asanda's notable projects include HomeAccess App (tenant management), Maze Solver AI (pathfinding algorithms), and Secure Face Wallet (biometric security).",
    experience: "Asanda recently completed his Software Engineering program at WeThinkCode_ in 2024 and has hands-on experience in software development, testing, and modern development practices like TDD and DevOps.",
    contact: "You can reach Asanda through the contact form on this website, LinkedIn, or GitHub. He's always open to discussing new opportunities!",
    education: "Asanda graduated from WeThinkCode_ in 2024, where he completed an intensive 2-year software engineering program focused on practical, project-based learning and peer-to-peer methodology.",
    certifications: "Asanda has completed Software Engineering and Cloud Platform Job Simulations through Forage, covering Architecture, Security, Programming, Testing, and Agile methodologies.",
    default: "I'd be happy to help! You can ask me about Asanda's skills, projects, experience, education, certifications, or how to contact him."
};

function toggleAI() {
    const aiChat = document.getElementById('ai-chat');
    aiChatOpen = !aiChatOpen;
    
    if (aiChatOpen) {
        aiChat.classList.add('active');
    } else {
        aiChat.classList.remove('active');
    }
}

function handleAIInput(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('ai-input');
        const message = input.value.trim();
        
        if (message) {
            addAIMessage(message, 'user');
            input.value = '';
            
            // Simulate AI thinking delay
            setTimeout(() => {
                const response = generateAIResponse(message);
                addAIMessage(response, 'bot');
            }, 1000);
        }
    }
}

function addAIMessage(message, type) {
    const messagesContainer = document.getElementById('ai-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-message ${type}`;
    messageDiv.textContent = message;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function generateAIResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('programming')) {
        return aiResponses.skills;
    } else if (lowerMessage.includes('project') || lowerMessage.includes('work') || lowerMessage.includes('portfolio')) {
        return aiResponses.projects;
    } else if (lowerMessage.includes('experience') || lowerMessage.includes('background') || lowerMessage.includes('career')) {
        return aiResponses.experience;
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('email')) {
        return aiResponses.contact;
    } else if (lowerMessage.includes('education') || lowerMessage.includes('school') || lowerMessage.includes('study') || lowerMessage.includes('wethinkcode')) {
        return aiResponses.education;
    } else if (lowerMessage.includes('certification') || lowerMessage.includes('certificate') || lowerMessage.includes('forage')) {
        return aiResponses.certifications;
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        return "Hello! I'm here to help you learn more about Asanda. What would you like to know about his skills, projects, experience, education, or certifications?";
    } else {
        return aiResponses.default;
    }
}

// Contact form handling
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simulate form submission
    const button = this.querySelector('.btn');
    const originalText = button.innerHTML;
    
    button.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = '<i class="bx bx-check"></i> Message Sent!';
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
            this.reset();
        }, 2000);
    }, 2000);
});

// Click outside to close mobile menu
document.addEventListener('click', (e) => {
    const mobileMenu = document.getElementById('mobile-menu');
    const navToggle = document.querySelector('.nav-toggle');
    const navContainer = document.querySelector('.nav-container');
    
    if (mobileMenuOpen && !navContainer.contains(e.target)) {
        closeMobileMenu();
    }
});

// Close mobile menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && mobileMenuOpen) {
        closeMobileMenu();
    }
});

// Console message
console.log(`
╔══════════════════════════════════════╗
║          Welcome to Asanda's         ║
║            Portfolio!                ║
║                                      ║
║   Built with modern web technologies ║
║   and a passion for clean code       ║
║                                      ║
║   Want to see the source?            ║
║   Check out the GitHub repo!         ║
╚══════════════════════════════════════╝
`);
    