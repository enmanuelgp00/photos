//interface
const picture = document.getElementById("picture")
const picTitle = document.getElementById("picture_title")
const viewZoomPercent = document.getElementById("zoom_percent")

//buttons
const btnNext = document.getElementById("btn_next")
const btnPrev = document.getElementById("btn_previous")
const btnShift = document.getElementById("btn_menu_shift")
const btnFullscreen = document.getElementById("btn_fullscreen")
const btnRotatePic = document.getElementById("btn_rotate")
const btnZoomFit = document.getElementById("btn_zoom_fit")
//bars
const menuBar = document.getElementById("menu_bar")
const footerBar = document.getElementById("footer_bar")

//frames
const framePic = document.getElementById("frame_picture")

// data
const input = document.getElementById("input_pics")
let index = 0
let files = new Array()
let isHidden = false
let zoom = 1
let rotation = 0;
let isDragging = false

let startX, startY
let startLeft, startTop

// allow picture to resize setting the picture frame in to the window
adjustPicHeight()
window.addEventListener("resize", () => {
    adjustPicHeight()
})
function adjustPicHeight() {
    //let height = framePic.parentNode.clientHeight - (footerBar.clientHeight + menuBar.clientHeight)
    //let height = framePic.parentNode.offsetHeight - (footerBar.offsetHeight + menuBar.offsetHeight)
    //let height = framePic.parentNode.getBoundingClientRect().height - (footerBar.getBoundingClientRect().height + menuBar.getBoundingClientRect().height)
    let height = picture.parentNode.getBoundingClientRect().height
    picture.style.maxHeight = height + "px"
}
function show(s) {
    console.log(s)
}
// Events
input.addEventListener("change", () => {
    index = 0
    showPicture(index)
})
btnNext.addEventListener("click", () => {
    showNextPicture()
})
btnPrev.addEventListener("click", function () {
    showPrevPicture()
})
// btnShift.addEventListener("click", function () {
//     showRandomPic()
// })
btnFullscreen.addEventListener("click", function () {
    if (!isHidden){
        hideBars()
    }
})
// listening to ESC button to close fullscreen mode
document.addEventListener("keydown", function (eDown){
    if(isHidden) {
        if(eDown.key == "Escape") {
            showBars()
        }
    }    
})
// controling zoom with the wheel
framePic.addEventListener("wheel", function (event) {
    if (event.deltaY < 0) {
        zoom +=  0.05
    } else {
        if (zoom > 0.2) {
            zoom += - 0.1
        }

    }
    picture.style.scale = zoom
    viewZoomPercent.innerHTML = (zoom * 100).toFixed(0) + "%"
})
// moving the image
framePic.addEventListener("mousedown", function (eCursor) {
    isDragging = true
    startX = eCursor.clientX
    startY = eCursor.clientY
/*
I could only modify the position of top and left, I was using getBoundingClientRect(), which returns the values ​​of X and Y, but not the position in correspondence top and left, then using .style.left this returned a string
*/
    startLeft = picture.style.left
    startTop  = picture.style.top
    startLeft = startLeft.replace("px","") 
    startTop = startTop.replace("px","")
})
framePic.addEventListener("mousemove", function (eCursor) {
    if (isDragging) {
        let distX = startX - eCursor.clientX
        let distY = startY - eCursor.clientY

        picture.style.left = startLeft - distX + "px"
        picture.style.top  = startTop - distY + "px"
        
    }
})
framePic.addEventListener("mouseup", function () {
    isDragging = false
})
btnZoomFit.addEventListener("click", function(){
    picture.style.top  = 0
    picture.style.left = 0
    zoom = 1
    picture.style.scale = zoom
})
btnRotatePic.addEventListener("click", function (){
    if (rotation == 360) {
        rotation = 0
    }
    rotation += 90
    picture.style.transform = "rotate(" + rotation + "deg)"
})


// Methos showing
function showPrevPicture() {
    if (index == 0) {
        index = input.files.length - 1
    } else {
        index--
    }
    showPicture(index)
}
function showNextPicture() {
    if (index == input.files.length - 1) {
        index = 0
    } else {
        index++
    }
    showPicture(index)
}
function showPicture(num) {
    if (input.files != 0) {
        files = input.files
        let file = files[num]
        picture.src = URL.createObjectURL(file)
        picTitle.innerHTML = file.name
    }
}
function showRandomPic() {
    index = (Math.floor(Math.random() * 10000)) % files.length
    showPicture(index)
}
function showBars() {       
    footerBar.style.transform = "translateY(0px)"
    menuBar.style.transform = "translateY(0px)"
    isHidden = false
}
function hideBars() {
    footerBar.style.transform = "translateY(40px)"    
    menuBar.style.transform = "translateY(-50px)"
    isHidden = true
}
