window.ondragstart = function() {return false}

const Inputsets = {
    /* liniarFunctions */  'lf': "0123456789"
}

const keycheck = (s, update) => {
    let code = window.event.keyCode
    let key = String.fromCharCode(code)
    if (Inputsets[s].includes(key)) return true
    if (update != undefined && code == 13 /*enter*/) {
        update()
    }   
    return false
}

const screenUpdate = () => {
    document.getElementById("content").style.marginTop = `${document.getElementById("header").clientHeight + 25}px`
    document.getElementById("content").style.opacity = "100%"
}