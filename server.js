const express = require('express');

const server = express();
const weatherData = require('./data/weather.json');
const cors = require('cors');
const axios = require('axios');
server.use(cors());
require("dotenv").config();
const PORT = process.env.PORT || 3010;



//locallhost:3010/test
server.get('/test', (req, res) => {
    res.send("hello from test route ");

});

//https://api.weatherbit.io/v2.0/forecast/daily?lat=48.8566969&lon=2.3514616&key=fcad1dfcccdd40fea3251a2c7a1be1b4
//localhost:3010/getNames?cityLan=-36.071254&cityLon=-95.785269
const getNameshandler =require('./module/Weather');
server.get('/getNames', getNameshandler)

  


  //https://api.themoviedb.org/3/search/movie?api_key=730795695fbd9330eebb90692a123233&query=usa&page=1&include_adult=false
  //localhost:3010/movies?cityName=amman
const getMoviesHandler=require('./module/Movies')
  server.get('/movies', getMoviesHandler)

//locallhost:3010:/
server.get('/', (req, res) => {
    res.send('home route');
})
//localhost:3010 .....
server.get('*', (req, res) => {
    res.status(500).send('sorry, this page not found');
})

server.listen(process.env.PORT || 3010, () => {
    console.log(`im here ${PORT}`);
});

