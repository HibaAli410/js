// let body = document.getElementById('representive')
// let table = document.createElement("table")
// body.appendChild(table)
// const thead = document.createElement("thead")
// const tbody = document.createElement("tbody")
// const tfoot = document.createElement("tfoot")
// const tr = document.createElement("tr")
// const td = document.createElement("td")
// const td_2 = document.createElement("td")
// const td_3 = document.createElement("td")
// table.appendChild(thead)
// thead.appendChild(tr)
// tr.appendChild(td)
// tr.appendChild(td_2)
// tr.appendChild(td_3)
// td.innerHTML = "SNumber :"
// td_2.innerHTML="Name :"
// td_3.innerHTML="Roll Number"



// const tr_1 = document.createElement("tr")
// const col_1 = document.createElement("td")
// const col_2 = document.createElement("td")
// const col_3 = document.createElement("td")
// table.appendChild(tbody)
// tbody.appendChild(tr_1)
// tr_1.appendChild(col_1)
// tr_1.appendChild(col_2)
// tr_1.appendChild(col_3)
// col_1.innerHTML = "hello"
// col_2.innerHTML = "kitten"
// table.appendChild(tfoot)


// console.log(body)
async function rendertable(data, demo) {
    let tabledata = await fetch("student_info.json");
    let json_data = await tabledata.json();

    demo = document.getElementById("demo");
    const mytable = document.createElement("table");
    demo.appendChild(mytable);
    const thead = document.createElement("tr");
    
   for(let head in json_data[0])  {
        const th = document.createElement('th');
        thead.appendChild(th);
        th.innerHTML = head.toUpperCase();
    }
    mytable.appendChild(thead);
     json_data.forEach((element) => {

        //console.log(element);
        const tr = document.createElement("tr");
        for (let key in element) {
            const td = document.createElement("td");
            tr.appendChild(td);
            td.innerHTML = element[key];
        }
        mytable.append(tr);
    });

}
rendertable();




console.log(body);
