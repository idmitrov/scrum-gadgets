import React, { Component } from 'react';

import './App.css';

import Content from '../auth/Routes';
import Layout from '../shared/Layout';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout heading={this.props.name}>
          <Content />
        </Layout>
      </div>
    );
  }
}

export default App;
