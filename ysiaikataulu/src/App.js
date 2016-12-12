import React, { Component } from 'react';
import './App.css';
var request = require('superagent');

const stopname = 'Huutokonttori'

// const trams = ['9', '6T']
// const timetable = trams.map((tram) =>
//   <li>{tram}</li>
// );


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stops: [],
    };
  }

  componentDidMount() {
    request
      .post('https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql')
      .set('Content-Type', 'application/graphql')
      .send('{ stops (name: "' + stopname +'") { id name routes { id longName shortName } } }')
      .end((err, res) => {
          if(err) throw err;
          var result = JSON.parse(res.text).data.stops;
          console.log(result);
          this.setState({ stops: result });
      });
  }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>{stopname}</h2>
        </div>

        <div>
          <ul>
            {this.state.stops.map(stop =>
              <div key={stop.id}><p className="bold">{stop.name}</p>

                {stop.routes.map(route =>
                  <p key={route.id}>{route.shortName} {route.longName}</p>
                )}


              </div>
            )}
          </ul>
        </div>

      </div>
    );
  }


}

export default App;
