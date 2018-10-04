const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const users = require('./routes/users');

//port number
const port = 3000;

//cors
//app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/users', users);

//index route
app.get('/', (req, res) => {
    res.send("Invalid Endpoint")
});

//homepage route
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/page.html'));
});

app.listen(port, () => {
    console.log("Server started on port " + port )
});