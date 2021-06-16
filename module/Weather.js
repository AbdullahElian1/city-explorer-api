'use strict'
const axios = require('axios');

module.exports=getNameshandler;

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
        res.send(`error the server down weather =>${err}`);
    })

  }

  class Forecast{
    constructor(item){
        this.description = item.weather.description;
        this.date = item.valid_date;
    }
  }