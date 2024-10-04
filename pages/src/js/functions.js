
function handleEventOutSide(e , element, fun) {
    document.addEventListener(e, (dcEvent)=>{        
    if(!element.contains(dcEvent.target)) {
        fun()
    }
    })
}
function preventDefault(events){
    let allElements = document.querySelectorAll("body")
    for (elmt of allElements) {
        for (e of events) {
            elmt.addEventListener(e, (rE) => {
                rE.preventDefault()
            })
        }
    }
}