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
        this.matrix = this.getTransformMatrix()
        this.transition = this.getTransition()
        this.rotation = Math.round(Math.atan2(this.matrix[1], this.matrix[0]) * (180 / Math.PI))
    }
    getTransformFun() {
        let fun = this.style.transform
        return fun
    }
    setTransformFun(fun) {
        this.style.transform = fun
    }
    addTransformFun(funToAdd) {
        let exist = false
        let fun = this.getTransformFun().split(")").filter(el => el != "")
        fun = fun.map((fn) => fn + ")") // note: if you use brackets "{}" you need to define "return fn + ")" "

        let funToAddName = funToAdd.split("(")[0]
        for (let id in fun) {
            if (fun[id].includes(funToAddName)) {
                fun[id] = funToAdd
                exist = true
            }
        }
        if (!exist) fun.push(funToAdd)
        fun = fun.join(" ")
        this.setTransformFun(fun)
    }
    getTransition() {
        let trans = this.getStyle().transition
        return trans
    }
    setTransition(newTrans) {
        this.transition = newTrans
        this.style.transition = this.transition
    }
    showTransition() {
        this.setTransition(this.transition)
    }
    hideTransition(transToHide) {
        let trans = this.getTransition().split(",")
        let transToHideName = transToHide.split(")")[0]
        trans = trans.map((t) => {
            return (t.includes(transToHideName)) ? "" : t
        })
        trans = trans.filter(Boolean).join(", ")
        this.style.transition = trans
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
    getTransformMatrix() {
        let matrix = this.getStyle().getPropertyValue("transform")
        return (matrix != 'none') ? matrix.split("(")[1].split(")")[0].split(",") : [1, 0, 0, 1, 0, 0]// new Array(6).fill(0)
    }
    getScale() {
        return parseFloat((this.getStyle().scale != 'none') ? this.getStyle().scale : 1.0)
    }
    setScale(scale) {
        this.style.scale = scale
    }
    setDefault(def, skip) {
        switch (def) {
            case "all":
            case "scale":
                if (skip != "scale") this.setScale(1)
                if (def != "all") break
            case "rotation":
                if (skip != "rotation") this.setRotation(0)
                if (def != "all") break
            case "translation":
                if (skip != "translation") this.setTranslation(0, 0)
                if (def != "all") break

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
        this.addTransformFun("rotate(" + this.rotation + "deg)")
    }
    requestRotation(deg) {
        if(deg != this.rotation) {
            
        }
    }
    getElement() {
        return this.element
    }
    getOverflow() {
        return this.getStyle().overflow
    }
    setOverflow(status) {
        this.style.overflow = status
    }
    isOverflowHidden() {
        return this.getOverflow() == "hidden" || this.getOverflow() == "clip"
    }
    getTranslationX() {
        return this.getTransformMatrix()[4]
    }
    setTranslationX(x) {
        this.style.transform = "translateX(" + x + "px)"
    }
    getTranslationY() {
        return this.getTransformMatrix()[5]
    }
    setTranslationY(y) {
        this.style.transform = "translateY(" + y + "px)"
    }
    setTranslation(x, y) {
        this.addTransformFun("translate(" + x + "px, " + y + "px)")
    }
}
function popUpMessage(element, message) {
    let popup = document.createElement("div")
    popup.style.position = "absolute"
    popup.innerHTML = message
    element.appendChild(popup)
}
// export {Picture}