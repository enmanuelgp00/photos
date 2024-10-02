// import {Picture} from "./classes.js";



// console.log(window.innerWidth)
// allow picture to resize setting the picture frame in to the window



let index = 0
let files = new Array()

let zoom = 1
let isDragging = false
let maxHeight = 0

let startX, startY
let startLeft, startTop

let eventNames = ["selectionstart", "dragstart", "contextmenu"]
let allElements = document.querySelectorAll("#wrapper *")
for (let elmt of allElements) {
    for (let evntNm of eventNames) {
        elmt.addEventListener(evntNm, (event) => {
            event.preventDefault()
        })
    }
}


window.addEventListener("resize", () => {
    // adjustPicHeight()
})

const viewPicture = new View(document.getElementById("view_picture"));
viewPicture.getElement().addEventListener("transitionstart", function () {
    const interval = setInterval(() => {
        showZoomInfo()
    }, 100)

    viewPicture.getElement().addEventListener("transitionend", function () {
        clearInterval(interval)
        showZoomInfo()
    }, { once: true })
})
/* viewPicture.getElement().addEventListener("contextmenu", (event)=>{
    event.preventDefault() // evita mostrar el contextmenu de la imagen al arrastrar con el click derecho
}) */


const viewPicTitle = document.getElementById("picture_title")
const viewZoomPercent = document.getElementById("zoom_percent")


const btnNext = document.getElementById("btn_next")
btnNext.addEventListener("click", () => {
    showNextPicture()
})
const btnPrev = document.getElementById("btn_previous")
btnPrev.addEventListener("click", function () {
    showPrevPicture()
})
// const btnShift = document.getElementById("btn_menu_shift")
// btnShift.addEventListener("click", function () {
//     showRandomPic()
// })
const btnFullscreen = document.getElementById("btn_fullscreen")
btnFullscreen.addEventListener("click", function () {
    if (viewPicture.isOverflowHidden()) {
        hideBars()
    }
})
// listening to ESC button to close fullscreen mode
document.addEventListener("keydown", function (eDown) {
    if (!viewPicture.isOverflowHidden()) {
        if (eDown.key == "Escape") {
            showBars()
        }
    }
})

const menuBar = document.getElementById("menu_bar")
const footerBar = document.getElementById("footer_bar")

viewPicTitle.addEventListener("selectionstart", (event) => {
    alert("seletion")
    event.preventDefault()
})


const btnRotatePic = document.getElementById("btn_rotate")
btnRotatePic.addEventListener("click", function () {
    factor = 90
    angle = viewPicture.getRotation() + factor
    rotatePic(angle)
})

const btnZoomFit = document.getElementById("btn_zoom_fit")
const btnZoomIn = document.getElementById("btn_zoom_in")
const btnZoomOut = document.getElementById("btn_zoom_out")

btnZoomIn.addEventListener("click", zoomIn)
btnZoomOut.addEventListener("click", zoomOut)
btnZoomFit.addEventListener("click", function () {
    // adjustPicHeight()
    viewPicture.style.top = 0
    viewPicture.style.left = 0
    viewPicture.setDefault("all")
    showZoomInfo()
    // zoom = 1
    // viewPicture.style.scale = zoom
    // rotation = 0
    // viewPicture.style.transform = "rotate("+ rotation +"deg)"

})

const btnHeart = document.getElementById("btn_heart")
const btnHeartImg = document.querySelector("#btn_heart img")
btnHeart.addEventListener("click", function () {
    if (btnHeartImg.src.includes("/src/icons/heart_empty_white_1.png")) {
        btnHeartImg.src = "./src/icons/heart_full_white_0.png"
    } else {
        btnHeartImg.src = "./src/icons/heart_empty_white_1.png"
    }
})

const input = document.getElementById("input_pics")
input.addEventListener("change", () => {
    index = 0
    showPicture(index)
})

const framePic = document.getElementById("frame_picture")
framePic.addEventListener("wheel", function (event) {
    if (event.deltaY < 0) {
        zoomIn()
    } else {
        zoomOut()
    }
})
framePic.addEventListener("mousedown", function (eCursor) {
    isDragging = true
    startX = eCursor.clientX
    startY = eCursor.clientY
    /*
    I could only modify the position of top and left, I was using getBoundingClientRect(), which returns the values ​​of X and Y, but not the position in correspondence top and left, then using .style.left this returned a string
    */
    startLeft = viewPicture.style.left
    startTop = viewPicture.style.top
    startLeft = startLeft.replace("px", "")
    startTop = startTop.replace("px", "")
})
framePic.addEventListener("mousemove", function (eCursor) {
    if (isDragging) {
        let distX = startX - eCursor.clientX
        let distY = startY - eCursor.clientY

        viewPicture.style.left = startLeft - distX + "px"
        viewPicture.style.top = startTop - distY + "px"

    }
})
framePic.addEventListener("mouseup", function () {
    isDragging = false
})
