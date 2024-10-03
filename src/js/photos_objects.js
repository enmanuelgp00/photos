const inputMedia = document.getElementById("input_media")
const viewZoomPercent = document.getElementById("zoom_percent")
let media
const viewMedia = new View(document.getElementById("view_media"))
const viewframePic = new View(document.getElementById("frame_media"))
framePic = viewframePic.getElement()

const viewPicTitle = document.getElementById("media_title")

const btnNextSpace = document.getElementById("btn_next_space")
const btnNext = document.getElementById("btn_next")
const btnPrevSpace = document.getElementById("btn_previous_space")
const btnPrev = document.getElementById("btn_previous")

const menuBar = document.getElementById("menu_bar")
const footerBar = document.getElementById("footer_bar")
const btnFullscreen = document.getElementById("btn_fullscreen")

const btnRotatePic = document.getElementById("btn_rotate")
let allElements = document.querySelectorAll("#wrapper *")

// menu bar
const btnClose = document.getElementById("btn_close")
const btnTrashCan = document.getElementById("btn_trash_can")

// frame
const btnShift = document.getElementById("btn_shift")

// footer bar
const btnZoomIn = document.getElementById("btn_zoom_in")
const btnZoomOut = document.getElementById("btn_zoom_out")
const btnZoomFit = document.getElementById("btn_zoom_fit")
const btnHeart = document.getElementById("btn_heart")
const btnHeartImg = document.querySelector("#btn_heart img")