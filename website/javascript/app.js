// Personal API Key for OpenWeatherMap API
const apiUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=57d8704d83b47e11e5115af0dc5cff52';

/* Global Variables */
let tempUnit = '&units=imperial';
let tempUnitText = ' °F';
const errorText = document.getElementById('error-text');

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', buttonClicked);

/* Function called by event listener */
function buttonClicked() {
    let zipCode = document.getElementById('zip').value;
    let feelings = document.getElementById('feelings').value;
    let countryCode = document.getElementById('country').value;
    if (countryCode == ',be') {
        tempUnit = '&units=metric';
        tempUnitText = ' °C';
    } else {
        tempUnit = '&units=imperial';
        tempUnitText = ' °F';
    }
    if (zipCode && feelings) {
        let urlConstruct = apiUrl + zipCode + countryCode + apiKey + tempUnit;
        getWeather(urlConstruct)
        .then(function(data){
            if (data.cod == 200) {
                let date = new Date(data.dt * 1000)
                let date_str = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear();
                postData('/addJournalData', {date: date_str, temp: data.main.temp + tempUnitText, content: feelings})
                updateView('/all');
            } else {
                errorText.textContent = "Something went wrong when calling the API, please check your data or try again later.";
                errorText.style.display = "block";
            }

        }, reason => {
            console.error(reason);
        })
    } else if (zipCode) {
        errorText.textContent = "Please explain how you feel that moment.";
        errorText.style.display = "block";
    } else if (feelings) {
        errorText.textContent = "You forgot to enter a zip/postal code.";
        errorText.style.display = "block";
    } else {
        errorText.style.display = "block";
    }

}

/* Function to GET Web API Data*/
const getWeather = async ( url = '') =>{ 

    const res = await fetch(url);

    try {
        // Transform into JSON
        let data = await res.json()
        return data;
        
    }
    catch(error) {
        console.log("error", error);
        // appropriately handle the error
    }
};

/* Function to POST data */
// Async POST
const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });

    try {
        let newData = await response.json();
    }catch(error) {
        console.log("error", error);
    }
};

/* Function to GET Project Data */
let updateView = async ( url = '') => {

    let request = await fetch(url);

    try {
        let dataJournal = await request.json();
        document.getElementById('date').innerHTML = dataJournal[0].date;
        document.getElementById('temp').innerHTML = dataJournal[0].temp;
        document.getElementById('content').innerHTML = dataJournal[0].content;
        document.querySelector('.entry').style.display = "block";
    } catch(error) {
        console.log('error', error);
    };
};

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();