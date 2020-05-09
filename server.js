// Setup empty JS object to act as endpoint for all routes
let projectData = [];

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Dependencies
const bodyParser = require('body-parser')

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 80;
const server = app.listen(port, listening);
function listening(){
    console.log(`Running on localhost: ${port}`);
}

// Routes
app.get('/all', sendData);

function sendData (request, response) {
    response.send(projectData);
};

app.post('/addJournalData', addJournalData);

function addJournalData (request, response){
    newEntry = {
        date: request.body.date,
        temp: request.body.temp,
        content: request.body.content
    }
    projectData = []
    projectData.push(newEntry);
};