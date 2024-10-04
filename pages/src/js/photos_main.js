/*
    * cursor whait while loading media
    * Drag directly on image if cursor gets out of it, stops dragging

*/
let index = 0
let viewPicImg = viewMedia.getElement()
let defaultMedia = { name: "Gallery", url: viewPicImg.src }
let isDragging = false
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
showAndHide(btnNextSpace, 2000)
showAndHide(btnPrevSpace, 2000)
adjustPicHeight()

inputMedia.addEventListener("change", () => {
    index = 0
    showMedia(index)
})

// keep showing the zoom info until the transition ends

viewPicImg.addEventListener("transitionstart", function () {
    const interval = setInterval(() => {
        showZoomInfo()
    }, 100)

    viewPicImg.addEventListener("transitionend", function () {
        clearInterval(interval)
        showZoomInfo()
    }, { once: true })
})

btnNextSpace.addEventListener("click", () => {
    showNextMedia()
})
btnPrevSpace.addEventListener("click", function () {
    showPrevMedia()
})

btnShift.addEventListener("click", function () {
    showRandomPic()
})
btnShift.addEventListener("mouseover", () => {
    btnShift.querySelector("img").style.transform = "rotate(180deg)"
})
btnShift.addEventListener("mouseout", () => {
    btnShift.querySelector("img").style.transform = "rotate(0deg)"
})


/*
    manipulating image
*/
btnFullscreen.addEventListener("click", function () {
    if (viewMedia.isOverflowHidden()) {
        hideBars()
        btnShift.classList.add("visibleOnHover")
    }
})
document.addEventListener("keydown", function (eDown) {

    if (!viewframePic.isOverflowHidden()) {
        if (eDown.key == "Escape") {
            showBars()
            btnShift.classList.remove("visibleOnHover")
        }
    }
})
framePic.addEventListener("dblclick", () => {
    if (viewMedia.isOverflowHidden()) {
        hideBars()
        btnShift.classList.add("visibleOnHover")
    } else {
        showBars()
        btnShift.classList.remove("visibleOnHover")
    }
})

btnRotatePic.addEventListener("click", function () {
    factor = 90
    angle = viewMedia.getRotation() + factor
    rotatePicRight(angle)
})

btnZoomIn.addEventListener("click", () => { zoomIn(0.2) })
btnZoomOut.addEventListener("click", () => { zoomOut(0.2) })
btnZoomFit.addEventListener("click", () => { zoomFit() })

/*
    zooming in/out image with the mouse wheel
*/
let wheelCount = 0.1
let intervalWheelCount = setInterval(() => {
    wheelCount = 0.1
}, 500)
framePic.addEventListener("wheel", function (event) {

    if (event.deltaY < 0) {
        zoomIn(0.2 * wheelCount)
    } else {
        zoomOut(0.2 * wheelCount)
    }
    wheelCount += 0.5
})
/*
    Moving image
*/
let startX, startY
let transX, transY
framePic.addEventListener("mousedown", function (eCursor) {
    if(eCursor.button != 2) {

        isDragging = true
        startX = eCursor.clientX
        startY = eCursor.clientY
        viewMedia.hideTransition("transform")
        viewMedia.style.transition = "none"
    
        transX = viewMedia.getTranslationX()
        transY = viewMedia.getTranslationY()
    
        btnNextSpace.style.visibility = "hidden"
        btnPrevSpace.style.visibility = "hidden"
        btnNextSpace.querySelector("div").style.visibility = "hidden"
        btnPrevSpace.querySelector("div").style.visibility = "hidden"
    
        viewPicImg.style.cursor = "grab"
    }

})
framePic.addEventListener("mousemove", function (eCursor) {
    if (isDragging) {
        let distX = startX - eCursor.clientX
        let distY = startY - eCursor.clientY
        let posX = transX - distX
        let posY = transY - distY
        viewMedia.setTranslation(posX, posY)
        viewMedia.style.cursor = "grabbing"
        viewPicImg.style.cursor = "grabbing"
        viewPicImg.classList.add("underParent")
    }
})
framePic.addEventListener("mouseup", function () {
    viewMedia.showTransition()

    btnNextSpace.style.visibility = "visible"
    btnPrevSpace.style.visibility = "visible"
    isDragging = false

    viewMedia.style.cursor = "default"
    viewPicImg.style.cursor = "grab"
})

framePic.addEventListener("mouseout", function () {
    btnNextSpace.style.visibility = "visible"
    btnPrevSpace.style.visibility = "visible"
    btnNextSpace.querySelector("div").style.visibility = "visible"
    btnPrevSpace.querySelector("div").style.visibility = "visible"
    viewMedia.showTransition()
    isDragging = false
})

// menu options
btnHeart.addEventListener("click", function () {
    if (btnHeartImg.src.includes("/src/icons/heart_empty_white_1.png")) {
        btnHeartImg.src = "./src/icons/heart_full_white_0.png"
    } else {
        btnHeartImg.src = "./src/icons/heart_empty_white_1.png"
    }
})

btnTrashCan.addEventListener("click", () => {
    window.open(media.getURL())
})

btnClose.addEventListener("click", reset )

// fmcontextmenu
framePic.addEventListener("contextmenu", (e) => {
    let rect = framePic.getBoundingClientRect()
    fMCntxtMenu.style.left = `${e.clientX - rect.left}px`
    fMCntxtMenu.style.top  = `${e.clientY - rect.top}px`
    showElement(fMCntxtMenu) //.style.display = "flex"
})
btnFMCntxtMenuOpen.addEventListener("click", () => {
    inputMedia.click()
})
handleEventOutSide("click", fMCntxtMenu, () => {
    if(fMCntxtMenu.style.display != "none") {    
        hideElement(fMCntxtMenu)
    }
})
btnFMCntxtMenuClose.addEventListener("click", ()=>{
    reset()
    hideElement(fMCntxtMenu)
})