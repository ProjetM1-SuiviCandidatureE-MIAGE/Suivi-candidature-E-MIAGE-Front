import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import SpaceCandidat from './components/SpaceCandidat';
import SpaceAdmin from './components/SpaceAdmin';

// Composant principale qui contient les routes pour les autre composants
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/spaceAdmin" component={SpaceAdmin} />
          <Route path="/spaceCandidat" component={SpaceCandidat} />
        </div>
      </Router>
    );
  }
}
export default App;