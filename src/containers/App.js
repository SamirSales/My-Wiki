import React, { Component } from 'react';

import NavBar from '../components/NavBar/NavBar';
import TopBar from '../components/TopBar/TopBar';

import './App.css';

class App extends Component {

  state = {
    url: 'http://localhost:3000/',
    appTitle: 'My Wiki',
    navItems: [
      { title: 'Início', key: '1'},
      { title: 'Sobre', key: '2'},
      { title: 'Ajuda', key: '3'},
      { title: 'Github', key: '4'},
      { title: 'Informar erro', key: '5'}
    ]
  }

  render() {
    return (
      <div className="App">
        <NavBar items={this.state.navItems}
          home={this.state.home}
          title={this.state.appTitle} />

        <TopBar home={this.state.url} />
      </div>
    );
  }
}

export default App;
