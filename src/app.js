const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'JJ'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'JJ'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'JJ',
        helpText: 'You can send any queries here'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {})=>{
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData)=>{
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                location,
                forecast: forecastData
            })
        })
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: '404 Page',
        name: 'JJ',
        errorText: 'Help article not found'
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        title: '404 Page',
        name: 'JJ',
        errorText: 'Page not found'
    })
})

app.listen(port , ()=>{
    console.log('Server is up on port' + port)
})