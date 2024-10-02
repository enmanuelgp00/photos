// import {Picture} from "./classes.js";



// console.log(window.innerWidth)
// allow picture to resize setting the picture frame in to the window
/*
    work on
    zoom in out on move hover 
        it means that we should we top left movement and zoom

    
*/


let index = 0
let files = new Array()

let isDragging = false
// let maxHeight = 0

let startX, startY
let startLeft, startTop



let eventNames = [
        "dragstart",    // default: bloque fantasma
        "contextmenu", 
        "mousedown"     // default: seleccion azul para el texto
    ]
let allElements = document.querySelectorAll("#wrapper *")
for (let elmt of allElements) {
    for (let evntNm of eventNames) {
        elmt.addEventListener(evntNm, (event) => {
            event.preventDefault()
        })
    }
}

// window.addEventListener("resize", () => {
//     // adjustPicHeight()
// })

const viewZoomPercent = document.getElementById("zoom_percent")
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

const viewPicTitle = document.getElementById("picture_title")
viewPicTitle.addEventListener("selectionstart", (event) => {
    alert("seletion")
    event.preventDefault()
})

const btnNext = document.getElementById("btn_next")
const btnPrev = document.getElementById("btn_previous")

btnNext.addEventListener("click", () => {
    showNextPicture()
})
btnPrev.addEventListener("click", function () {
    showPrevPicture()
})

// const btnShift = document.getElementById("btn_menu_shift")
// btnShift.addEventListener("click", function () {
//     showRandomPic()
// })

// listening to ESC button to close fullscreen mode


/*
    manipulating image
*/

const menuBar = document.getElementById("menu_bar")
const footerBar = document.getElementById("footer_bar")
const btnFullscreen = document.getElementById("btn_fullscreen")

btnFullscreen.addEventListener("click", function () {
    if (viewPicture.isOverflowHidden()) {
        hideBars()
    }
})
document.addEventListener("keydown", function (eDown) {
    if (!viewPicture.isOverflowHidden()) {
        if (eDown.key == "Escape") {
            showBars()
        }
    }
})

const btnRotatePic = document.getElementById("btn_rotate")
btnRotatePic.addEventListener("click", function () {
    factor = 90
    angle = viewPicture.getRotation() + factor
    rotatePicRight(angle)
})

const btnZoomIn = document.getElementById("btn_zoom_in")
const btnZoomOut = document.getElementById("btn_zoom_out")
const btnZoomFit = document.getElementById("btn_zoom_fit")

btnZoomIn.addEventListener("click", zoomIn)
btnZoomOut.addEventListener("click", zoomOut)
btnZoomFit.addEventListener("click", function () {    
    // let left = parseFloat(viewPicture.style.left.replace("px", ""))
    // let top = parseFloat(viewPicture.style.top.replace("px", ""))
    // viewPicture.setTranslation(-left, -top )
    viewPicture.setDefault("all")    
    // let interval = setInterval((), )setTimeout(() => {        
        viewPicture.style.top = 0
        viewPicture.style.left = 0
    // }, 1000) 
    showZoomInfo()
    // zoom = 1
    // viewPicture.style.scale = zoom
    // rotation = 0
    // viewPicture.style.transform = "rotate("+ rotation +"deg)"

})

/*
    zooming in/out image with the mouse wheel
*/
const framePic = document.getElementById("frame_picture")
framePic.addEventListener("wheel", function (event) {
    if (event.deltaY < 0) {
        zoomIn()
    } else {
        zoomOut()
    }
})
/*
    Moving image
*/
let transitionSaved
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
