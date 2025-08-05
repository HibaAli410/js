// const students = document.getElementById('students');
function dynamicTable(data, id) {
    const table = document.createElement("table");
    const container = document.getElementById(id);
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    const tr = document.createElement("tr");
    const keys = Object.keys(data[0])
    for (let key of keys) {
        const th = document.createElement("th");
        thead.appendChild(th);
        th.innerText = key.toUpperCase();
    }
    thead.appendChild(tr);
    table.appendChild(thead);
    data.forEach(element => {
        const row = document.createElement("tr");
        for (const value in element) {
            const td = document.createElement("td");
            row.appendChild(td);
             console.log(data[value]);
            td.innerHTML = element[value];
        }
        tbody.appendChild(row);
    });
    table.appendChild(tbody);
    container.appendChild(table);
}
async function getStudents() {
    const students = await fetch('student_info.json');
    const student = await students.json();
    return student;
}

getStudents().then((students) => {
    console.log(students);
    dynamicTable(students, "table-container")
});