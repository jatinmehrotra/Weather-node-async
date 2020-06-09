import request from 'postman-request';
import dotenv from "dotenv";
dotenv.config();

let geocode = (address, callback) => {
    let url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + process.env.geocodeAccessKey + '&limit=1';
    request({
        url,
        json: true
    }, (error, response) => {
        if (error) {
            callback("unable to connect to geolocation service", undefined);
        } else if (response.body.features.length === 0) {
            callback("unable to fetch coordinates for the given location", undefined);
        } else {
            let obj = {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            }
            callback(undefined, obj);
        }
    });
}

export default geocode;