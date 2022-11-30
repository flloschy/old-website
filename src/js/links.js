let el = 1;
let inters = null;
let amount = 5

const updatePos = function() {

    let radius = document.body.clientWidth < document.body.clientHeight ? document.body.clientWidth * 0.4 : document.body.clientHeight *0.4
    radius = Math.round(radius)

    for (var i = 0; i < amount; i++) {
        let offsetAngle = 360 / amount;
        let rotateAngle = offsetAngle * (i+1) + offsetAngle * el;
        let link = document.getElementById(`link${i+1}`)
        try {link.innerHTML}
        catch (e) {pauseInverval()}
        link.style.transform = "rotate(" + rotateAngle + "deg) translate(0, -" + radius + "px)"
        link.style.top = document.body.clientHeight / 2
        let lastlink = document.getElementById(`link${i == 0 ? amount : i}`)
        o = Math.pow(Math.pow(1 - link.getBoundingClientRect().y / document.body.clientHeight, 8), 2) * 10;
        lastlink.style.opacity = o
    };

    el += 1
}

const interval = function() {
    if (inters == null) {
        updatePos()
        inters = setInterval(updatePos, 2500)
    }
}

const pauseInverval = function() {
    clearInterval(inters)
    inters = null
}