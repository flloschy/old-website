



const keyCheckDecimalWithPoint = function() {
    let code = window.event.keyCode
    if (code == 8) {
        return  true;
    }
    let key = String.fromCharCode(code)
    let keys = "0123456789¾½"
    return keys.includes(key)
}





const pointDisable = function() {
    let x1 = document.getElementById('pointx1')
    let x2 = document.getElementById('pointx2')
    let y1 = document.getElementById('pointy1')
    let y2 = document.getElementById('pointy2')
    let m = document.getElementById('m')
    let b = document.getElementById('b')

    let x1v = x1.value != ""
    let x2v = x2.value != ""
    let y1v = y1.value != ""
    let y2v = y2.value != ""
    let mv = m.value != ""
    let bv = b.value != ""

    if (mv && bv) {x1.disabled = true}
    else {x1.disabled = false}

    if (mv && bv) {y1.disabled = true}
    else {y1.disabled = false}

    if (((x1v && y1v) && (mv && bv)) || bv || mv) {x2.disabled = true}
    else {x2.disabled = false}

    if (((x1v && y1v) && (mv && bv)) || bv || mv) {y2.disabled = true}
    else {y2.disabled = false}

    if (((x1v || y1v) && (x2v || y2v)) || (bv && (x1v || y1v)) ) {m.disabled = true}
    else {m.disabled = false}

    if (((x1v || y1v) && (x2v || y2v)) || (mv && (x1v || y1v))) {b.disabled = true}
    else {b.disabled = false}



}

const calcPoints = function() {
    let x1 = document.getElementById('pointx1').value != ""
    let x2 = document.getElementById('pointx2').value != ""
    let y1 = document.getElementById('pointy1').value != ""
    let y2 = document.getElementById('pointy2').value != ""
    let m = document.getElementById('m').value != ""
    let b = document.getElementById('b').value != ""
    let xSame = false
    let ySame = false
    let func = ""

    if (x1 && y1 && x2 && y2) {
        let px1 = parseFloat(document.getElementById('pointx1').value)
        let py1 = parseFloat(document.getElementById('pointy1').value)
        let px2 = parseFloat(document.getElementById('pointx2').value)
        let py2 = parseFloat(document.getElementById('pointy2').value)
        xSame = px1 == px2
        ySame = py1 == py2
        m = (py1-py2)/(px1-px2) || 0
        b = py1 - m*px1 || 0
    }
    else if (x1 && y1 && m) {
        let = px1 = parseFloat(document.getElementById('pointx1').value)
        let = py1 = parseFloat(document.getElementById('pointy1').value)
        m = document.getElementById('m').value
        b = py1 - m*px1
    }
    else if (x1 && y1 && b) {
        let = px1 = parseFloat(document.getElementById('pointx1').value)
        let = py1 = parseFloat(document.getElementById('pointy1').value)
        b = document.getElementById('b').value
        m = (py1-b)/(px1-0)
    }
    else if (b && m) {
        m = document.getElementById('m').value
        b = document.getElementById('b').value
    }
    m = Math.round(m*100)/100
    b = Math.round(b*100)/100
    m = Math.abs(m) == Infinity ? 0 : m
    b = Math.abs(b) == Infinity ? 0 : b
    m = (m == 1 || m == 0) ? "" : (m == -1 ? "" : m)
    b = b == 0 ? "" : b

    if (xSame) func = "X shouldn't be the same"
    else if (ySame) func = document.getElementById('pointy1').value
    else func = `${m}x${b > 0 ? "+" : ""}${b}`
    
    
    let out = document.getElementById("functionoutput")
    out.innerHTML = func
}






