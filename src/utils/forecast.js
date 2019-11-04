const request = require('request')



const forecast = (latitude,longitude, callback) =>{
    const url = 'https://api.darksky.net/forecast/ba0d4cdeea07437aa039797057523085/'+ latitude+ ',' +longitude

    request({url, json:true}, (error, {body})=>{
        if (error){
            callback('Unable to connect to the weahter Services!', undefined)
        }else if(body.error){
            callback("Unable to find the location! Try another address!", undefined)
        }
        else{
            // callback(undefined,{
            //     weather: response.body.currently,
            //     now: response.body.daily.data[0].summary + 'It is currently '+ response.body.currently.temperature+ ' degree and '+response.body.currently.precipProbability+'% chance of rain..'
            // })

            callback(undefined,body.daily.data[0].summary + '\nIt is currently '+ body.currently.temperature+ ' degree and '+body.currently.precipProbability+'% chance of rain..'
             + '\n Highest Temprature is: '+ body.daily.data[0].temperatureHigh + '\nLowest Temprature is: '+ body.daily.data[0].temperatureLow)
        }
    })
}

module.exports = forecast