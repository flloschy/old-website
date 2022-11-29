

const keyCheckBinary = function() {
    let code = window.event.keyCode
    if (code == 13) {
        clearInput()
        document.getElementById('binaryInput').disabled = false
        document.getElementById('decimalInput').disabled = false
        document.getElementById('HexadecimalInput').disabled = false
        return false;
    }
    let key = String.fromCharCode(code)
    let allowed = "01".split("");
    let r = allowed.includes(key.toLowerCase()) && lenCheck();
    if (r) {
        document.getElementById('binaryInput').disabled = false
        document.getElementById('decimalInput').disabled = true
        document.getElementById('HexadecimalInput').disabled = true
    }
    return r
}

const keyCheckDecimal = function() {
    let code = window.event.keyCode
    if (code == 13) {
        clearInput()
        document.getElementById('binaryInput').disabled = false
        document.getElementById('decimalInput').disabled = false
        document.getElementById('HexadecimalInput').disabled = false
        return false;
    }
    let key = String.fromCharCode(code)
    let allowed = "0123456789".split("");
    let r = allowed.includes(key.toLowerCase()) && lenCheck();
    if (r) {
        document.getElementById('binaryInput').disabled = true
        document.getElementById('decimalInput').disabled = false
        document.getElementById('HexadecimalInput').disabled = true
    }
    return r
}

const keyCheckHexadecimal = function() {
    let code = window.event.keyCode
    if (code == 13) {
        clearInput()
        document.getElementById('binaryInput').disabled = false
        document.getElementById('decimalInput').disabled = false
        document.getElementById('HexadecimalInput').disabled = false
        return false;
    }
    let key = String.fromCharCode(code)
    let allowed = "0123456789abcdef".split("");
    let r = allowed.includes(key.toLowerCase()) && lenCheck();
    if (r) {
        document.getElementById('binaryInput').disabled = true
        document.getElementById('decimalInput').disabled = true
        document.getElementById('HexadecimalInput').disabled = false
    }
    return r
}

const lenCheck = function() {
    let binary = document.getElementById("binaryInput").value
    let decimal = document.getElementById("decimalInput").value
    let hexa = document.getElementById("HexadecimalInput").value

    let x = 0;

    if (binary != "") {
        x = parseInt(binary, 2);
    } else if (decimal != "") {
        x = parseInt(decimal, 10);
    } else if (hexa != "") {
        x = parseInt(hexa, 16);
    }

    let bin = x.toString(2);
    let dec = x.toString(10);
    let hex = x.toString(16);

    let lengths = [bin.length, dec.length, hex.length].sort((a, b) => a-b)[2] * 40
    
    let max = window.innerWidth / 0.4 - 30
    console.log(lengths, max);
    
    return lengths < max 
}


const calc = function() {
    let binary = document.getElementById("binaryInput").value
    let decimal = document.getElementById("decimalInput").value
    let hexa = document.getElementById("HexadecimalInput").value
    let x = 0;

    if (binary != "") {
        x = parseInt(binary, 2);
    } else if (decimal != "") {
        x = parseInt(decimal, 10);
    } else if (hexa != "") {
        x = parseInt(hexa, 16);
    }

    let bin = x.toString(2);
    let dec = x.toString(10);
    let hex = x.toString(16);


    let str = `Binary: ${bin}<br>Decimal: ${dec}<br>Hexadecimal: ${hex.toUpperCase()}<br>`

    document.getElementById('output').innerHTML = str 

}

const clearInput = function() {
    document.getElementById("binaryInput").value = ""
    document.getElementById("decimalInput").value = ""
    document.getElementById("HexadecimalInput").value = ""

    document.getElementById("binaryInput").disabled = false;
    document.getElementById("decimalInput").disabled = false;
    document.getElementById("HexadecimalInput").disabled = false;

    let str = `Enter value in one of the three input options.`
    document.getElementById('output').innerHTML = str 


}

const change = function() {
    let binary = document.getElementById("binaryInput").value
    let decimal = document.getElementById("decimalInput").value
    let hexa = document.getElementById("HexadecimalInput").value


    document.getElementById('binaryInput').disabled = (''==binary)
    document.getElementById('decimalInput').disabled = (''==decimal)
    document.getElementById('HexadecimalInput').disabled = (''==hexa)
}