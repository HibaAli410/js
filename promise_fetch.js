// API 1
//let metadata = fetch('https://dog.ceo/dog-api/');  
// error occur :127.0.0.1/:1 Access to fetch at 'https://dog.ceo/dog-api/' from origin 'http://127.0.0.1:5500' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.Understand this error
//promise_fetch.js:1  GET https://dog.ceo/dog-api/ net::ERR_FAILED 200 (OK)


// API 2
//let metadata = fetch('https://developer.iconfinder.com/reference/overview-1');

// API 3
//let metadata = fetch('workers_info.json');  //fullfill

// API 4
//let metadata = fetch('https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=REPLACE_ME'); //fullfill

// API 5
let metadata = fetch('https://api.thecatapi.com/v1/images/0XYvRd7oD');  //fullfill
metadata.then(resolve => resolve.json())
    .then(data => {
        console.log(data);
        // console.log(resolve.status);
    });
// From folder 6
fetch('student_info.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });


// promise 1
let food_promise = new Promise(function (resolve, reject) {
    //  console.log("This is food order By Promise");
    setTimeout(() => {
        resolve(5695);

    }, 4000);

})
console.log(food_promise);
food_promise.then((value) => {
    console.log(value);
});

//promise 2 
let order_promise = new Promise((myresolve, myreject) => {
    //console.log("This is promise is panding");
    setTimeout(() => {
        myresolve(true);
    }, 4000)
})

console.log(order_promise);

let rejection = new Promise((myres, myrej) => {
    console.log("We fullfill your promise")
    setTimeout(() => {
        myrej(new Error("error there is something went wrong "))
    }, 4000);
})
console.log(rejection);

rejection.catch((error) => {
    console.log("Network Error please check your Connections")
})

console.log("hello one");
setTimeout(() => {
    console.log("Hellow two in 2 second");
}, 2000);
console.log("my name is Hellow three");

// async function weather(){
//     let hydweather = new Promise(resol, rejec) => {
//             setTimeout(()=>{
//                 resol(34)
//             },3000)
//     }
// }

// async function weather() {
//     let hydweather = new Promise((resolve, reject) => {
//        setTimeout(() => {
//         resolve(34);
//        }, 3000); 
//     })
//    let mirpur =  new Promise((resolve, reject) => {
//          setTimeout(() => {
//         resolve(30);
//        }, 3000); 
//     })
// }

