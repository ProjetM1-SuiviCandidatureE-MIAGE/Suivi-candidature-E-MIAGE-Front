import React, { Component } from "react";
import "./App.css";
import Mentions from "./components/MentionsLegales";
import Home from "./components/Home/Home";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import SpaceCandidat from "./components/SpaceCandidat/SpaceCandidat";
import SpaceAdmin from "./components/SpaceAdmin/SpaceAdmin";
import Auth from "./Auth";

// Composant principale qui contient les routes pour les autre composants
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute
              exact
              path="/SpaceCandidat"
              component={SpaceCandidat}
            />
            <PrivateRoute2 exact path="/SpaceAdmin" component={SpaceAdmin} />
          </Switch>
          <Mentions />
        </div>
      </Router>
    );
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.isauthenticatedCandidat() === true ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: {
              from: props.location
            }
          }}
        />
      )
    }
  />
);

const PrivateRoute2 = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.isauthenticatedAdmin() === true ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: {
              from: props.location
            }
          }}
        />
      )
    }
  />
);

export default App;
