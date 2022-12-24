const keyCheck = (id) => {
    let code = window.event.keyCode
    let key = String.fromCharCode(code)
    let input = document.getElementById(id)

    if (id == "inLen") {
        let value = parseInt(input.value + key, 10);
        return ((value <= 999 || isNaN(value)) && "0123456789".split("").includes(key)) || code == 8
    }
}

const genPwd = () => {
    let len = parseInt(document.getElementById('inLen').value)
    let chars = document.getElementById('inChars').value.split("")

    if (len == 0) len = 10
    if (chars.length == 0) chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz,.-_|+#'*~´`\\}][{&%$§\"/()=?@^°!".split("")

    chars = Array.from(new Set(chars))

    let pwd = ""
    while (pwd.length < len) {
        pwd += chars[Math.floor(Math.random() * chars.length)];
    }
    console.log(pwd);
    document.getElementById('pwdout').innerHTML = pwd
}

const checkPwd = () => {
    let inp = document.getElementById('pwdin').value

    let lengthScore = inp.length-8 / 100
    lengthScore = lengthScore < 0 ? 0 : lengthScore
    document.getElementById("lenScoreOut").innerHTML = `${lengthScore}%`

    let uniqeCharsScore = Math.round((new Set(inp).size / inp.length)*100*100)/100
    document.getElementById("charScoreOut").innerHTML = `${uniqeCharsScore == -Infinity || uniqeCharsScore == Infinity || isNaN(uniqeCharsScore) ? 0 : uniqeCharsScore}%`

    let repeatScore = /(.).*\1/.test(inp) ? 0 : 100;
    document.getElementById("repeatScoreOut").innerHTML = `${repeatScore}%`

    let hasNumbers = Math.round((inp.split("").filter(e => "0123456789".split("").includes(e)).length / inp.length)*100*100) / 100 * 4
    document.getElementById("numberScoreOut").innerHTML = `${hasNumbers}%`

    let haslower = Math.round((inp.split("").filter(e => "abcdefghijklmnopqrstuvwxyz".split("").includes(e)).length / inp.length)*100*100) / 100 * 4
    document.getElementById("lowerScoreOut").innerHTML = `${haslower}%`

    let hasupper = Math.round((inp.split("").filter(e => "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").includes(e)).length / inp.length)*100*100) / 100 * 4
    document.getElementById("upperScoreOut").innerHTML = `${hasupper}%`

    let hasextra = Math.round((inp.split("").filter(e => "!\"§$%&/()=?`´{[]}\\~+*#'-_.:,;<>|@^°".split("").includes(e)).length / inp.length)*100*100) / 100 * 4
    document.getElementById("extraScoreOut").innerHTML = `${hasextra}%`

    let overallScore = Math.round(((lengthScore + uniqeCharsScore + repeatScore + hasNumbers + haslower + hasupper + hasextra) / 700 ) * 100 * 100) / 100
    document.getElementById("overallScoreOut").innerHTML = `${overallScore}%`
}

const infoMenuOpen = () => {
    console.log("Yo");
    const info = document.getElementById('pwdcheckinfo')
    info.style.height = info.scrollHeight + "px"
}
const infoMenuClose = () => {
    console.log("Yo");
    const info = document.getElementById('pwdcheckinfo')
    info.style.height = "30px"
}