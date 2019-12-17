const request = require('request');

const getforcast = (longitude,lattitude,location,callback)=>{
    const url = `https://api.darksky.net/forecast/90afcb28068363ac5b59265c3dd2d476/${longitude},${lattitude}?units=si`;
    request({url:url, json:true}, (error,response)=>{
        if(error)
            return callback(true,error);
        else{
            const data = {
                temperature: response.body.currently.temperature,
                humidity: response.body.currently.humidity,
                cloudCover: response.body.currently.cloudCover,
                visibility: response.body.currently.visibility,
                summary: response.body.currently.summary,
                location
            }
            return callback(false,data);
        }
    })
}

module.exports = getforcast;