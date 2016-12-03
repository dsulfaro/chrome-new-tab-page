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
    $('#weather').append(`<h1 id='temperature'>${this.temperature}&deg;</h1>`)
    $('#weather').append(`<h1 id='weather-description'>&nbsp;${this.description}</h1>`)
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
      quote: "Good, better, best. Never let it rest. 'Til your good is better and your better is best.",
      author: "St. Jerome"},
    {
      quote: "Life is 10% what happens to you and 90% how you react to it.",
      author: "Charles R. Swindoll"
    }
    ]

    this.getQuote = this.getQuote.bind(this);
    this.displayQuote = this.displayQuote.bind(this);
    this.saveQuote = this.saveQuote.bind(this);

    this.getQuote();
  }

  getQuote() {
    $.getJSON("http://quotes.rest/qod.json", data => {
      this.quote = data.contents.quotes[0].quote;
      this.author = data.contents.quotes[0].author;
      this.displayQuote();
      this.saveQuote();
    })
    .fail((data) => {
      let idx = Math.floor(Math.random() * 3);
      this.quote = this.fillers[idx].quote;
      this.author = this.fillers[idx].author;
      this.displayQuote();
      this.saveQuote();
    });
  }

  displayQuote() {
    $('#quote').append(`<h1 id="quote-text">${this.quote}</h1>`)
    $('#quote').append(`<h1 id="quote-author"> - ${this.author}</h1>`)
  }

  saveQuote() {
    let d = new Date;
    localStorage["quote-text"] = this.quote;
    localStorage["quote-author"] = this.author;
    localStorage["quote-date"] = d.getDate();
  }

  static displayCacheQuote() {
    $('#quote').append(`<h1 id="quote-text">${localStorage["quote-text"]}</h1>`)
    $('#quote').append(`<h1 id="quote-author"> - ${localStorage["quote-author"]}</h1>`)
  }

}

class Word {

  constructor() {
    this.word = "";
    this.definition = "";
    this.example = "";
  }

  getWord() {
    $.getJSON("http://api.wordnik.com/v4/words.json/wordOfTheDay?api_key='yourkeyhere'")
  }

  displayWord() {

  }

}

class News {

  constructor() {
    this.articles = [];
    this.getNews = this.getNews.bind(this);
    this.displayNews = this.displayNews.bind(this);
    this.getNews = this.getNews.bind(this);

    this.getNews();
  }

  getNews() {
    $.getJSON("http://api.npr.org/query?id=1003&apiKey=MDI0NjcxNjQ2MDE0NjU0NDA0NTE0NDk2Nw000&format=json", data => {
      this.articles = data.list.story;
      this.displayNews();
    })
    .fail();
  }

  displayNews() {
    for (let i = 0; i < 5; i++) {
      $('#headlines').append(`<a href='${this.articles[i].link[2].$text}' target='_blank'><div class='story'><h2>${this.articles[i].title.$text}</h2></div></a>`)
    }
  }

}

$(document).ready(() => {

  // Handle Note Taking
  $('#notes').keyup( e => {
    let text = $('#notes').val();
    localStorage["notes"] = text;
  });
  $('#notes').val(localStorage["notes"]);

  // GET AND DISPLAY INFO //
  setTimeout( () => {
    let weather = new Weather;

    // if there isn't a quote saved or it's a new day, get a new quote
    if (localStorage["quote-text"] == "" || parseInt(localStorage["quote-date"]) !== (new Date).getDate()) {
      let quote = new Quote;
    }
    else {
      Quote.displayCacheQuote();
    }


    let news = new News;
  }, 300);

});
