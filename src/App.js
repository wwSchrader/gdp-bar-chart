import React, { Component } from 'react';
import './App.css';
import BarChart from './BarChart.js';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }
  componentDidMount() {
    var gdpUrl = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';
    axios.get(gdpUrl)
      .then(response => this.setState(response.data));
  }

  render() {
    return (
      <div className="App">
        <BarChart data={this.state.data} size={[250,350]} />
      </div>
    );
  }
}

export default App;
