class Picture {
    constructor(file) {
        this.URL = URL.createObjectURL(file)
        this.name = file.name
    }
    getURL() { return this.URL }
    getName() { return this.name }


}

class View {
    constructor(element) {
        this.element = element
        this.style = this.element.style
        this.rotation = 0
    }
    getStyle() {
        return window.getComputedStyle(this.element)
    }

    isHidden() {
        if (this.getStyle().visibility == "hidden") {
            return true
        } else {
            return false
        }
    }
    setVisibility(visibility) {
        this.style.visibility = visibility
    }
    getScale() {
        return parseFloat((this.getStyle().scale != 'none') ? this.getStyle().scale : 1.0)
    }
    setScale(scale) {
        this.style.scale = scale
    }    
    setDefault(def, skip){
        switch (def){
            case "all"  :
            case "scale": 
                if(skip != "scale") this.setScale(1)
                if(def  != "all"  ) break            
            case "rotation": 
                if(skip != "rotation") this.setRotation(0)
                if(def != "all"      ) break 
        }
    }
    getRotation() {
        // let matrix = this.getStyle().getPropertyValue("transform")
        // if (matrix != "none") {
        //     matrix = matrix.split("(")[1].split(")")[0].split(',')
        //     /*  */
        //     let angle = Math.round(Math.atan2(matrix[1], matrix[0]) * (180/Math.PI))
        //     return (angle >= 0) ? angle : angle + 360 
        // } else {
        //     return 0
        // }
        return this.rotation
    }
    setRotation(deg) {
        this.rotation = deg
        this.style.transform = "rotate("+ this.rotation +"deg)"        
    }
    getElement(){
        return this.element
    }
    getOverflow(){
        return this.getStyle().overflow
    }
    setOverflow(status){
        this.style.overflow = status
    }
    isOverflowHidden(){
        return this.getOverflow() == "hidden" || this.getOverflow() == "clip"
    }
}
function popUpMessage(element, message){
    let popup = document.createElement("div")
    popup.style.position = "absolute"
    popup.innerHTML = message
    element.appendChild(popup)
}
// export {Picture}