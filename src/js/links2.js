let t = 1
let id = 0
let x = 0
let y = 0
let last = false
let linksA = 3
let speed = 10

const update = async function(check) {
    let radius = (document.body.clientWidth < document.body.clientHeight ? document.body.clientWidth : document.body.clientHeight) / 4
    let centerX = document.body.clientWidth / 2
    let centerY = document.body.clientHeight / 2
    for (let i = 0; i < linksA; i++) {
        let element = document.getElementById(`link${i+1}`)
        element.innerHTML
        element.style.left = `calc(50% + ${Math.sin(t/speed + (Math.PI*2 / linksA)*i)*radius}px - ${element.clientWidth/2}px)`
        element.style.top = `calc(50% + ${Math.cos(t/speed + (Math.PI*2 / linksA)*i)*radius}px - ${element.clientHeight/2}px)`
    }

    if (check == undefined) {
        let distX = x - centerX;
        let distY = y - centerY;
        let distance = Math.sqrt( (distX*distX) + (distY*distY) );
        let now = distance < radius * 1.5

        if (last != now) {
            if (now) {
                clearInterval(id)
                last = now
                for (let i = 0; i < linksA; i++) {
                    document.getElementById(`link${i+1}`).style.transition = `linear 400ms`
                    document.getElementById(`link${i+1}`).style.opacity = "100%"
                }
                t += 2
                await update(true)
                id = setInterval(update, 400)
            } else {
                clearInterval(id)
                last = now
                await update(true)
                for (let i = 0; i < linksA; i++) {
                    document.getElementById(`link${i+1}`).style.transition = `linear 100ms`
                    document.getElementById(`link${i+1}`).style.opacity = "50%"
                }
                id = setInterval(update, 100)
            }
            last = now
        }


        last = now
    }

    t += 1
}




let intervals = 0
const updatePos = function() {
    if (intervals == 0) {
        intervals += 1
        id = setInterval(update, 100)
    }
}

const updateMousePos = function(event) {
   x = event.clientX;
   y = event.clientY;
}