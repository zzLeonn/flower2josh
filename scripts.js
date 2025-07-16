// Remove the "not-loaded" class after 1 second
window.onload = () => {
  setTimeout(() => {
    document.body.classList.remove("not-loaded");
  }, 1000);
};

// Music functionality - Modified for single track
const audioElement = document.getElementById("bgMusic");
const songTitleElement = document.getElementById("song-title");

if (!audioElement) {
  console.error("Audio element with ID 'bgMusic' not found.");
} else {
  // Set fixed music file
  const musicFile = {
    name: "Troye Sivan - 10/10",
    file: "music/10troye.mp3"
  };

  function updateSong() {
    audioElement.src = musicFile.file;
    songTitleElement.innerText = `Track: ${musicFile.name}`;
    
    // Set start time when metadata is loaded
    const onLoaded = () => {
      if (audioElement.duration > 30) {
        audioElement.currentTime = 30;
      }
      audioElement.removeEventListener('loadedmetadata', onLoaded);
    };
    audioElement.addEventListener('loadedmetadata', onLoaded);
  }

  // Set initial song and title
  updateSong();

  audioElement.addEventListener("ended", () => {
    audioElement.currentTime = 30;
    audioElement.play();
  });

  // Ensure autoplay works on first click
  audioElement.volume = 0.5;
  document.addEventListener("click", () => {
    if (audioElement.paused) {
      audioElement.play().then(() => {
        if (audioElement.currentTime < 31) {
          audioElement.currentTime = 31;
        }
      }).catch(err => console.error("Audio play failed:", err));
    }
  }, { once: true });
}

// Create fireflies clustered around a center
function createFireflies(numFireflies = 20) {
  let container = document.querySelector('.fireflies');
  if (!container) {
    container = document.createElement('div');
    container.classList.add('fireflies');
    document.body.appendChild(container);
  }

  container.innerHTML = "";

  const centerX = 50;
  const centerY = 70;

  for (let i = 0; i < numFireflies; i++) {
    const firefly = document.createElement('div');
    firefly.classList.add('firefly');

    const maxRadius = 30;
    const radius = Math.random() * maxRadius;
    const angle = Math.random() * 2 * Math.PI;
    const offsetX = radius * Math.cos(angle);
    const offsetY = radius * Math.sin(angle);

    let posX = Math.max(0, Math.min(100, centerX + offsetX));
    let posY = Math.max(0, Math.min(100, centerY + offsetY));

    const duration = (Math.random() * 3 + 2).toFixed(1) + 's';
    const delay = (Math.random() * 3).toFixed(1) + 's';

    firefly.style.setProperty('--x', `${posX}%`);
    firefly.style.setProperty('--y', `${posY}%`);
    firefly.style.setProperty('--d', duration);
    firefly.style.setProperty('--delay', delay);

    container.appendChild(firefly);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  createFireflies(40);

  // Typewriter effect for messages
  const messages = [
    "hey pookie, <3",
    "happy valentine’s day.",
    "thank you for always being supportive and loving.",
    "i wish i was right beside you now.",
    "i’ll always cherish and be here for you.",
    "you mean so much to me."
  ];

  let index = 0;
  let charIndex = 0;
  const speed = 50;
  const delayBetweenMessages = 1500;
  const messageContainer = document.querySelector(".text");

  if (!messageContainer) {
    console.error("Message container not found");
    return;
  }

  function typeWriter() {
    if (index < messages.length) {
      if (charIndex < messages[index].length) {
        messageContainer.textContent += messages[index].charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, speed);
      } else {
        if (index < messages.length - 1) {
          setTimeout(() => {
            messageContainer.textContent = "";
            charIndex = 0;
            index++;
            typeWriter();
          }, delayBetweenMessages);
        }
      }
    }
  }

  const handleAnimationEnd = (e) => {
    if (e.animationName === "fadeIn") {
      typeWriter();
      messageContainer.removeEventListener("animationend", handleAnimationEnd);
    }
  };

  messageContainer.addEventListener("animationend", handleAnimationEnd);
});