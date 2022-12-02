let content = ""

const loadProjects = async function() {
    if (document.getElementById('content').innerHTML.startsWith('<div class="center pr">')) return
    if (content != "") {
        document.getElementById('content').innerHTML = content
        return
    }
    let repos = await (await fetch("https://api.github.com/users/flloschy/repos")).json()
    repos.forEach(async element => {
        if (element["private"]) return
        if (element["fork"]) return

        let tags = []
        element["topics"]?.forEach(t => {
            tags.push(`<a class="prtag">${t}</a>`)
        })

        let created = new Date(element["created_at"])
        
        content += `<div class="center pr">` +
            `<a class="prtitle" href="${element["html_url"]}" target="_blank">${element["name"]}</a><br>` +
            (element["description"] ? `<a class="prdec">${element["description"]}</a><br>` : "") + 
            `<a class="prlanguage">${element["language"]} ● ${created.getDate()}.${created.getMonth()}.${created.getFullYear()}</a><br>` +
            tags.join('<a class="prsplit">●</a>') +
            `</div>`
    });
    content += "<br>"
    document.getElementById('content').innerHTML = content
}