let links = [
    // FLEX air
    "https://youtu.be/pg5aBJ1LYGU", // 2
    "https://youtu.be/u3e-CUE7ljk", // 3
    "https://youtu.be/aGuHixFujHE", // 4
    "https://youtu.be/f4ZRK8YLmPc", // 5
    "https://youtu.be/LKkhfH8zSxM", // 6
    "https://youtu.be/q99EoffYcP4", // 7
    //
    "https://learn.microsoft.com/en-us/typography/font-list/comic-sans-ms",
    "https://www.crazygames.com/game/worlds-hardest-game",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Roggenvollkornbrot.Endstueck.Kruste.mit.Ausbund.jpg/1920px-Roggenvollkornbrot.Endstueck.Kruste.mit.Ausbund.jpg",
    "https://floatingqrcode.com/",
    "https://cyber-simulator.com/",
    "https://checkboxrace.com/",
    "https://cheese.com/",
    "https://neal.fun/absurd-trolley-problems/",
    "https://neal.fun/spend/",
    "https://cdn.discordapp.com/attachments/1041752412173639680/1046898417919594638/image.png",
    "https://youtu.be/gkMlUlQEfSY",
    "http://corndog.io/",
    "http://www.themostamazingwebsiteontheinternet.com/",
    "https://onesquareminesweeper.com/",
    "https://media.tenor.com/0lbyPcn3-FgAAAAS/engineer-tf2.gif",
    "https://www.fiverr.com/floschy_/make-a-custom-discord-bot",
    "https://www.fiverr.com/floschy_/create-you-a-program-in-python",
    "https://github.com/flloschy",
    "https://wiki.teamfortress.com/wiki/Engineer",
    "http://downloadramdownloadramdownloadram.com/",
    "http://papertoilet.com/",
    "https://codepen.io/ge1doot/full/WbWQOP/",
    "https://trypap.com/",
    "https://isitchristmas.com/",
    "https://www.ouaismaisbon.ch/",
    "http://www.koalastothemax.com/",
    "http://make-everything-ok.com/",
    "https://rulesoftheinternet.com/",
    "http://ninjaflex.com/",
    "http://internet-map.net/",
    "http://www.plspetdoge.com/",
    "http://faceofdisapproval.com/",
    "https://www.kamogo.com/",
    "http://eelslap.com/",
    "http://www.freechocolate.com/",
    "http://www.woot.co.uk/",
    "https://www.howmanypeopleareinspacerightnow.com/",
    "http://hasthelargehadroncolliderdestroyedtheworldyet.com/",
    "https://www.cowsgomoo.co.uk/",
    "http://www.clicktoremove.com/",
    "https://www.tomscott.com/usvsth3m/maths/",
    "http://nothingeverhappens.com/",
    "https://drumsound.net/",
    "https://froggytime.com/",
    "http://www.youareinaforest.com/",
    "http://clickingbad.nullism.com/",
    "https://onetinyhand.com/",
    "http://corndogoncorndog.com/",
    "https://www.omfgdogs.com/",
    "https://www.sheepfilms.co.uk/gifs?pgid=kctc5nrd-afad6bc9-f898-4c06-83df-4ebd2de83b0f",
    "https://www.rrrather.com/",
    "https://bouncingdvdlogo.com/",
    "http://www.cachemonet.com/",
    "http://randomcolour.com/",
    "http://kryall.duckdns.org:5000/",
    "http://www.slightlyinteresting.com/lavalamp/lava.asp",
    "https://youtu.be/dQw4w9WgXcQ",
    "http://conceptlab.com/simulator/morning/clock800.html",
    "https://tse4.mm.bing.net/th?id=OIP.OvVtjJ31jDHzKZC2M-SkPQHaEK&pid=Api",
    "https://www.google.com/fbx?fbx=snake_arcade",
    "https://www.google.com/fbx?fbx=minesweeper",
]

window.onload = function() {
    document.getElementById("insert").textContent = `Click to get redirected to one of ${links.length} random website`
}


const randomWebsite = function() {
    window.location.href = links[Math.floor(Math.random() * links.length)];
}

const DecimalToBinary = function(x) {
    let out = ""
    x = parseInt(x, 10)
    while (x != 0) {
        out = (x % 2) + out
        x -= Math.ceil(x / 2)
    }
    alert("Binary: " + out)
}

const DecimalToHexadecimal = function(x) {
    x = parseInt(x, 10);
    let out = x.toString(16).toUpperCase();
    alert("Hexadecimal: " + out)
}

const HexadecimalToDecimal = function(x) {
    x = parseInt(x, 16);
    alert("Decimal: " + x)
}

const BinaryToDecimal = function(x) {
    x = parseInt(x, 2)
    alert("Decimal: " + x)
}

const checkBinaryKey = function() {
    let key = String.fromCharCode(window.event.keyCode);
    return key == "1" || key == "0";
}

const checkNumberKey = function() {
    let key = String.fromCharCode(window.event.keyCode);
    let keys = "0123456789".split("")
    return keys.includes(key);
}

const checkHexaNumberKey = function() {
    let key = String.fromCharCode(window.event.keyCode);
    let keys = "0123456789abcdef".split("")
    return keys.includes(key.toLowerCase()) ;
}

const randomPwd = function() {
    let len = 15;
    let password = "";
    let chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!§$%&/()=?`{[]}*><|@".split("")
    for (let i = 0; i < len; i++) {
        password = password + chars[Math.floor(Math.random() * chars.length)]
    }
    alert(password)
}

const checkPwdkey = function() {
    let keys = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!§$%&/()=?`{[]}*><|@".split("")
    let key = String.fromCharCode(window.event.keyCode);
    return keys.includes(key)
}

const PwdCheck = function(x) {
    let numbers = "0123456789".split("")
    let chars = "abcdefghijklmnopqrstuvwxy".split("")
    let charsUp = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
    let special = "!§$%&/()=?`{[]}*><|@".split("")
    
    let percentage = 0;

    if (x.length > 100) {
        percentage += 70;
    } else if (x.length > 60) {
        percentage += 50;
    } else if (x.length > 40) {
        percentage += 30;
    } else if (x.length > 20) {
        percentage += 5;
    } else if (x.length > 10) {
        percentage += 2;
    } else {
        percentage -= 10
    }


    let n = 0
    let c = 0
    let c2 = 0
    let s = 0

    x.split("").forEach(e => {
        if (numbers.includes(e)) n += 1
        else if (chars.includes(e)) c += 1
        else if (charsUp.includes(e)) c2 += 1
        else if (special.includes(e)) s += 1
    })

    let t = x.length

    n = Math.round(n / t * 100)
    c = Math.round(c / t * 100)
    c2 = Math.round(c2 / t * 100) 
    s = Math.round(s / t * 100)

    if (n < 5) percentage -= 10;
    if (c < 5) percentage -= 10;
    if (c2 < 5) percentage -= 10;
    if (s < 5) percentage -= 10;
    
    if (n > 10) percentage += 5;
    if (c > 10) percentage += 5;
    if (c2 > 10) percentage += 5;
    if (s > 10) percentage += 5;

    if (n > 15) percentage += 5;
    if (c > 15) percentage += 5;
    if (c2 > 15) percentage += 5;
    if (s > 15) percentage += 5;

    if (n > 20) percentage += 5;
    if (c > 20) percentage += 5;
    if (c2 > 20) percentage += 5;
    if (s > 20) percentage += 5;

    if (n > 25) percentage += 5;
    if (c > 25) percentage += 5;
    if (c2 > 25) percentage += 5;
    if (s > 25) percentage += 5;


    if (percentage == 130) alert("(9/9) Password is perfecto")
    else if (percentage > 100) alert("(8/9) Password is gud")
    else if (percentage > 80) alert("(7/9) Password is ok")
    else if (percentage > 60) alert("(6/9) Password is meh")
    else if (percentage > 40) alert("(5/9) Password is irgh")
    else if (percentage > 20) alert("(4/9) Password is ...")
    else if (percentage == 0) alert("(3/9) Password is shit")
    else if (percentage > -20) alert("(2/9) Password is extremely stupid")
    else alert("(1/9) Password is absolutely dumb, please think about your life decisions!")
}
