import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import axios from 'axios';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }
  
  componentDidMount() {
    axios.get('http://localhost:3333/smurfs')
    .then(res => {
      this.setState({smurfs: res.data})
    })
    .catch(err=> {
      console.log(err)
    })
  }

  addSmurf = (e, smurf) => {
    e.preventDefault();
    axios.post('http://localhost:3333/smurfs', smurf)
    .then(res => {
      this.setState({smurfs: res.data})
      this.props.history.push("/")
    })
    .catch(err => {
      console.log(err)
    })
  }
  
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  render() {
    return (
      <div className="App">
        <div className="nav">
          <NavLink to="/">
            <button>Smurf Village</button>
          </NavLink>
          <NavLink to="/smurf-form">
            <button>Add A Smurf</button>
          </NavLink>
        </div>

        <Route
          exact
          path="/"
          render={props => <Smurfs {...props} smurfs={this.state.smurfs} />}
        />
        <Route
          path="/smurf-form"
          render={props => <SmurfForm {...props} addSmurf={this.addSmurf} />}
        />
      </div>
    );
  }
}

export default App;
