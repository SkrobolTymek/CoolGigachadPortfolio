const bootLines = [
  "Booting Portfolio v2.0...",
  "[✓] Memory allocator initialized",
  "[✓] Core systems online",
  "[✓] Loading developer profile...",
  "[✓] Mounting projects directory",
  "[✓] Establishing secure connections",
  "[✓] Rendering UI components",
  "System ready in 0.042s",
  "Welcome, User"
];

const bootScreen = document.getElementById("boot-screen");
const mainContent = document.getElementById("main-content");
const cursor = document.querySelector(".cursor");

function simulateTyping() {
  let i = 0;
  let lineIndex = 0;
  let currentLine = "";
  const typingSpeed = 50; 
  const lineDelay = 500;

  function type() {
    if (lineIndex < bootLines.length) {
      if (i < bootLines[lineIndex].length) {
        currentLine += bootLines[lineIndex].charAt(i);
        const lines = bootScreen.querySelectorAll(".boot-line");
        lines[lineIndex].textContent = currentLine;
        i++;
        setTimeout(type, typingSpeed);
      } else {
        lineIndex++;
        i = 0;
        currentLine = "";
        if (lineIndex < bootLines.length) {
          const newLine = document.createElement("div");
          newLine.className = "boot-line";
          bootScreen.appendChild(newLine);
        }
        setTimeout(type, lineDelay);
      }
    } else {
      cursor.style.display = "none";
      setTimeout(() => {
        
        bootScreen.style.opacity = "0";
        setTimeout(() => {
          bootScreen.style.display = "none";
          mainContent.style.display = "block";
          setTimeout(() => {
            mainContent.style.opacity = "1";
            createParticles();
          }, 100);
        }, 500);
      }, 1000);
    }
  }

  type();
}
document.addEventListener('keydown', function(e) {
if (e.code === 'Space' && bootScreen.style.display !== 'none') {
e.preventDefault();
skipBootSequence();
}
});

function skipBootSequence() {
const bootScreen = document.getElementById('boot-screen');
const mainContent = document.getElementById('main-content');

const lines = bootScreen.querySelectorAll('.boot-line');
lines.forEach(line => {
line.style.animation = 'none';
line.style.opacity = '1';
});

lines.forEach((line, index) => {
line.textContent = bootLines[index] || '';
});

const cursor = document.querySelector('.cursor');
if (cursor) cursor.style.display = 'none';

bootScreen.style.opacity = '0';
setTimeout(() => {
bootScreen.style.display = 'none';
mainContent.style.display = 'block';
setTimeout(() => {
  mainContent.style.opacity = '1';
  createParticles();
}, 100);
}, 500);
}

function createParticles() {
  const particlesContainer = document.getElementById("particles-js");
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    
    const size = Math.random() * 2 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
    
    particle.style.opacity = Math.random() * 0.5 + 0.1;
    
    particlesContainer.appendChild(particle);
  }
}

window.onload = simulateTyping;

document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("mouseenter", () => {
    card.querySelector(".project-title").classList.add("glitch");
  });
  
  card.addEventListener("mouseleave", () => {
    card.querySelector(".project-title").classList.remove("glitch");
  });
});