// function nestedlist(classname, list){
    const listarr = ["Home", "Blog", "Contact Us", "Events"]
    const listcontainer = document.createElement("div");
    listcontainer.className = "listclass";
    const ul = document.createElement("ul");
    listcontainer.appendChild(ul);
    listarr.forEach(links => {
        console.log(links);
        const li = document.createElement('li');
        ul.appendChild(li);
    });
// }