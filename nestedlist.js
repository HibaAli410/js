const listcollection = ["Home", "Blog", { item: "contact Us", subitem: ["facebook", "Mail", "Address"] }, "Events", { item: "Help", subitem: ["bymail", "ByCall"] }];
function list(classname, list) {
    const navcontainer = document.createElement("nav");
    navcontainer.className = classname;
    const ul = document.createElement("ul");
    navcontainer.appendChild(ul);
    list.forEach(item => {
        console.log(item);
        const li = document.createElement('li');
        // li.innerText = item;
        // if a item an Object 
        if (typeof (item) === "object" && !Array.isArray(item)) {
            li.innerText = item.item;
            const nestedul = document.createElement("ul");
            item.subitem.forEach(sub => {
                const nestedli = document.createElement("li");
                nestedli.innerText = sub;
                nestedul.appendChild(nestedli);
            });
            li.appendChild(nestedul);
        }
        // If item is a string
        else {
            li.innerText = item;
        }
        ul.appendChild(li);
    });
    document.body.appendChild(navcontainer);
}

list("nestedlist", listcollection);