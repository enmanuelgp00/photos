
function adjustPicHeight() {    
    let maxHeight = viewframePic.getStyle().height
    viewMedia.style.maxHeight = maxHeight
}
function getMediaFiles(){
    return inputMedia.files
}

function showMedia(num) {
    if (getMediaFiles().length != 0) {

        // document.body.style.cursor = "wait"
        // viewMedia.style.cursor = "wait"

        media = new Media(getMediaFiles()[num])
        viewMedia.getElement().src = media.getURL()        
        // viewMedia.getElement().onload = () => {
        //     document.body.style.cursor = "default"
        //     viewMedia.style.cursor = "pointer"
        // }
        adjustPicHeight()
        showPicTitle(media.getName())
    } else {
        viewMedia.getElement().src = defaultMedia.url        
        adjustPicHeight()
        showPicTitle(defaultMedia.name)
    }
}
function showRandomPic() {
    index = (Math.floor(Math.random() * 10000)) % getMediaFiles().length
    showMedia(index)
}
function showPicTitle(name) {
    viewPicTitle.innerHTML = name
}
function showNextMedia() {
    if (index == getMediaFiles().length - 1) {
        index = 0
    } else {
        index++
    }
    showMedia(index)
}
function showPrevMedia() {
    if (index == 0) {
        index = getMediaFiles().length - 1
    } else {
        index--
    }
    showMedia(index)
}

function hideBars() {
    footerBar.style.transform = "translateY(40px)"
    menuBar.style.transform = "translateY(-50px)"
    framePic.style.overflow = "visible"
    viewMedia.setOverflow("visible")
}
function showBars() {
    footerBar.style.transform = "translateY(0px)"
    menuBar.style.transform = "translateY(0px)"
    viewMedia.setOverflow("hidden")
}

function rotatePicRight(deg) {
    viewMedia.setRotation(deg)
}
function rotatePicLeft(deg) {
    viewMedia.setRotation(deg * -1)
}
function getZoom() {
    return viewMedia.getScale()
}
function setZoom(zoom) {
    viewMedia.style.scale = zoom
}
function zoomIn(f) {
    let factor = f
    setZoom(getZoom() + factor)
}
function zoomOut(f) {
    let factor = f
    // if (getZoom() - factor > factor) {
        setZoom(getZoom() - factor)
    // } else {
        // setZoom(factor)
    // }
}
function zoomFit () {
    viewMedia.setDefault("all")
    viewMedia.style.top = 0
    viewMedia.style.left = 0
    showZoomInfo()

}
function showZoomInfo() {
    viewZoomPercent.innerHTML = (getZoom() * 100).toFixed(0) + "%"
}
function showAndHide(element, duration) {
    setTimeout(() => {        
        element.classList.add('visibleOnHover')
    }, duration)
    element.classList.add()
}
function cleanMediaFiles() {
   inputMedia.value = ""
//    inputForm.reset()  another way
}
function handleEventOutSide(e , element, fun) {
    document.addEventListener(e, (dcEvent)=>{        
    if(!element.contains(dcEvent.target)) {
        fun()
    }
    })
}

function reset() {
    cleanMediaFiles()
    showMedia(getMediaFiles())
    zoomFit()
}

function hideElement(elemt){
    elemt.style.display = "none"
}
function showElement(elemt, display="flex") {
    elemt.style.display = display
}