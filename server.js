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

  }
    






class Forecast {

    constructor(item) {
        this.date = item.valid_date;
        this.description = item.weather.description;


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

