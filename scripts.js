// Remove the "not-loaded" class after 1 second
window.onload = () => {
  setTimeout(() => {
    document.body.classList.remove("not-loaded");
  }, 1000);
};

const audioElement = document.getElementById("bgMusic");
const songTitleElement = document.getElementById("song-title");

if (!audioElement) {
  console.error("Audio element with ID 'bgMusic' not found.");
} else {
  // Set fixed music file
  const musicFile = {
    name: "Anıl Emre Daldal - M.",
    file: "music/song.mp3"
  };

  function updateSong() {
    audioElement.src = musicFile.file;
    songTitleElement.innerText = `Track: ${musicFile.name}`;
    
    // iOS requires this to be set before playback
    audioElement.load();
    
    const onLoaded = () => {
      if (audioElement.duration > 56) {
        audioElement.currentTime = 54;
      }
      audioElement.removeEventListener('loadedmetadata', onLoaded);
    };
    audioElement.addEventListener('loadedmetadata', onLoaded);
  }

  // Set initial song and title
  updateSong();

  audioElement.addEventListener("ended", () => {
    audioElement.currentTime = 55;
    audioElement.play().catch(e => console.log("Playback failed:", e));
  });

  // iOS requires this touch event on the body
  document.body.addEventListener('touchstart', initAudio, { once: true });
  // Also keep the click event for other devices
  document.addEventListener("click", initAudio, { once: true });

  function initAudio() {
    audioElement.volume = 0.5;
    audioElement.play().then(() => {
      if (audioElement.currentTime < 31) {
        audioElement.currentTime = 31;
      }
    }).catch(err => {
      console.error("Audio play failed:", err);
      // Show a play button if automatic play fails
      showIOSPlayButton();
    });
  }

  function showIOSPlayButton() {
    const playBtn = document.createElement('button');
    playBtn.textContent = 'Tap to Play Music';
    playBtn.style.position = 'fixed';
    playBtn.style.bottom = '20px';
    playBtn.style.left = '50%';
    playBtn.style.transform = 'translateX(-50%)';
    playBtn.style.padding = '10px 20px';
    playBtn.style.zIndex = '1000';
    playBtn.addEventListener('click', () => {
      audioElement.play();
      playBtn.remove();
    });
    document.body.appendChild(playBtn);
  }
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
    "hey aşkım,",
    "it’s a shame we fell off this way.",
    "i hope you know i’ll always love you from afar.",
    "take care and stay happy.",
    "seni seviyorum."
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
  messageContainer.style.opacity = '1';
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