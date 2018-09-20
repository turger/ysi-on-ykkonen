# Raspberry Pi Kiosk screen

Raspberry Pi kiosk screen for 480x320 sized screen containing:
* next public transportation leave time in minutes for selected stop(s)
* city bikes availability on selected station(s)
* weather

## Getting started

### Create .env file
Create .env file to project root and add stops information to it
```
# Lauttasaaren silta Ruohikseen HSL:1310102
# Lauttasaaren silta Katajaharjuun HSL:1310101
# Lauttasaaren silta Vattuniemeen HSL:1310139
# ID:s separated with dots, if multiple stops should be merged to one box then separate these with semicolon
REACT_APP_STOP_IDS=HSL:1310102,HSL:1310101;HSL:1310139

# Lauttasaaren silta bike stop id = 058
# Lauttasaaren ostoskeskus bike stop id = 057
# <stop-name>;<hsl-stop-id> pairs separated with dots
REACT_APP_BIKE_STOP_IDS=Silta;058,Metro;057
```

### Public transportation
Get your selected public transportation stop gtfsId:s and city bike stop stationId:s from HSL API.

Public transportation stops for example http://dev.hsl.fi/graphql/console/?query=%7B%0A%20%20stops(name%3A%20%22Lauttasaaren%20silta%22)%20%7B%0A%20%20%20%20gtfsId%2C%0A%20%20%20%20name%2C%0A%20%20%20%20code%2C%0A%20%20%20%20url%2C%0A%20%20%20%20desc%2C%0A%20%20%20%20parentStation%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%2C%0A%20%20%20%20vehicleType%0A%20%20%7D%0A%7D

Bike stops
http://dev.hsl.fi/graphql/console/?query=%7B%0A%20%20bikeRentalStations%20%7B%0A%20%20%20%20stationId%2C%0A%20%20%20%20name%0A%20%20%7D%0A%7D

Emoji one names https://www.emojione.com/emoji/v3

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
