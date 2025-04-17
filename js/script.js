
// DOM Elements
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileNav = document.querySelector('.mobile-nav');
const welcomeMessage = document.getElementById('welcome-message');
const namePrompt = document.getElementById('name-prompt');
const nameForm = document.getElementById('name-form');
const userNameInput = document.getElementById('user-name');
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const currentYear = document.getElementById('current-year');
const themeSwitcher = document.getElementById('theme-switcher');
const themeIcon = document.getElementById('theme-icon');

// Form validation elements
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const messageError = document.getElementById('message-error');

// Form submission display elements
const submittedName = document.getElementById('submitted-name');
const submittedEmail = document.getElementById('submitted-email');
const submittedMessage = document.getElementById('submitted-message');

// Global variables
let userName = '';
let isDarkMode = localStorage.getItem('darkMode') === 'true';

// Initialize the page
function init() {
  // Set the current year in the footer
  currentYear.textContent = new Date().getFullYear();
  
  // Check if user name exists in localStorage
  userName = localStorage.getItem('userName');
  
  if (userName) {
    updateWelcomeMessage(userName);
  } else {
    // Show the name prompt after a small delay
    setTimeout(() => {
      namePrompt.style.display = 'flex';
    }, 1000);
  }
  
  // Apply dark mode if enabled
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
    updateThemeIcon();
  }
  
  // Set up event listeners
  setupEventListeners();
}

// Set up all event listeners
function setupEventListeners() {
  // Navbar scroll event
  window.addEventListener('scroll', handleScroll);
  
  // Mobile menu toggle
  mobileMenuBtn?.addEventListener('click', toggleMobileMenu);
  
  // Name form submission
  nameForm?.addEventListener('submit', handleNameSubmit);
  
  // Contact form submission
  contactForm?.addEventListener('submit', handleContactSubmit);
  
  // Add click event listeners to all navigation links to close mobile menu when clicked
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
      if (mobileNav.style.display === 'block') {
        toggleMobileMenu();
      }
    });
  });
  
  // Theme switcher
  themeSwitcher?.addEventListener('click', toggleDarkMode);
}

// Handle scroll events for the navbar
function handleScroll() {
  if (window.scrollY > 50) {
    navbar.classList.remove('transparent');
  } else {
    navbar.classList.add('transparent');
  }
}

// Toggle mobile menu
function toggleMobileMenu() {
  const isOpen = mobileNav.style.display === 'block';
  
  mobileNav.style.display = isOpen ? 'none' : 'block';
  
  // Toggle menu icon
  const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
  
  if (isOpen) {
    menuIcon.style.background = '';
    menuIcon.classList.remove('active');
  } else {
    menuIcon.style.background = 'transparent';
    menuIcon.classList.add('active');
  }
}

// Toggle dark mode
function toggleDarkMode() {
  isDarkMode = !isDarkMode;
  
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
  
  localStorage.setItem('darkMode', isDarkMode);
  updateThemeIcon();
}

// Update theme icon based on current mode
function updateThemeIcon() {
  if (isDarkMode) {
    themeIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
  } else {
    themeIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
  }
}

// Handle name form submission
function handleNameSubmit(e) {
  e.preventDefault();
  
  const name = userNameInput.value.trim();
  
  if (name) {
    // Save to localStorage
    localStorage.setItem('userName', name);
    userName = name;
    
    // Update welcome message
    updateWelcomeMessage(name);
    
    // Hide the prompt
    namePrompt.style.display = 'none';
  }
}

// Update welcome message with user's name
function updateWelcomeMessage(name) {
  welcomeMessage.textContent = `Welcome to RaydenVortex, ${name}!`;
}

// Handle contact form submission
function handleContactSubmit(e) {
  e.preventDefault();
  
  // Get form data
  const formData = {
    name: contactForm.name.value.trim(),
    email: contactForm.email.value.trim(),
    message: contactForm.message.value.trim()
  };
  
  // Validate form
  if (validateContactForm(formData)) {
    // Show success message
    submittedName.textContent = formData.name;
    submittedEmail.textContent = formData.email;
    submittedMessage.textContent = formData.message;
    
    contactForm.style.display = 'none';
    formSuccess.style.display = 'block';
    
    // Reset form after 5 seconds for demo purposes
    setTimeout(() => {
      contactForm.reset();
      contactForm.style.display = 'block';
      formSuccess.style.display = 'none';
      
      // Clear error messages
      nameError.textContent = '';
      emailError.textContent = '';
      messageError.textContent = '';
    }, 5000);
  }
}

// Validate the contact form
function validateContactForm(data) {
  let isValid = true;
  
  // Reset error messages
  nameError.textContent = '';
  emailError.textContent = '';
  messageError.textContent = '';
  
  // Validate name
  if (!data.name) {
    nameError.textContent = 'Name is required';
    isValid = false;
  }
  
  // Validate email
  if (!data.email) {
    emailError.textContent = 'Email is required';
    isValid = false;
  } else if (!isValidEmail(data.email)) {
    emailError.textContent = 'Please enter a valid email address';
    isValid = false;
  }
  
  // Validate message
  if (!data.message) {
    messageError.textContent = 'Message is required';
    isValid = false;
  }
  
  return isValid;
}

// Validate email format
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Add transparent class to navbar initially
navbar.classList.add('transparent');

// Initialize the page when DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);
