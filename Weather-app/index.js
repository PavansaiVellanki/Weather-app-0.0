const express = require("express");
const bodyParser = require("body-parser");
let request = require('request');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

let apiKey = '3a4b2ad242eeb6e5e5a02195f12f79e0';
let city = 'visakhapatnam';
let unit = 'metric';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;

let temp;

app.get("/",function(req, res){
	request(url, function (err, response, body) {
		if(err){
    		console.log('error:', error);
  		} else {
  			let w = JSON.parse(body);
        const imageUrl = "http://openweathermap.org/img/wn/"+w.weather[0].icon+"@2x.png"
    		res.render("main_content",{city: w.name, normalTemp:w.main.temp, apparentTemp:w.main.feels_like,
          Description:w.weather[0].description, mxTemp:w.main.temp_max, mnTemp:w.main.temp_min,
          pressure:w.main.pressure,humid:w.main.humidity, vison:w.visibility, zone:w.timezone, speed: w.wind.speed,
          degrees: w.wind.deg, sunrise:w.sys.sunrise, sunset: w.sys.sunset, iconUrl: imageUrl});
  		}
	});
});

app.post("/",function(req,res){
  let city=req.body.cityName;
  console.log(city);
  let apiKey = '3a4b2ad242eeb6e5e5a02195f12f79e0';
  let unit = 'metric';
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;

  request(url, function (err, response, body) {
    if(err){
        console.log('error:', error);
      } else {
        let w = JSON.parse(body);
        const imageUrl = "http://openweathermap.org/img/wn/"+w.weather[0].icon+"@2x.png"
        res.render("main_content",{city: w.name, normalTemp:w.main.temp, apparentTemp:w.main.feels_like,
          Description:w.weather[0].description, mxTemp:w.main.temp_max, mnTemp:w.main.temp_min,
          pressure:w.main.pressure,humid:w.main.humidity, vison:w.visibility, zone:w.timezone, speed: w.wind.speed,
          degrees: w.wind.deg, sunrise:w.sys.sunrise, sunset: w.sys.sunset, iconUrl: imageUrl});
      }
  });
});

app.listen(3000,function(){
	console.log("server started on port 3000");
});