
const updateContent = function(name) {
    let content = document.getElementById('content')
    let req = new XMLHttpRequest();
    req.open("GET", `src/html/${name}.html`, false);
    req.send(null);
    content.innerHTML = req.responseText
}
