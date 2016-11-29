// weather 523af8b42c7084b89eb2e44ba3b9df79
// http://api.openweathermap.org/data/2.5/weather?lat=34.0944883&lon=-118.35512469999999&appid=523af8b42c7084b89eb2e44ba3b9df79&mode=json&units=metric

class Weather {

  constructor() {

    this.lat = 0;
    this.lon = 0;
    this.location = "";
    this.temperature = 0;
    this.description = "";
    this.icon = "";

    this.displayData = this.displayData.bind(this);
    this.parseData = this.parseData.bind(this);
    this.getWeatherData = this.getWeatherData.bind(this);
    this.getLocation = this.getLocation.bind(this);

    this.getLocation();
  }

  displayData() {
    console.log(this.icon);
    $('#weather').append(`<img id='icon' src=${this.icon} />`)
  }

  parseData(data) {
    this.location = data.name;
    this.temperature = parseInt(data.main.temp);
    this.description = data.weather[0].description;
    this.icon = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    this.displayData();
  }

  getWeatherData() {
    let url = "http://api.openweathermap.org/data/2.5/weather?";
    url += `lat=${this.lat}&`;
    url += `lon=${this.lon}&`;
    url += "appid=523af8b42c7084b89eb2e44ba3b9df79";
    url += "&mode=json&units=imperial";
    console.log(url);
    $.getJSON(url, data => {
      this.parseData(data)
    });
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( (position) => {
        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude
        this.getWeatherData();
      });
    }
    else {
      alert("no geolocation!");
    }
  }
}

$(document).ready(() => {

  // SET BACKGROUND //
  // $('body').css({'background-image': 'url(https://source.unsplash.com/category/nature)', 'background-size': 'cover'});
  let colors = ["#3b6dbf", "#c893d6", "#a6d8e0", "#e0a09a", "#dbc787", "#ef7962"];
  $('body').css('background-color', colors[ Math.floor(Math.random() * 6) ]);
  $('body').addClass('fade-in');

  // GET AND DISPLAY WEATHER //
  let weather = new Weather;


});
