
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


function showPicture(num) {
    if (input.files != 0) {
        files = input.files
        picture = new Picture(files[num])
        // let file = files[num]
        // viewPicture.src = URL.createObjectURL(file)
        viewPicture.getElement().src = picture.getURL()
        showPicTitle(picture.getName())
    }
}
function showRandomPic() {
    index = (Math.floor(Math.random() * 10000)) % files.length
    showPicture(index)
}
function showPicTitle(name) {
    viewPicTitle.innerHTML = name
}
function showNextPicture() {
    if (index == input.files.length - 1) {
        index = 0
    } else {
        index++
    }
    showPicture(index)
}
function showPrevPicture() {
    if (index == 0) {
        index = input.files.length - 1
    } else {
        index--
    }
    showPicture(index)
}

function hideBars() {
    footerBar.style.transform = "translateY(40px)"
    menuBar.style.transform = "translateY(-50px)"
    framePic.style.overflow = "visible"
    viewPicture.setOverflow("visible")    
    console.log(viewPicture.getOverflow())
}
function showBars() {
    footerBar.style.transform = "translateY(0px)"
    menuBar.style.transform = "translateY(0px)"
    viewPicture.setOverflow("hidden")
    console.log(viewPicture.getOverflow())
}

function rotatePicRight(deg) {
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

function rotatePicLeft(deg) {
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

    viewPicture.setRotation(deg * -1)
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
    if (getZoom() - 0.5 > 0.5) {
        setZoom(getZoom() - 0.5)
    } else {
        setZoom(0.5)
    }
    // showZoomInfo()
}
function showZoomInfo() {
    // setTimeout(()=>{
    viewZoomPercent.innerHTML = (getZoom() * 100).toFixed(0) + "%"
    // }, 500)

}
