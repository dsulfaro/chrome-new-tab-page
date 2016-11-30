## Chrome New Tab Page

### Background
There are certain utilities and bits of information I wish I had at the click of a button. Things like the current weather data or a scratch pad for notes would be super useful, yet they are an entire Google Search away. My chrome extension changes the default new tab page in Google Chrome with info that is important for anyone.

### Functionality & MVP
With this extension, users will see on the new tab page:
- [] The local weather data
- [] A word of the day
- [] A quote of the day
- [] The top news headlines

### Technologies and Technilogical Challenges
The extension will be implemented using HTML, CSS, and JavaScript along with jQuery for the 4 API calls. Each box on the page will be a separate JavaScript class for better organization.

The challenges I see:
- Only manipulating Google.com and no other page
- Displaying the data cleanly and attractively on the page
- Having stand-in messages for content that is loading or not able to be fetched at that time

I'll use the OpenWeatherMap API for the weather data, the Wordnik API for the word of the day, and the NPR API for the news headlines. All these will be called using jQuery's .ajax()/.getJSON() method and injected into the existing HTML using jQuery's .append() method on Google's body.

### Implementation Timeline

**Day 1** Get the infrastructure of the extension completed
**Day 2** Inject HTML elements on Google's page only
**Day 3** Get the desired data from the API calls
**Day 4** Display the data on Google's page
**Day 5** Continue displaying data on Google's page
**Day 6** Style data
**Day 7** Style data
