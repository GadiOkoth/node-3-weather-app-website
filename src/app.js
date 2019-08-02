const path = require('path');
const express = require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')

const app = express();
const port = process.env.PORT ||3000;

//Define paths for Express
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//Set up handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Set up static directory to serve
app.use(express.static(publicDirectoryPath));
 
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Gadi Okoth'
    });
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Gadi Okoth'
    });
});

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help Please',
        message: 'Please google it',
        name: 'Gadi Okoth'
    });
});

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must enter an address'
        })
    }
    geocode(req.query.address,(error, {latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error:error
            })
        }else{
            forecast(latitude,longitude, (error, forecastData) => {
                if (error){
                    return res.send({
                        error: error
                    })
                }else{
                    res.send({
                        title: 'Weather forecast',
                        name: 'Gadi Okoth',
                        forecast: forecastData,
                        location: location,
                        address: req.query.address
                    });
                    /*res.render('weather',{
                        title: 'Weather forecast',
                        name: 'Gadi Okoth',
                        forecast: forecastData,
                        //forecast: JSON.stringify(forecastData),
                        location: location,
                        address: req.query.address
                    });*/
                   // console.log('Location is '+location)
                    //console.log('Data', forecastData);
                }          
              });
         }  
    })
});

app.get('/help/*',(req,res)=>{
    res.render('404Page',{
        title: 'No Help',
        name: 'Gadi Okoth',
        message: 'Help Article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404Page',{
        title: 'Error page',
        name: 'Gadi Okoth',
        message: 'Page Not Found'
    })
});

app.listen(port,()=>{
    console.log(`Server is listening at port ${port}`);
});