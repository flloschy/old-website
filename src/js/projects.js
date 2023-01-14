const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}
let id
let indexes = []

const loadProjects = async () => {
    let content = document.getElementById("content")

    let repos = await (await fetch("https://api.github.com/users/flloschy/repos")).json()
    content.innerHTML = ""

    let privateCount = 0
    let forksCount = 0

    repos.forEach(async (element, index) => {
        indexes.push(index)

        let next =  true
        if (element['fork']) {forksCount += 1; next = false}
        if (element['private']) {privateCount += 1; next = false}
        if (!next) return

        let name = element["name"] ?? "No Name available"
        let url = element["html_url"]
        let description = element["description"] ?? "No Description available"
        let created = new Date(element["created_at"])
        let updated = new Date(element["updated_at"])
        created = `${created.getDate()}.${created.getMonth()}.${created.getFullYear()}`
        updated = `${updated.getDate()}.${updated.getMonth()}.${updated.getFullYear()}`
        let forks = element["forks"] ?? "0"
        let watchers = element["watchers"] ?? "0"
        let issues = element["open_issues"] ?? "0"
        let topics = element["topics"] ?? ["no Tags available"]
        let tags = ""
        topics.forEach(e => {
            tags += `<div style="display:inline; white-space: nowrap;"><img class="projectIcon" src="../src/images/tags.svg"><a class="projectTag">${e}</a></div>`
        })

        content.innerHTML +=  `<div class="project" id="i${index}" style="opacity:0">` +
                                `<img class="projectIcon" src="../src/images/code-slash.svg"><a class="projectTitle" href="${url}" target="_blank">${name}</a><br>` +
                                `<img class="projectIcon" src="../src/images/card-text.svg"><a class="projectDescription">${description}</a><br>` +
                                `${tags}<br><br>`+
                                `<img class="projectIcon" src="../src/images/recycle.svg"><a class="projectForks">${forks}</a>` +
                                `<img class="projectIcon" src="../src/images/eye.svg"><a class="projectWatchers">${watchers}</a>` +
                                `<img class="projectIcon" src="../src/images/bug.svg"><a class="projectIssues">${issues}</a><br>` + 
                                `<img class="projectIcon" src="../src/images/clock.svg"><a class="projectCreated">${created}</a>` +
                                `<img class="projectIcon" src="../src/images/clock-history.svg"><a class="projectUpdated">${updated}</a>` +
                              `</div>`
        //content.innerHTML 
    });

    content.innerHTML +=    `<article style="margin-bottom:5px">More info</article>` +
                            // `<output>${privateCount} additional private repo(s)</output><br><br>` +
                            `<output>${forksCount} additional forked repo(s)</output><br><br><br>`

    content.innerHTML += `<article style="margin-bottom:5px">What does what mean?</article>` + 
                         `<div class="projectExample">` +
                            `<img class="projectIcon" src="../src/images/code-slash.svg"><a class="projectTitle">Link & Name</a><br>` +
                            `<img class="projectIcon" src="../src/images/card-text.svg"><a class="projectDescription">Description</a><br>` +
                            `<img class="projectIcon" src="../src/images/tags.svg"><a class="projectTag">Tag</a><br>` +
                            `<img class="projectIcon" src="../src/images/recycle.svg"><a class="projectForks">Forks</a>` + 
                            `<img class="projectIcon" src="../src/images/eye.svg"><a class="projectWatchers">Watchers</a>` + 
                            `<img class="projectIcon" src="../src/images/bug.svg"><a class="projectIssues">Issues</a><br>` +
                            `<img class="projectIcon" src="../src/images/clock.svg"><a class="projectCreated">Date of Creation</a>` +
                            `<img class="projectIcon" src="../src/images/clock-history.svg"><a class="projectUpdated">Date of last Update</a>` + 
                         `</div>`
    document.getElementById("i0").style.opacity = "1"
}


const addProject = () => {
    var limit = Math.max( document.body.scrollHeight, document.body.offsetHeight, 
        document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );

    console.log(Math.ceil(document.documentElement.scrollHeight - document.documentElement.clientHeight) , window.scrollY+5);
    for (let index in indexes) {
        let element = document.getElementById(`i${index}`)
        if (element) {
            if ((window.scrollY + window.innerHeight)/4*3 - element.offsetHeight / 2 > element.offsetTop || Math.ceil(document.documentElement.scrollHeight - document.documentElement.clientHeight) < window.scrollY+5) {
                element.style.opacity = "1"
            }
        }
    }
}

window.addEventListener('scroll', addProject)