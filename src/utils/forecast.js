const request = require('request');

const forecast = (latitude,longitude, callback)=>{
    const url=`https://api.darksky.net/forecast/ddfd5063c7ef710854926681d64699a9/${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}?units=si`;

    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to the internet',undefined);
        }else if(body.error){
            callback("Cannot find location. Try another search",undefined);
        }else{
            callback(undefined,{
                placename : body.daily.data[0].summary,
                temperature : body.currently.temperature,
                Rainchance: body.currently.precipProbability
            });
        }
        
    });
}

module.exports = forecast;