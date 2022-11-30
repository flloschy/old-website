let space = 2



const getRandomPosition = function(element, used) {
    let ret = false
    let randomX = 0
    let randomY = 0;
    while (!ret) {
        let y = document.body.offsetHeight - element.clientHeight - 48 - space;
        let x = document.body.offsetWidth - element.clientWidth - 48 - space;
        randomX = Math.floor(Math.random()*x) + 24 + Math.round(space/2);
        randomY = Math.floor(Math.random()*y) + 24 + Math.round(space/2);

        ret = !used || used.every(e => (
            ( e[3] < (randomY - space) ) ||
            ( e[1] > (randomY + element.clientHeight + space)) ||
            ( e[2] < (randomX - space) ) ||
            ( e[0] > (randomX +element.clientWidth + space))
        ))

    }
    return [randomX, randomY]
}
const updatePos = function() {
    let used = []
    for (let i = 0; i < 5; i++) {
        let link = document.getElementById(`link${i+1}`)
        console.log(i);
        link.innerHTML
        let [x, y] = getRandomPosition(link, used)
        link.style.transitionDelay = `${100*(i+1)}ms`
        link.style.top = Math.round((y / (document.body.offsetHeight - link.clientHeight - 24 - space))*90) + "%"
        link.style.left = Math.round((x / (document.body.offsetWidth - link.clientWidth - space))*90) + "%"
        link.style.opacity = "100%"
        used.push([x, y, x+link.clientWidth, y+link.clientHeight])
    }
}