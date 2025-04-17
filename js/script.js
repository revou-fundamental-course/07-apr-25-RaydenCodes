// Welcome text
const welcomeText = document.getElementById('welcomeText');
const userName = prompt("Hi there! What's your name?");
welcomeText.textContent = `Hi ${userName}!`;

// Smooth Scroll sudah otomatis dari CSS scroll-behavior: smooth

// Form validation & show value
const form = document.getElementById('contactForm');
form.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('nameInput').value;
  const email = document.getElementById('emailInput').value;
  const message = document.getElementById('messageInput').value;

  if (name && email && message) {
    document.getElementById('formResult').innerHTML = `
      Thank you, <b>${name}</b>! <br>
      Your message: "${message}" has been sent to <b>${email}</b>.
    `;
    form.reset();
  } else {
    alert('Please fill all the fields!');
  }
});
