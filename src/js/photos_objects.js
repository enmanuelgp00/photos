const input = document.getElementById("input_pics")

const viewZoomPercent = document.getElementById("zoom_percent")
const viewPicture = new View(document.getElementById("view_picture"))
const viewframePic = new View(document.getElementById("frame_picture"))
framePic = viewframePic.getElement()

const viewPicTitle = document.getElementById("picture_title")

const btnNextSpace = document.getElementById("btn_next_space")
const btnPrevSpace = document.getElementById("btn_previous_space")

const menuBar = document.getElementById("menu_bar")
const footerBar = document.getElementById("footer_bar")
const btnFullscreen = document.getElementById("btn_fullscreen")

const btnRotatePic = document.getElementById("btn_rotate")
const btnZoomIn = document.getElementById("btn_zoom_in")
const btnZoomOut = document.getElementById("btn_zoom_out")
const btnZoomFit = document.getElementById("btn_zoom_fit")
const btnHeart = document.getElementById("btn_heart")
const btnHeartImg = document.querySelector("#btn_heart img")

let allElements = document.querySelectorAll("#wrapper *")