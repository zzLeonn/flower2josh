// Universal Audio + Text + Fireflies Handler
(() => {
  // ——— Audio Setup ———
  const audioElement     = document.getElementById('bgMusic');
  const songTitleElement = document.getElementById('song-title');
  const musicFile        = { name: "Anıl Emre Daldal – M.", file: "music/song.mp3" };
  let   userInteracted   = false;
  let   isPlaying        = false;

  function initAudio() {
    audioElement.src      = musicFile.file;
    audioElement.preload  = 'metadata';
    audioElement.volume   = 0.5;
    songTitleElement.textContent = `Track: ${musicFile.name}`;

    // Once metadata is loaded, seek to 54s (or 30s if duration < 56)
    audioElement.addEventListener('loadedmetadata', () => {
      const startTime = audioElement.duration > 56 ? 54 : 30;
      audioElement.currentTime = startTime;
    });

    // Loop logic: when near end, jump back to startTime
    audioElement.addEventListener('timeupdate', () => {
      if (audioElement.currentTime >= audioElement.duration - 1) {
        const startTime = audioElement.duration > 56 ? 54 : 30;
        audioElement.currentTime = startTime;
        if (isPlaying) audioElement.play().catch(()=>{/*ignore*/});
      }
    });
  }

  function startAudio() {
    if (!userInteracted) return;
    audioElement.play()
      .then(() => { isPlaying = true; })
      .catch(e => console.warn("Playback blocked:", e));
  }

  // ——— Typewriter Setup ———
  const messages = [
    "hey aşkım,",
    "it’s a shame we fell off this way.",
    "i hope you know i’ll always love you from afar.",
    "take care and stay happy.",
    "seni seviyorum."
  ];
  let   msgIndex = 0, charIndex = 0;
  const speed = 50, pause = 1500;
  const container = document.querySelector('.text');
  
  function typeWriter() {
    if (msgIndex >= messages.length) return;
    if (charIndex < messages[msgIndex].length) {
      container.textContent += messages[msgIndex][charIndex++];
      setTimeout(typeWriter, speed);
    } else if (msgIndex < messages.length - 1) {
      setTimeout(() => {
        container.textContent = "";
        charIndex = 0;
        msgIndex++;
        typeWriter();
      }, pause);
    }
  }

  // ——— Fireflies Setup ———
  function createFireflies(num = 40) {
    let c = document.querySelector('.fireflies');
    if (!c) {
      c = document.createElement('div');
      c.className = 'fireflies';
      document.body.appendChild(c);
    }
    c.innerHTML = '';
    const cx = 50, cy = 70, maxR = 30;
    for (let i = 0; i < num; i++) {
      const f = document.createElement('div');
      f.className = 'firefly';
      const r = Math.random() * maxR;
      const θ = Math.random() * 2 * Math.PI;
      f.style.setProperty('--x', `${cx + r * Math.cos(θ)}%`);
      f.style.setProperty('--y', `${cy + r * Math.sin(θ)}%`);
      f.style.setProperty('--d', `${(Math.random() * 3 + 2).toFixed(1)}s`);
      f.style.setProperty('--delay', `${(Math.random() * 3).toFixed(1)}s`);
      c.appendChild(f);
    }
  }

  // ——— User Interaction Gate ———
  function onFirstInteraction() {
    userInteracted = true;
    // remove listeners so this only fires once
    document.removeEventListener('click', onFirstInteraction);
    document.removeEventListener('touchstart', onFirstInteraction);

    startAudio();
    // Delay slightly so your fadeIn animation can complete
    container.addEventListener('animationend', typeWriter, { once: true });
  }

  // ——— Init on DOMContentLoaded ———
  document.addEventListener('DOMContentLoaded', () => {
    // kick off fireflies immediately
    createFireflies();
    // prep audio
    initAudio();
    // prep text opacity
    container.style.opacity = '1';
    // remove the loader class after a beat
    setTimeout(() => document.body.classList.remove('not-loaded'), 1000);
    // listen for user gesture
    document.addEventListener('click', onFirstInteraction);
    document.addEventListener('touchstart', onFirstInteraction);
  });

  // ——— Pause on Tab Hide ———
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && isPlaying) {
      audioElement.pause();
      isPlaying = false;
    }
  });
})();
