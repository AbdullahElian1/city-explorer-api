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
server.get('/getNames', getNameshandler)

  function  getNameshandler(req, res) {
    let lat = req.query.cityLan;
    let lon = req.query.cityLon;
    let key = process.env.WEATHER_API_KEY;

    let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${key}`
   
   

    axios.get(url).then(apiResult =>{
        console.log('inside promise');
        const weatherArray = apiResult.data.data.map(item=>{
        return new Forecast(item);
        })
    res.send(weatherArray);
    })
    .catch(err=>{
        res.send(`error the server down =>${err}`);
    })

  }

  class Forecast{
    constructor(item){
        this.description = item.weather.description;
        this.date = item.valid_date;
    }
  }


  //https://api.themoviedb.org/3/search/movie?api_key=730795695fbd9330eebb90692a123233&query=usa&page=1&include_adult=false
  //localhost:3010/movies?cityName=amman
  server.get('/movies', getMoviesHandler)
  function  getMoviesHandler(req, res) {
    let cityName = req.query.cityName;
    let key = process.env.MOVIE_API_KEY;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${cityName}&page=1`;

    axios.get(url).then(apiResult =>{
        const movieArray = apiResult.data.results.map(item=>{
        return new Movie (item);
        })
    res.send(movieArray);
    })
    .catch(err=>{
        res.send(`error the server down =>${err}`);
    })

  }
    
    






class Movie {

    constructor(item) {
       
        this.original=item.original_title;
        this.overview=item.overview;
        this.averageVotes=item.vote_average;
        this.totalVotes=item.total_votes;
        this.imagel=item.poster_path;
        this.popularity=item.popularity;
        this.releasedOn=item.release_date;


    }
    }







//locallhost:3010:/
server.get('/', (req, res) => {
    res.send('home route');
})


//locallhost:3010/getName?cityName=Amman


//localhost:3010 .....
server.get('*', (req, res) => {
    res.status(500).send('sorry, this page not found');
})




server.listen(process.env.PORT || 3010, () => {
    console.log(`im here ${PORT}`);
});

