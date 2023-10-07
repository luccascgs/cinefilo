//BUTTONS
const howtoplay = document.getElementById('howtoplay');
const info = document.getElementById('info');
// const daily = document.getElementById('daily');
const overlay = document.getElementById("overlay");

//MODAL CONFIG
howtoplay.addEventListener('click', function () {
    document.getElementById("howtoplayModal").style.display = "block";
    overlay.style.display = "block";
})
info.addEventListener('click', function () {
    document.getElementById("infoModal").style.display = "block";
    overlay.style.display = "block";
})
// daily.addEventListener('click', function () {
//     document.getElementById("dailyModal").style.display = "block";
//     overlay.style.display = "block";
// })

overlay.addEventListener('click', function () {
    document.getElementById("howtoplayModal").style.display = "none";
    document.getElementById("infoModal").style.display = "none";
    // document.getElementById("dailyModal").style.display = "none";
    overlay.style.display = "none";
})

//RESIZE
function setWindowWidth() {
    const height = `${window.innerHeight - 50}px`;
    document.getElementById('container').style.height = height;
}
window.addEventListener("resize", setWindowWidth, false);
setWindowWidth();
