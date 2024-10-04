/*
    * title next to the logo
*/
preventDefault(["contextmenu","mousedown","dragstart"])
moveSPointerTo(btnAllMedia)
asideOptions.addEventListener("click", (e)=>{
    moveSPointerTo(e.target)
})
btnOpenNav.addEventListener("click", toggleNav)
scrollPointer.addEventListener("transitionend", (e)=>{
    // alert(`${e.}`)
    
    scrollPointer.style.bottom = "10px"
})