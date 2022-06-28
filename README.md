# Raspberry Pi Kiosk screen

Raspberry Pi kiosk screen for 480x320 sized screen containing:
* Next public transportation leave time in minutes for selected stop(s).
* City bikes availability on selected station(s).
* Weather.

## Getting started

### Create .env file
Create `.env` file to project root and add stops information to it. See example in `.env.dist`

### Public transportation
Get your selected public transportation stop gtfsId:s and city bike stop stationId:s from HSL API.

Public transportation stops for example https://api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20stops(name%3A%20%22Lauttasaaren%20silta%22)%20%7B%0A%20%20%20%20gtfsId%2C%0A%20%20%20%20name%2C%0A%20%20%20%20code%0A%20%20%7D%0A%7D

Bike stops
https://api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20bikeRentalStations%20%7B%0A%20%20%20%20stationId%2C%0A%20%20%20%20name%0A%20%20%7D%0A%7D

Emoji one names https://www.emojione.com/emoji/v3

### Start app

First clone project then

`yarn`  
`yarn start`

## Deploy to Firebase

`firebase init` add hosting
`yarn deploy-fb`

## Example

Check out app running [here]: https://ysi-on-ykkonen.web.app/
