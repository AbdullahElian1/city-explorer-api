const express=require('express');

const server=express();
const weatherData = require('./data/weather.json');
const cors = require('cors');
server.use(cors());
require ("dotenv").config();
const PORT = process.env.PORT || 3010; 

const arr=[];

//locallhost:3010/test
server.get('/test',(req,res)=>{
    res.send("hello from test route ");
    
});

//localhost:3010/getNames?cityLan=-36.071254&cityLon=-95.785269
server.get('/getNames',(req,res)=>{
let lan=req.query.cityLan;
let lon=req.query.cityLon;

    let cityNames = weatherData.city.find(item=>{
        if(item.lat == lan && item.lon==lon)
        return item.city_name;
    })
    let forecast1 =  new Forecast(cityNames.date,cityNames.description) ;
    arr.push(forecast1);
    console.log(arr);
    // if(cityNames)
    res.send(arr);
    // else
    // res.send('sorry, this page not found');

})



class Forecast {
    
    constructor( date1, description1){
         this.date = date1;
         this.description= description1;
        

    }


    
}


//locallhost:3010:/
server.get('/',(req,res) =>{
    res.send('home route');
})


//locallhost:3010/getName?cityName=Amman

    
    //localhost:3010 .....
server.get('*',(req,res) =>{
    res.status(500).send('sorry, this page not found');
})




server.listen(process.env.PORT || 3010,()=>{
    console.log(`im here ${PORT}`);
});

