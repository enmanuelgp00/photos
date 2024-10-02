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
adjustPicHeight()
input.addEventListener("change", () => {
    index = 0
    showPicture(index)
})
viewPicture.getElement().addEventListener("transitionstart", function () {
    const interval = setInterval(() => {
        showZoomInfo()
    }, 100)

    viewPicture.getElement().addEventListener("transitionend", function () {
        clearInterval(interval)
        showZoomInfo()
    }, { once: true })
})
viewPicTitle.addEventListener("selectionstart", (event) => {
    alert("seletion")
    event.preventDefault()
})
btnNextSpace.addEventListener("click", () => {
    showNextPicture()
})
btnPrevSpace.addEventListener("click", function () {
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
btnFullscreen.addEventListener("click", function () {
    if (viewPicture.isOverflowHidden()) {
        hideBars()
    }
})
document.addEventListener("keydown", function (eDown) {
    if (!viewframePic.isOverflowHidden()) {
        if (eDown.key == "Escape") {
            showBars()
        }
    }
})

btnRotatePic.addEventListener("click", function () {
    factor = 90
    angle = viewPicture.getRotation() + factor
    rotatePicRight(angle)
})

btnZoomIn.addEventListener("click", zoomIn)
btnZoomOut.addEventListener("click", zoomOut)
btnZoomFit.addEventListener("click", function () {
    // let left = parseFloat(viewPicture.style.left.replace("px", ""))
    // let top = parseFloat(viewPicture.style.top.replace("px", ""))
    // viewPicture.setTranslation(-left, -top )
    viewPicture.setDefault("all")
    // let interval = setInterval(() => {        
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

btnHeart.addEventListener("click", function () {
    if (btnHeartImg.src.includes("/src/icons/heart_empty_white_1.png")) {
        btnHeartImg.src = "./src/icons/heart_full_white_0.png"
    } else {
        btnHeartImg.src = "./src/icons/heart_empty_white_1.png"
    }
})


