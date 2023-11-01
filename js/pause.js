const pauseButton = document.getElementById("pause-button");
const pauseMenu = document.getElementById("pause-menu");
const resumeButton = document.getElementById("resume-button");
const restartButton = document.getElementById("restart-button");

let isPaused = false;
function togglePauseMenu() {
    if (isPaused) {
        pauseMenu.style.display = "none";
        isPaused = false;
    } else {
        pauseMenu.style.display = "block";
        isPaused = true;
    }
}

pauseButton.addEventListener("click", togglePauseMenu);
resumeButton.addEventListener("click", togglePauseMenu);

restartButton.addEventListener("click", () => {
    window.location.reload();
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        togglePauseMenu();
    }
});
