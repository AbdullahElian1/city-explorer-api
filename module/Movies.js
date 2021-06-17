'use strict'

const axios =require('axios');

module.exports=getMoviesHandler;

let myMemory={};


function  getMoviesHandler(req, res) {
    let cityName = req.query.cityName;
    let key = process.env.MOVIE_API_KEY;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${cityName}&page=1`;

    if(myMemory[cityName]!==undefined){
        console.log('from the memory')
        res.send(myMemory[cityName]);
    }
    else{
        axios.get(url).then(apiResult =>{
            const movieArray = apiResult.data.results.map(item=>{
                return new Movie (item);
            })
            myMemory[cityName]=movieArray;
            console.log('from the API');
        res.send(movieArray);
        })
        .catch(err=>{
            res.send(`error the server down =>${err}`);
        })

    }


  }
    
    






class Movie {

    constructor(item) {
       
        this.title=item.title;
        this.overview=item.overview;
        this.imagel=`https://image.tmdb.org/t/p/original${item.poster_path}`;
        this.releasedOn=item.release_date;


    }
    }