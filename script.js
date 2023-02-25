const textList = [
    {text: "Welcome", link: "https://floschy.me/"},
    {text: "floschy.me", link: "https://floschy.me/"},
    {text: "flloschy", link: "https://github.com/flloschy"},
    {text: "floschy#1248", link: "https://discord.com/users/578620425060483072"},
]
let current = textList.length - 1;
let temptext = textList[current].text.split("");
let id = undefined;
var ring, block;
var x = window.innerWidth/2;
var y = window.innerHeight/2;
var moving = false;
let bar = NaN;
let pageHeight = 0;

function updateCursor() {
    moving = true;
    
    block.style.filter =
        "blur(150px) hue-rotate(" +
        Math.floor((y + window.scrollY) / window.innerHeight) * 18 +
        "deg)";

    ring.animate(
        {
            left: x - ring.clientWidth / 2 + "px",
            top: y - ring.clientHeight / 2 + window.scrollY + "px",
        },
        { duration: 3000, fill: "forwards", easing: "ease-in-out" }
    );

    block.animate(
        {
            left: x - block.clientWidth / 2 + "px",
            top: y - block.clientHeight / 2 + window.scrollY + "px",
        },
        { duration: 6000, fill: "forwards", easing: "ease-in-out" }
    );
}

function scrollableArea() {
    function findHighestNode(nodesList) {
        for (let i = nodesList.length - 1; i >= 0; i--) {
            if (nodesList[i].scrollHeight && nodesList[i].clientHeight) {
                var elHeight = Math.max(nodesList[i].scrollHeight, nodesList[i].clientHeight);
                pageHeight = Math.max(elHeight, pageHeight);
            }
            if (nodesList[i].childNodes.length) findHighestNode(nodesList[i].childNodes);
        }
    }

    findHighestNode(document.documentElement.childNodes);
};


function itsDone() {
    scrollableArea()
    block = document.getElementById("block");
    ring = document.getElementById("ring");
    bar = document.getElementById('scrollBlock')

    updateCursor();

    document.addEventListener("mousemove", function (event) {
        [x, y] = [event.clientX, event.clientY];
        updateCursor();
    });

    document.addEventListener("scroll", function (event) {
        updateCursor();
        console.log(getScrollPosition());
        bar.style.top = window.scrollY + window.innerHeight*getScrollPosition() + 'px' 
    });

    setInterval(function () {
        if (!moving) {
            ring.style.opacity = 0;
            block.style.opacity = .5;

            const randomX =
                Math.floor((Math.random() * window.outerWidth) / 4) -
                window.outerWidth / 8;
            const randomY =
                Math.floor((Math.random() * window.outerHeight) / 4) +
                window.scrollY -
                window.outerHeight / 8;
            block.style.filter =
                "blur(150px) hue-rotate(" +
                Math.floor(Math.random() * 360) +
                "deg)";
            block.animate(
                {
                    left: x + randomX + "px",
                    top: y + randomY + "px",
                },
                { duration: 4000, fill: "forwards", easing: "ease-in-out" }
            );
        } else {
            moving = false;
            ring.style.opacity = 1;
            block.style.opacity = 1;
        }
    }, 2500);
    toggle()
}







///////////////////////////////////////////////////




function toggle() {
    if (id) return;
    current = (current + 1) % textList.length;
    
    let i1 = 0;

    let randomstring = textList[current].text.split("").map((v, i, a) => {return {text:v, index:i}}).sort(e => Math.random()-.5);

    let title = document.getElementById("title");

    id = setInterval(function () {
        if (i1 < textList[current].text.length) {
            temptext = title.innerHTML.split("");
            
            if (title.innerHTML.length > textList[current].text.length) {
                temptext.pop();
            }
            else if (textList[current].text.length > title.innerHTML.length) {
                temptext.push("");
            }
            temptext[i1] = randomstring[i1].text;

            title.innerHTML = temptext.join("");
            i1++;
        } else {

            let sorted = true;
            for (let i = 0; i < randomstring.length-1; i++) {
                if (randomstring[i].index > randomstring[i+1].index) {
                    let temp = randomstring[i];
                    randomstring[i] = randomstring[i+1];
                    randomstring[i+1] = temp;
                    sorted = false;
                }
            }


            

            title.innerHTML = randomstring.map(e => e.text).join("");

            if (sorted) {
                clearInterval(id);
                title.href = textList[current].link;
                id = undefined;
            }
        }
    }, 100);
}