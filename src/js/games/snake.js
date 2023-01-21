let keys = [],
    ready = false,
    lost = false,
    snake = null,
    apples = [],
    start = 0,
    rows = 25,
    columns = 25,
    blockSize = 15,
    id = NaN,
    speed = 250


class pos {
    constructor (x, y) {
        this.x = x
        this.y = y
    }
}

class Snake {
    constructor() {
        this.x = 0
        this.y = 0
        this.body = [ new pos(0, 0)]
        this.direction = 3 // 0 up, 1 left, 2 down, 3 right
        document.getElementById("length").innerText = 4
    }
    move() {
        if (this.direction == 1)      {this.x -= 1}
        else if (this.direction == 3) {this.x += 1}
        else if (this.direction == 0) {this.y -= 1}
        else if(this.direction == 2)  {this.y += 1}

        if (this.x < 0 || this.x+1 > rows || this.y < 0 || this.y+1 > columns || !!this.body.find(v => v.x == this.x && v.y == this.y)) {
            lost = true
            ready = false
            this.body.forEach(v => {
                let element = document.getElementById(`x${v.x}y${v.y}`)
                if (element.classList.contains("head")) {
                    element.classList.add("deadHead")
                } else {
                    element.classList.add("deadSnake")
                }
            })

        }

        this.body.push(new pos(this.x, this.y))

        const headTile = document.getElementById(`x${this.x}y${this.y}`)
        if (headTile.classList.contains("apple")) {
            headTile.classList.remove("apple")
            apples = apples.filter(v => !(v.x == this.x && v.y == this.y))
            document.getElementById("length").innerText = this.body.length
        } else if (this.body.length > 4) {this.body = this.body.filter((v, i, a) => i != 0)}

    }
    updateDirection() {
        if ((keys['w'] || keys['ArrowUp']) && this.direction != 2) {this.direction = 0}
        else if ((keys['a'] || keys['ArrowLeft']) && this.direction != 3) {this.direction = 1}
        else if ((keys['s'] || keys['ArrowDown']) && this.direction != 0) {this.direction = 2}
        else if ((keys['d'] || keys['ArrowRight']) && this.direction != 1) {this.direction = 3}
    }
    updateBoard() {
        const elements = document.getElementsByClassName("board")
        for (let i = 0; i < elements.length; i++) {
            elements.item(i).classList.remove("snake")
            elements.item(i).classList.remove("head")
            elements.item(i).classList.remove("apple")
        }

        apples.forEach(p => {
            document.getElementById(`x${p.x}y${p.y}`).classList.add("apple")
        })

        this.body.forEach(p => {
            document.getElementById(`x${p.x}y${p.y}`).classList.add("snake")
        })
        document.getElementById(`x${this.x}y${this.y}`).classList.add("head")
    }
}

function spawnApples() {
    if (apples.length <= 2) {
        while (apples.length**3 < rows**2 + columns**2) {
            let x = Math.floor(Math.random()*rows),
                y = Math.floor(Math.random()*columns)
            
            if (snake.body.find(v => v.x != x && v.y != y) || apples.find(v => v.x != x && v.y != y)) {apples.push(new pos(x, y))}

        }
    }
}

function initBoard() {
    let background = document.getElementById("board");
    background.style.display = "none"
    buffer = ""

    for (let y = 0; y < columns; y++) {
        for (let x = 0; x < rows; x++) {
            buffer += `<div id="x${x}y${y}" class="board background" style="width:${blockSize}px; height:${blockSize}px"></div>`
        }
        buffer += "<br>"
    }
    background.innerHTML = buffer
    background.style.display = "inline-block"

    let center = document.getElementById(`x0y0`)
    center.classList.add("snake")
    center.classList.add("head")
    snake = new Snake()
    start = Date.now()
    ready = true
}
function resetKeys() {
    keys = []
}

function updateTime() {
    let time = new Date((Date.now() - start))
    let h = time.getHours()-1
    let min = time.getMinutes()
    let sec = time.getSeconds()
    document.getElementById("time").innerHTML = `${h > 0 ? h + "h " : ""}${min > 0 || h > 0 ? min + "m " : ""}${h > 0 || min > 0 || sec > 0 ? sec +"s" : ""}`
}

function updateValues() {
    let width = parseInt(document.getElementById('widthInput').value),
        height = parseInt(document.getElementById('heightInput').value),
        speed2 = parseInt(document.getElementById('speedInput').value)*10

    if (width != columns || height != rows || speed2 != speed) {
        columns = width
        rows = height
        speed = speed2
        reset()
    }
}

function update() {

    updateValues()
    if (!ready) return
    spawnApples()
    snake.updateDirection()
    snake.move()
    resetKeys()
    snake.updateBoard()
    updateTime()
}


function reset() {
    clearInterval(id)
    ready = false
    lost = false
    resetKeys()
    initBoard()
    apples = []
    id = setInterval(update, speed)
}

window.addEventListener("keydown",
    function(e){
        keys[e.key] = true;
    },
false);

reset()