
function handleEventOutSide(e , element, fun) {
    document.addEventListener(e, (dcEvent)=>{        
    if(!element.contains(dcEvent.target)) {
        fun()
    }
    })
}