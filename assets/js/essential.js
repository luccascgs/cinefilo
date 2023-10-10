//BUTTONS
const overlay = document.getElementById("overlay");
const howtoplay = document.getElementById('howtoplay');
const info = document.getElementById('info');

//MODAL CONFIG
howtoplay.addEventListener('click', function () {
    document.getElementById("howtoplayModal").style.display = "block";
    overlay.style.display = "block";
})
info.addEventListener('click', function () {
    document.getElementById("infoModal").style.display = "block";
    overlay.style.display = "block";
})

overlay.addEventListener('click', function () {
    document.getElementById("howtoplayModal").style.display = "none";
    document.getElementById("infoModal").style.display = "none";
    overlay.style.display = "none";
})

//RESIZE
function setWindowWidth() {
    const height = `${window.innerHeight - 50}px`;
    document.getElementById('container').style.height = height;
}
window.addEventListener("resize", setWindowWidth, false);
setWindowWidth();
