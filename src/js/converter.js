const binaryKey = () => {
    let code = window.event.keyCode
    let key = String.fromCharCode(code)
    if (code == 8) return true
    if (code == 13) {calc(); return false}
    return "01".split("").includes(key)
}
const decimalKey = () => {
    let code = window.event.keyCode
    let key = String.fromCharCode(code)
    if (code == 8) return true
    if (code == 13) {calc(); return false}
    return "0123456789".split("").includes(key)
}
const hexaKey = () => {
    let code = window.event.keyCode
    let key = String.fromCharCode(code)
    if (code == 8) return true
    if (code == 13) {calc(); return false}
    return "0123456789abcdefABCDEF".split("").includes(key)
}

const calc = () => {
    let bin = document.getElementById('binary')
    let dec = document.getElementById('decima')
    let hex = document.getElementById('hexade')

    if (bin.value != "") {
        dec.disabled = true
        dec.placeholder = parseInt(bin.value, 2).toString(10)
        hex.disabled = true
        hex.placeholder = parseInt(bin.value, 2).toString(16)
    } else if (dec.value != "") {
        bin.disabled = true
        bin.placeholder = parseInt(dec.value, 10).toString(2)
        hex.disabled = true
        hex.placeholder = parseInt(dec.value, 10).toString(16)
    } else if (hex.value != "") {
        bin.disabled = true
        bin.placeholder = parseInt(hex.value, 16).toString(2)
        dec.disabled = true
        dec.placeholder = parseInt(hex.value, 16).toString(10)
    } else {
        bin.disabled = false
        bin.placeholder = "binary"
        dec.disabled = false
        dec.placeholder = "decimal"
        hex.disabled = false
        hex.placeholder = "hexadecimal"
    }






}