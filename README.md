## Chrome New Tab Page

![](./images/main.jpg)

### Description
A Chrome extension that replaces the default new tab page in chrome populated with useful data and a notepad. The page contains weather data, a quote of the day, and top headlines from NPR. The notepad persists from tab to tab meaning that quickly jotting down a few reminders allows the user to keep track of important info in their life.

### Implementation
The extension was written in HTML, CSS, and JavaScript with the jQuery library added for ease. As soon as the document loads, I pull a random photo from Unsplash to use as my background and then fade in the background.

![](./images/background.jpg)

#### Notes
The notes section is a simple text area. Everytime the user presses a key, the notes are saved the local storage. When a new tab is opened, those notes are pulled from the local storage cache and injected into the textarea.

![](./images/notes.png)

#### Weather, Quotes, and News
I used OpenWeatherMap API, Quotes API, and NPR's API for each field respectively. I cache the quote into localStorage much like the notes so that an ajax request isn't triggered for every new tab.

![](./images/quote.jpg)

Weather, Quotes, and News are all organized into classes so that I can easily add or modify functions to manipulate the data.

### Challenges and Future Ideas
The extension originally started out by appending all the above info to the Google homepage, however I ran into a problem with making non-SSL encrypted API calls on Google's page which is secured giving me a Mixed Content Warning. The only way to fix this is to find secured API which often cost money, so I opted to make my own page instead.

Future Ideas:

- Word of the day section
- Display a greeting to the user using their name
- Ability to move and resize elements
- Change the news source; I'm sure not everyone reads NPR
- Have error messages for when API calls fail or there isn't a reliable internet connection
