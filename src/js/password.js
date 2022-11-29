const generatePwd = function() {
    let needed = 7;
    
    let upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
    let lower = "abcdefghijklmnopqrstuvwxyz".split("")
    let numbers = "0123456789".split("")
    let extra = "@!?#*+-_;:".split("")

    let required = []

    while (required.length != needed*4) {
        required.push(upper[Math.floor(Math.random() * upper.length)])
        required.push(lower[Math.floor(Math.random() * lower.length)])
        required.push(numbers[Math.floor(Math.random() * numbers.length)])
        required.push(extra[Math.floor(Math.random() * extra.length)])
    }
    
    required = required.sort((a, b) => Math.random() - 0.5)

    document.getElementById('output').innerHTML = required.join("")
}