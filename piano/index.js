const pianoKeys = document.querySelectorAll(".piano-keys .key"),
      volumeSlider = document.querySelector(".volume-slider input"),
      keysCheckbox = document.querySelector(".keys-checkbox input");

let allKeys = Array.from(pianoKeys).map(key => key.dataset.key);
let pressedKeys = {}; // To prevent repeated key presses

const playTune = (key) => {
    const audio = new Audio(`sounds/${key}.wav`);
    audio.volume = volumeSlider.value; // Apply current volume
    audio.play();

    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    clickedKey.classList.add("active");
    setTimeout(() => clickedKey.classList.remove("active"), 150);
};

pianoKeys.forEach(key => {
    key.addEventListener("click", () => playTune(key.dataset.key));
    key.addEventListener("touchstart", () => playTune(key.dataset.key)); // Mobile support
});

const handleVolume = (e) => {
    localStorage.setItem("pianoVolume", e.target.value); // Save volume setting
};

const showHideKeys = () => {
    pianoKeys.forEach(key => key.classList.toggle("hide"));
};

const pressedKey = (e) => {
    if (allKeys.includes(e.key) && !pressedKeys[e.key]) {
        pressedKeys[e.key] = true;
        playTune(e.key);
    }
};

const releasedKey = (e) => {
    pressedKeys[e.key] = false;
};

// Restore saved volume setting
const savedVolume = localStorage.getItem("pianoVolume");
if (savedVolume) volumeSlider.value = savedVolume;

keysCheckbox.addEventListener("click", showHideKeys);
volumeSlider.addEventListener("input", handleVolume);
document.addEventListener("keydown", pressedKey);
document.addEventListener("keyup", releasedKey);
