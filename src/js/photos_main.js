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


window.addEventListener("resize", () => {
    // adjustPicHeight()
})
function adjustPicHeight() {
    //let height = framePic.parentNode.clientHeight - (footerBar.clientHeight + menuBar.clientHeight)
    //let height = framePic.parentNode.offsetHeight - (footerBar.offsetHeight + menuBar.offsetHeight)
    //let height = framePic.parentNode.getBoundingClientRect().height - (footerBar.getBoundingClientRect().height + menuBar.getBoundingClientRect().height)
    // let maxHeight
    // let parentHeight = picture.parentNode.getBoundingClientRect().height
    //  if (picture.style.height >= parentHeight ) {
    //     if (isHidden){
    //         maxHeight = parentHeight - 90
    //     } else {
    //         maxHeight = parentHeight 
    //     }
    //  }
    viewPicture.style.maxHeight = maxHeight + "px"
}

const viewPicture = new View(document.getElementById("view_picture"));
viewPicture.getElement().addEventListener("transitionstart", function () {
    const interval = setInterval(()=>{        
        showZoomInfo()
    }, 100)

    viewPicture.getElement().addEventListener("transitionend", function () {        
        clearInterval(interval)
        showZoomInfo()
    }, {once: true})
})
viewPicture.getElement().addEventListener("dragstart", (event)=>{
    event.preventDefault() // evita mostrar el fantasma de la imagen al arrastrar con el click izquierdo    
})
/* viewPicture.getElement().addEventListener("contextmenu", (event)=>{
    event.preventDefault() // evita mostrar el contextmenu de la imagen al arrastrar con el click derecho
}) */
function showPicture(num) {
    if (input.files != 0) {
        files = input.files
        picture = new Picture(files[num])
        // let file = files[num]
        // viewPicture.src = URL.createObjectURL(file)
        viewPicture.src = picture.getURL()
        showPicTitle(picture.getName())
    }
}
function showRandomPic() {
    index = (Math.floor(Math.random() * 10000)) % files.length
    showPicture(index)
}


const viewPicTitle = document.getElementById("picture_title")
function showPicTitle(name) {
    viewPicTitle.innerHTML = name
}

const viewZoomPercent = document.getElementById("zoom_percent")


const btnNext = document.getElementById("btn_next")
btnNext.addEventListener("click", () => {
    showNextPicture()
})
function showNextPicture() {
    if (index == input.files.length - 1) {
        index = 0
    } else {
        index++
    }
    showPicture(index)
}

const btnPrev = document.getElementById("btn_previous")
btnPrev.addEventListener("click", function () {
    showPrevPicture()
})
function showPrevPicture() {
    if (index == 0) {
        index = input.files.length - 1
    } else {
        index--
    }
    showPicture(index)
}


// const btnShift = document.getElementById("btn_menu_shift")
// btnShift.addEventListener("click", function () {
//     showRandomPic()
// })

const menuBar = document.getElementById("menu_bar")
const footerBar = document.getElementById("footer_bar")
const btnFullscreen = document.getElementById("btn_fullscreen")
btnFullscreen.addEventListener("click", function () {
    if (viewPicture.isOverflowHidden()) {
        hideBars()
    }
})
function hideBars() {
    footerBar.style.transform = "translateY(40px)"
    menuBar.style.transform = "translateY(-50px)"
    framePic.style.overflow = "visible"
    viewPicture.setOverflow("visible")    
    console.log(viewPicture.getOverflow())
    // isHidden = true   
}
function showBars() {
    footerBar.style.transform = "translateY(0px)"
    menuBar.style.transform = "translateY(0px)"
    // framePic.style.overflow = "hidden"
    viewPicture.setOverflow("hidden")
     
    console.log(viewPicture.getOverflow())
    // isHidden = false
}

// listening to ESC button to close fullscreen mode
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
    rotatePic(angle)
})
function rotatePic(deg) {
    // rotation = deg
    // viewPicture.style.transform = "rotate(" + rotation + "deg)"
    // if (deg == 360) {
    //     transition = viewPicture.getStyle().transition
    //     rotationR().then(console.log("done"))
    //     viewPicture.setRotation(deg)
    //     viewPicture.setRotation(15)


    //     viewPicture.style.transition = transition

    //     //quitar tranciion de rotacion
    //     //rotas al valor predeterminado
    //     //activas trancicion de rotacion
    // } else {

    viewPicture.setRotation(deg)
    // }
}
function rotationR() {
    return new Promise((resolve) => {

        viewPicture.style.transition = "transform 0.0s ease"
        setTimeout(() => {

            resolve()
        }, 1000)

    })
}
function rotationA() {
    return new Promise((resolve) => {

        viewPicture.setRotation(deg)
        viewPicture.style.transition = "transform 0.0s ease"
        setTimeout(() => {
            resolve()
        }, 500)

    })
}


const btnZoomFit = document.getElementById("btn_zoom_fit")
const btnZoomIn  = document.getElementById("btn_zoom_in")
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
function getZoom() {
    return viewPicture.getScale()
}
function setZoom(zoom) {
    viewPicture.style.scale = zoom
}
function zoomIn() {
    setZoom(getZoom() + 0.5)
    // showZoomInfo()
}
function zoomOut() {
    if (getZoom() > 0.5) {
        setZoom(getZoom() - 0.5)
    }
    // showZoomInfo()
}
function showZoomInfo() {
    // setTimeout(()=>{
    viewZoomPercent.innerHTML = (getZoom() * 100).toFixed(0) + "%"
    // }, 500)

}




const btnHeart =    document.getElementById("btn_heart")
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
