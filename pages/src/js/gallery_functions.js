function toggleNav () {
    let arrSpan = asideBar.querySelectorAll("span")
    let display = window.getComputedStyle(arrSpan[0]).display
    if(display == "none") {
        asideBar.style.width = "250px"
        for (span of arrSpan) {
            span.style.display = "flex"
        }
    } else {   
        
        asideBar.style.width = asideBarDefWidth
        for (span of arrSpan) {
            span.style.display = "none"
        } 
    }
}
function moveSPointerTo(element){
    let parentTop = asideBar.getBoundingClientRect().top
    let top  = element.getBoundingClientRect().top
    let center = element.getBoundingClientRect().height / 2 - scrollPointer.getBoundingClientRect().height / 2
    let targetTop = top - parentTop + center 

    scrollPointer.style.transform = `translateY(${targetTop}px)`
}