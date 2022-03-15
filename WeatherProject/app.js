const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res) {

    res.sendFile(__dirname+"/index.html");
    
});

app.post("/", function(req, res) {
 
    const query = req.body.cityName;
    const apiKey = "3d74326f5e094838990a2bf101162e30";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    https.get(url, function(response) {

        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const iconUrl = "http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png";
            res.write("<h1>The Temperature in " + query + " is " + temp + " degrees celsius.</h1>");
            res.write("<h3>And the weather is "+description+".</h3>");
            res.write("<img src='"+iconUrl+"' alt='"+description+"'>");
            res.send();
        });
    });

})









app.listen(3000, function() {
    console.log("Server is up and running on port 3000...");
});