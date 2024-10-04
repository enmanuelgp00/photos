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