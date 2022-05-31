const res = require("express/lib/response");
const { get, json } = require("express/lib/response");
const https= require("https");
const bodyParser = require("body-parser")

const express = require("express");
const { parse } = require("path");
const req = require("express/lib/request");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));



app.get("/", function(req,res)
{
 res.sendFile(__dirname + "/index.html");  
});
app.post("/", function(req, res){
   console.log (req.body.cityName);
    console.log("Post request recived");
    const query =req.body.cityName;
const url="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units=metric&appid=70ad60da9cb26818341c7a616beb36ba";
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
        const weatherData = JSON.parse(data)
        const temp = weatherData.main.temp
        const weatherDescription = weatherData.weather[0].description
        res.write("<p> The weather is currently "+ weatherDescription+" </p>");
        res.write("<h1>The temperature in "+ query +" is " + temp + " degree Celsius</h1>");
        res.send();
        })
    })
})

    




app.listen(3000,function() {
    console.log("server is running on port 3000.");
})