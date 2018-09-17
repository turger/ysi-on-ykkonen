# Raspberry Pi Kiosk screen

Raspberry Pi kiosk screen for 480x320 sized screen containing:
* next public transportation leave time in minutes for selected stop(s)
* city bikes availability on selected station(s)
* weather

## Getting started

### Public transportation
Get your selected public transportation stop gtfsId:s and city bike stop stationId:s from HSL API.

Public transportation stops for example http://dev.hsl.fi/graphql/console/?query=%7B%0A%20%20stops(name%3A%20%22Lauttasaaren%20silta%22)%20%7B%0A%20%20%20%20gtfsId%2C%0A%20%20%20%20name%2C%0A%20%20%20%20code%2C%0A%20%20%20%20url%2C%0A%20%20%20%20desc%2C%0A%20%20%20%20parentStation%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%2C%0A%20%20%20%20vehicleType%0A%20%20%7D%0A%7D

Bike stops
http://dev.hsl.fi/graphql/console/?query=%7B%0A%20%20bikeRentalStations%20%7B%0A%20%20%20%20stationId%2C%0A%20%20%20%20name%0A%20%20%7D%0A%7D

Emoji one names https://www.emojione.com/emoji/v3

Add selected stops to src/StopConfig.js

### Start app

First clone project then

```
yarn
```

```
yarn start
```

## Example

Check out app running here http://ysi-on-ykkonen.herokuapp.com/
