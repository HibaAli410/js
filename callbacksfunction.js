function custom_func_addition(num1, num2) {
    var num1
    var num2
    var num3 = num1 + num2
    return num3
}
custom_func_addition(4, 7)

// second function
function goodevening(student_name) {
    console.log("Hi" + student_name)
    return student_name
}

// third function
function delayMessage(callback) {
    setTimeout(
        function () {
            console.log("2 seconds passed ");
            callback(); // call the function you gave it
        },
        8000);
}

function afterDelay() {
    console.log("Now running the callback!");
}
delayMessage(afterDelay);
delayMessage(afterDelay);

//forth function

function wait(name, callbacks) {
    setTimeout(
        function () {
            console.log("Hey your Conformation has recieved successfully" + name);
            callbacks();
        },
        8000
    );
    return name;
}

function conformation() {
    console.log("Thankyou for asking")
}
//wait("Radolf", conformation);


// 5th function
function process() {
    console.log("You have complete it")
}
function addition(value1, value2, result) {
    setTimeout(
        function () {
            console.log(value1 + "is first value");
            console.log(value2 + "is second value");
            const value3 = value1 + value2;
            console.log("your total is " + value3);
            result();
            return (value1, value2, value3);
        },
        3000
    )

}
addition(5, 9, process)

// end
// its show undefne..?


// 6th function
// function studentName(sname){
//         const sname = "Ali";
//         return  sname;
// }
// function workerName(wname){
//         const wname = "Raza";
//         return wname;
// }
// studentName();
// workerName();



// 7th function
function starTriangle(rows) {
    for (let i = 1; i <= rows; i++) {
        let pattern = '';
        for (let j = 1; j <= i; j++) {
            pattern += '* ';
        }
        console.log(pattern);
    }
    return rows;
}

function showTriangle(name) {

    console.log("waiting " + name);

}

showTriangle("Rio", starTriangle(3));

function showit() {
    const fname = document.getElementById("fname").value;

    document.getElementById("myname").innerHTML = fname + ". . . Dear Customer Your data is in progress..";
}

// dom document object module it represent data in structure form . the all generation where it to belong.
//variables  its a place,or container who store our information data may be number,alphabets,sign and many more
//types of data 1-premative(numbers,boolean,charachters,strings,floats) 2-nonpremative(array,graphs)
//output medthod console.log(),[alter]
//callback functions its a custom function which you made and the functionalaty of this function is you
// can call a function into a function


//setTimeout(()=>{console.log("present it now")},3000);

function present(show) {
    setTimeout(() => { show(); }, 3000);

}

function task() {
    console.log("its a 2nd function");
}
present(task);


