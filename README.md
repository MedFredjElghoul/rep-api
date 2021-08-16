# rep-api
## Project description:
This Project is an Api that give the user the possibility of contacting their legislator representative by providing an address,  

## Technical description: 
This project is created with Node.js & Express.js, & the data from this following API:
- ProPublica Congress API: [https://projects.propublica.org/api-docs/congress-api/](https://projects.propublica.org/api-docs/congress-api/)
- Geocod API: [https://www.geocod.io/](https://www.geocod.io/)
- Google Services API: [https://console.cloud.google.com/apis/dashboard](https://console.cloud.google.com/apis/dashboard) (You'll need to make sure that you enable the following API services from Google: Geocoding API, Geolocation API, Maps Javascript API, Google Civic Information API, Places API )


## Endpoint list : 
- /all get the list of all the 535 congress  members (The 435 members of the House of Representatives & the 100 Senators )
- /Members get the list of representative per state (House of Representatives & Senators )
- /state  the same as /members but calling the (/members) endpoint instead of  the propublica API

## How to use :
To start the project in your local host or deployed in web server later on please follow this steps:
- Install Node.js in your device: [Node.js](https://nodejs.org/en/download/) 
- Clone the Github repository
- Install the dependencies by typing: npm i  in your terminal
- Add your API Keys in the .env file
- Run the server by simply typing: node .

