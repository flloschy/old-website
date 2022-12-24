const keyCheck = (id) => {
    let code = window.event.keyCode
    let key = String.fromCharCode(code)
    let input = document.getElementById(id)
    
    console.log(code);

    if (code == 8 /* backspace */) return true

    if (code == 190 /* . */) {
        if (input.value.split("").includes(".")) return false
        return true
    }
    
    if (code == 13 /* enter */) {
        updateOutput()
        false
    }
    if ("0123456789".split("").includes(key)) return true
    return false
}

const update = () => {
    let x1 = document.getElementById('inX1')
    let x2 = document.getElementById('inX2')
    let y1 = document.getElementById('inY1')
    let y2 = document.getElementById('inY2')
    let m = document.getElementById('inM')
    let b = document.getElementById('inB')

    let bx1 = x1.value != ""
    let bx2 = x2.value != ""
    let by1 = y1.value != ""
    let by2 = y2.value != ""
    let bm = m.value != ""
    let bb = b.value != ""

    if (bm && bb) {x1.disabled = true}
    else {x1.disabled = false}

    if (bm && bb) {y1.disabled = true}
    else {y1.disabled = false}

    if (((bx1 && by1) && (bm && bb)) || bb || bm) {x2.disabled = true}
    else {x2.disabled = false}

    if (((bx1 && by1) && (bm && bb)) || bb || bm) {y2.disabled = true}
    else {y2.disabled = false}

    if (((bx1 || by1) && (bx2 || by2)) || (bb && (bx1 || by1)) ) {m.disabled = true}
    else {m.disabled = false}

    if (((bx1 || by1) && (bx2 || by2)) || (bm && (bx1 || by1))) {b.disabled = true}
    else {b.disabled = false}
}

const updateOutput = () => {
    let x1 = document.getElementById('inX1').value != ""
    let x2 = document.getElementById('inX2').value != ""
    let y1 = document.getElementById('inY1').value != ""
    let y2 = document.getElementById('inY2').value != ""
    let m = document.getElementById('inM').value != ""
    let b = document.getElementById('inB').value != ""

    let xSame = false
    let ySame = false
    let func = ""

    if (!x1 && !x2 && !y1 && !y2 && !m && !b) {
        let out = document.getElementById("outFunc")
        out.innerHTML = "To calculate a function you need to enter values"
        return
    }
    else if ([x1, x2, y1, y2, m, b].filter(e => e).length < 2) {
        let out = document.getElementById("outFunc")
        out.innerHTML = "To calculate a function you need to enter more values"
        return
    }
    else if (x1 && y1 && x2 && y2) {
        let px1 = parseFloat(document.getElementById('inX1').value)
        let py1 = parseFloat(document.getElementById('inY1').value)
        let px2 = parseFloat(document.getElementById('inX2').value)
        let py2 = parseFloat(document.getElementById('inY2').value)
        xSame = px1 == px2
        ySame = py1 == py2
        m = (py1-py2)/(px1-px2) || 0
        b = py1 - m*px1 || 0
    }
    else if (x1 && y1 && m) {
        let = px1 = parseFloat(document.getElementById('inX1').value)
        let = py1 = parseFloat(document.getElementById('inY1').value)
        m = document.getElementById('inM').value
        b = py1 - m*px1
    }
    else if (x1 && y1 && b) {
        let = px1 = parseFloat(document.getElementById('inX1').value)
        let = py1 = parseFloat(document.getElementById('inY1').value)
        b = document.getElementById('inB').value
        m = (py1-b)/(px1-0)
    }
    else if (b && m) {
        m = document.getElementById('inM').value
        b = document.getElementById('inB').value
    }
    m = Math.round(m*100)/100
    b = Math.round(b*100)/100
    m = Math.abs(m) == Infinity ? 0 : m
    b = Math.abs(b) == Infinity ? 0 : b
    b = b == 0 ? "" : b

    if (xSame) func = "X1 and X2 cant be equal"
    else if (ySame) func = document.getElementById('inY1').value
    else func = `${m}x${b > 0 ? "+" : ""}${b}`
    
    
    let out = document.getElementById("outFunc")
    out.innerHTML = func

    let xIn = document.getElementById("outXint")
    let r = Math.round(((0 - b) / m)*100)/100
    console.log(r);
    xIn.innerHTML = `${isNaN(r) ? "" : (Math.abs(r) == Infinity ? "No intercept" : r)}`

    let yIn = document.getElementById("outYint")
    yIn.innerHTML = `${b}`


}