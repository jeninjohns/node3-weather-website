const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=47a11ec0237fb601dcfee1350c36376f&units=metric'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.cod === "400") {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.weather[0].main + body.weather[0].description + '. The temperature is ' + body.main.temp + ' degree celsius')
        }
    })
}

module.exports = forecast