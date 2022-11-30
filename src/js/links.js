const getRandomPosition = function(element, used) {
    let ret = false
    let randomX = 0
    let randomY = 0;
    let space = 50
    while (!ret) {
        let y = document.body.offsetHeight - element.clientHeight - 24 - space;
        let x = document.body.offsetWidth - element.clientWidth - space;
        randomX = Math.floor(Math.random()*x) + Math.round(space/2);
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
    for (let i = 0; i < 3; i++) {
        let link = document.getElementById(`link${i+1}`)
        console.log(i);
        link.innerHTML
        let [x, y] = getRandomPosition(link, used)
        link.style.top = y + "px"
        link.style.left = x + "px"
        used.push([x, y, x+link.clientWidth, y+link.clientHeight])
    }
}