// Targeting DOM Element
const main = document.getElementById('main');
const addUser = document.getElementById('add_user');
var valueDouble = document.getElementById('double_money');
const filterM = document.getElementById('filter_m');
const sortWealth = document.getElementById('sort_by-wealth');
const addWealth = document.getElementById('add_wealth');

// Creating an empty array
var data = [];

// Function for getting Random Users
async function getData(){
    // Wait from the result from API 
    var response = await fetch("https://randomuser.me/api/");
    // Wait for the response to convert into JSON format
    const data = await response.json()

    // Assigning data into user variable
    const user = data.results[0]
   
    // Create Objects for User (NewData)
    const newData = {
        name: `${user.name.title} ${user.name.first} ${user.name.last}`,
        income: Math.floor(Math.random() * 10000)
    }

    // Adding new user into the array
    addData(newData)
}

function doubleMoney(){
    // Old one data list
    console.log("Old Data", data)

    // Loop through all user in the user data array
    // For each user, return the user data
    // Overwrite the data array with the new data array created by map
    data = data.map(user => {
        return { ...user, income: user.income * 2}
      // New one data list
    })
    console.log("New Data", data)
    getUpdateDOM()
}

function filterUser(){
    // Filter array or user whose value is greater then millions
    data = data.filter(user => user.income >= 1000000)
    // Update DOM
    getUpdateDOM()
}

function sortingValue(){
    data = data.sort((a,b) => a.income - b.income)

    getUpdateDOM()
}

function totalWealth(){
    getUpdateDOM()
    // Add up all income from all user
    // Accumulator start from 0 and add the current user balance or each iteration
    const income = data.reduce((acc,user) => (acc += user.income),0)
    // Create Element
    const incomeElement = document.createElement('div')
    incomeElement.innerHTML = `<h2>Total Wealth: ${formatNumberToDollar(income)}</h2>`
    main.appendChild(incomeElement)
}

// Function for adding data into the array
function addData(newData){
    data.push(newData);
    // Updating DOM
    getUpdateDOM()
}

// function to format random numbers as money
function formatNumberToDollar(number){
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// update DOM function
function getUpdateDOM(userData = data){
    main.innerHTML = '<h2><strong>User</strong> Wealth</h2>'
    // Loop through User data and render in UI
    userData.forEach(user =>{
       const myDiv = document.createElement('div');
       myDiv.classList.add('user');
       myDiv.innerHTML = `<strong>${user.name}</strong> <strong>${formatNumberToDollar(user.income)}</strong>`
       main.appendChild(myDiv)
    })
}

// Events for all Actions
addUser.addEventListener('click',getData)
valueDouble.addEventListener('click',doubleMoney)
filterM.addEventListener('click',filterUser)
sortWealth.addEventListener('click',sortingValue)
addWealth.addEventListener('click',totalWealth)

getData()
getData()
getData()
getData()

