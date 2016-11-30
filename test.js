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
    let d = new Date();
    $('#weather').append(`<img id='icon' src=${this.icon} />`)
    $('#weather').append(`<h1 id='temperature'> ${this.temperature}&deg;</h1>`)
    $('#weather').append(`<h1 id='weather-description'>&nbsp;-&nbsp;${this.description}</h1>`)
    $('#weather').append(`<div id='location'><h3>${this.location}</h3><h4>${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}</h4></div>`)
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

class Quote {

  constructor() {
    this.quote = "";
    this.author = "";
    this.fillers = [{
      quote: "In order to succeed, we must first believe that we can.",
      author: "Nikos Kazantzakis"},
    {
      quote: ""
    }]

    this.getQuote = this.getQuote.bind(this);
    this.displayQuote = this.displayQuote.bind(this);

    this.getQuote();
  }

  getQuote() {
    $.getJSON("http://quotes.rest/qod.json", data => {
      this.quote = data.contents.quotes[0].quote;
      this.author = data.contents.quotes[0].author;
      console.log(this.quote);
      this.displayQuote()
    })
    .fail();
  }

  displayQuote() {
    $('#quote').append(`<h1 id="quote-text">${this.quote}</h1>`)
    $('#quote').append(`<h1 id="quote-author"> - ${this.author}</h1>`)
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
  let quote = new Quote;
});
