const textList = [
    { text: "Welcome", link: "https://floschy.me/" },
    { text: "floschy.me", link: "https://floschy.me/" },
    { text: "flloschy", link: "https://github.com/flloschy" },
    {
        text: "floschy#1248",
        link: "https://discord.com/users/578620425060483072",
    },
];
let current = textList.length - 1;
let temptext = textList[current].text.split("");
let id = undefined;
var block;
var x = window.innerWidth / 2;
var y = window.innerHeight / 2;
var moving = false;
let bar = NaN;
let pageHeight = 0;

let home = NaN;
let aboutMe = NaN;
let projects = NaN;
let links = NaN;
let NAVhome = NaN;
let NAVaboutMe = NaN;
let NAVprojects = NaN;
let NAVlinks = NaN;

function updateCursor() {
    moving = true;

    block.animate(
        {
            left: x - block.clientWidth / 2 + "px",
            top: y - block.clientHeight / 2 + window.scrollY + "px",
        },
        { duration: 15000, fill: "forwards", easing: "ease-in-out" }
    );
}

function scrollableArea() {
    function findHighestNode(nodesList) {
        for (let i = nodesList.length - 1; i >= 0; i--) {
            if (nodesList[i].scrollHeight && nodesList[i].clientHeight) {
                var elHeight = Math.max(
                    nodesList[i].scrollHeight,
                    nodesList[i].clientHeight
                );
                pageHeight = Math.max(elHeight, pageHeight);
            }
            if (nodesList[i].childNodes.length)
                findHighestNode(nodesList[i].childNodes);
        }
    }

    findHighestNode(document.documentElement.childNodes);
}

function unselectAll() {
    NAVhome.classList.remove("navSelect");
    NAVaboutMe.classList.remove("navSelect");
    NAVprojects.classList.remove("navSelect");
    NAVlinks.classList.remove("navSelect");
    NAVhome.classList.remove("navSelectHalf");
    NAVaboutMe.classList.remove("navSelectHalf");
    NAVprojects.classList.remove("navSelectHalf");
    NAVlinks.classList.remove("navSelectHalf");
}

function itsDone() {
    scrollableArea();
    block = document.getElementById("block");
    bar = document.getElementById("scrollBlock");
    NAVhome = document.getElementById("navItem1");
    NAVaboutMe = document.getElementById("navItem2");
    NAVprojects = document.getElementById("navItem3");
    NAVlinks = document.getElementById("navItem4");
    home = document.getElementById("home");
    aboutMe = document.getElementById("aboutMe");
    projects = document.getElementById("projects");
    links = document.getElementById("links");

    updateCursor();

    window.scrollTo({
        top: 0,
        left: 0
    })

    document.addEventListener("mousemove", function (event) {
        [x, y] = [event.clientX, event.clientY];
        updateCursor();
    });

    document.addEventListener("scroll", function (event) {
        updateCursor();

        if (window.scrollY > links.offsetTop + links.offsetHeight) {
            unselectAll();
            NAVlinks.classList.add("navSelect");
            NAVprojects.classList.add("navSelectHalf");
        } else if (
            window.scrollY >
            projects.offsetTop + projects.offsetHeight
        ) {
            unselectAll();
            NAVlinks.classList.add("navSelectHalf");
            NAVprojects.classList.add("navSelect");
            NAVaboutMe.classList.add("navSelectHalf");
        } else if (window.scrollY > aboutMe.offsetTop + aboutMe.offsetHeight) {
            unselectAll();
            NAVhome.classList.add("navSelectHalf");
            NAVaboutMe.classList.add("navSelect");
            NAVprojects.classList.add("navSelectHalf");
        } else {
            unselectAll();
            NAVaboutMe.classList.add("navSelectHalf");
            NAVhome.classList.add("navSelect");
        }
    });

    setInterval(function () {
        if (!moving) {
            const randomX =
                Math.floor((Math.random() * window.outerWidth) / 4) -
                window.outerWidth / 8;
            const randomY =
                Math.floor((Math.random() * window.outerHeight) / 4) +
                window.scrollY -
                window.outerHeight / 8;
            block.style.filter =
                "blur(150px)"
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
    toggle();
}

///////////////////////////////////////////////////

function toggle() {
    if (id) return;
    current = (current + 1) % textList.length;

    let i1 = 0;

    let randomstring = textList[current].text
        .split("")
        .map((v, i, a) => {
            return { text: v, index: i };
        })
        .sort((e) => Math.random() - 0.5);

    let title = document.getElementById("title");

    id = setInterval(function () {
        if (i1 < textList[current].text.length) {
            temptext = title.innerHTML.split("");

            if (title.innerHTML.length > textList[current].text.length) {
                temptext.pop();
            } else if (textList[current].text.length > title.innerHTML.length) {
                temptext.push("");
            }
            temptext[i1] = randomstring[i1].text;

            title.innerHTML = temptext.join("");
            i1++;
        } else {
            let sorted = true;
            for (let i = 0; i < randomstring.length - 1; i++) {
                if (randomstring[i].index > randomstring[i + 1].index) {
                    let temp = randomstring[i];
                    randomstring[i] = randomstring[i + 1];
                    randomstring[i + 1] = temp;
                    sorted = false;
                }
            }

            title.innerHTML = randomstring.map((e) => e.text).join("");

            if (sorted) {
                clearInterval(id);
                title.href = textList[current].link;
                id = undefined;
            }
        }
    }, 100);
}

function scrollIt(hash) {
    location.hash = "#" + hash;
}



async function loadProjects() {

    let repos = await (await fetch("https://api.github.com/users/flloschy/repos")).json();
    let j = 0
    const projects = document.getElementById('projectContent')
    for (let i = 0; i < repos.length; i++) {
        console.log(repos[i]['fork']);
        if (repos[i]['fork']) continue
        j++
        const name = repos[i]['name']
        const url = "https://github.com/" + repos[i]['full_name']
        const description = !repos[i]['description'] ? "[ No description ]" : repos[i]['description']
        const topics = repos[i]['topics']
        let creation = new Date(repos[i]['created_at'])
        const languages = await(await fetch(repos[i]['languages_url'])).json();
        
        let tags = ""
        topics.forEach(e => {
            tags += `<li>${e}</li>`
        })

        if (tags) {
            tags = `<ol class="projectList"><li class="keyword">Topics: </li>${tags}</ol>`
        }

        let langs = ""
        Object.keys(languages).forEach(e => {
            langs += `<li>${e}</li>`
        });
        if (langs) {
            langs = `<ul class="projectLanguages"><li class="keyword">Languages: </li>${langs}</ul>`
        }


        creation = creation.toDateString().split(" ")
        creation.shift()
        creation = creation.join("/")



        const str = `<article class="${j%2==0 ? 'left nicePink' : 'right niceBlue'} projectArticle">` +
            (j%2==0 ? `<h1><a href="${url}" target="_blank">${name} <a class="projectDate">${creation}</a></a></h1>` :
                      `<h1><a class="projectDate">${creation}</a><a href="${url}" target="_blank"> ${name}</a></h1>`
            )+
            `${description}` +
            `${langs}` +
            `${tags}` +
        `</article>`

        projects.innerHTML += str;

    }

}