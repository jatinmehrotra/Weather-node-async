import request from "postman-request";
import dotenv from "dotenv";
dotenv.config();


let forecast = (lat, long, callback) => {
    let url = 'http://api.weatherstack.com/current?access_key=' + process.env.forecastAccessKey + '&query=' + lat + ',' + long;
    request({
        url,
        json: true
    }, (error, response) => {
        if (error) {
            callback("unable to connect to weather service ", undefined);
        } else if (response.body.error) {
            callback("unable to find temprature for given location", undefined);
        } else {
            let obj = {
                feelslike: response.body.current.feelslike,
                temp: response.body.current.temperature,
                forecast: response.body.current.weather_descriptions[0]
            }
            callback(undefined, obj);
        }
    });
}

export default forecast;