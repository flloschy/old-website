var ring, block;
var x = 0;
var y = 0;
var moving = false;

function updateCursor() {
    ring.style.opacity = 1;
    block.style.filter =
        "blur(150px) hue-rotate(" +
        Math.floor((y + window.scrollY) / window.innerHeight) * 18 +
        "deg)";

    ring.animate(
        {
            left: x - ring.clientWidth / 2 + "px",
            top: y - ring.clientHeight / 2 + window.scrollY + "px",
        },
        { duration: 500, fill: "forwards", easing: "ease-in-out" }
    );

    block.animate(
        {
            left: x - block.clientWidth / 2 + "px",
            top: y - block.clientHeight / 2 + window.scrollY + "px",
        },
        { duration: 2000, fill: "forwards", easing: "ease-in-out" }
    );
}

function done() {
    block = document.getElementById("block");
    ring = document.getElementById("ring");

    document.addEventListener("mousemove", function (event) {
        moving = true;
        x = event.clientX;
        y = event.clientY;

        updateCursor();
    });

    document.addEventListener("scroll", function (event) {
        updateCursor();
    });

    setInterval(function () {
        if (!moving) {
            normit();
            ring.style.opacity = 0;
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
        }
    }, 2500);
}
const originalText = "floschy.me";
let text = originalText.split("");

let id = setInterval(function () {
    if (!text.length) {
        clearInterval(id);
        return;
    }
    let title = document.getElementById("title");
    title.innerHTML += text.shift();
}, 100);


let Rid = undefined;
let Nid = undefined;
let i = 0
let u = 0
function randomize() {
  if (Nid) clearInterval(Nid);

  let title = document.getElementById("title");
  i=0;
  Rid = setInterval(function () {
    if (i == title.innerHTML.length) {
      i = 0;
      u += 1;
      if (u == 3) {
        u = 0;
        clearInterval(Rid)
        Rid= undefined;
        return
      }
    };
    let text2 = title.innerHTML.split("");
    text2[i] = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    text2[Math.floor(Math.random() * title.innerHTML.length)] = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    title.innerHTML = text2.join("");

    i++;

  }, 50);
}

function normit() {

  if (Rid) clearInterval(Rid);

  let title = document.getElementById("title");
  i=0;
  Nid = setInterval(function () {
    if (i == title.innerHTML.length) {
      i = 0;
      u += 1;
      if (u == 3) {
        u = 0;
        clearInterval(Nid)
        Nid= undefined;
        return
      }
    };
    let text2 = title.innerHTML.split("");
    if (u == 2) {
      text2[i] = originalText.split("")[i];
    }
    let r = Math.floor(Math.random() * title.innerHTML.length) 
    text2[r] = originalText.split("")[r];
    title.innerHTML = text2.join("");

    i++;

  }, 50);
}
