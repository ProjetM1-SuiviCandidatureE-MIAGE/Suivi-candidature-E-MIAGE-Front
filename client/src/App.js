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
  constructor(props) {
    super(props);

    this.state = {
      User: {
        prenom: "",
        nom: "",
        mail: "",
        token: ""
      }
    };
    this.setUser = this.setUser.bind(this);
  }
  // Fonction pour modifier la variable User après la connexion
  setUser(userConnected) {
    this.setState(state => {
      return {
        User: {
          ...state.User,
          prenom: userConnected.prenom,
          nom: userConnected.nom,
          mail: userConnected.mail,
          token: userConnected.token
        }
      };
    });
  }
  // Fonction qui retourne le html du composant
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <RoutePerso
              exact
              path="/"
              component={Home}
              change={User => this.setUser(User)}
              user={this.state.User}
            />
            <PrivateRoute
              exact
              path="/SpaceCandidat"
              component={SpaceCandidat}
              user={this.state.User}
            />
            <PrivateRoute2
              exact
              path="/SpaceAdmin"
              component={SpaceAdmin}
              user={this.state.User}
            />
          </Switch>
          <Mentions />
        </div>
      </Router>
    );
  }
}

const RoutePerso = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => <Component {...props} {...rest} />} />
);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.isauthenticatedCandidat() === true ? (
        <Component {...props} {...rest} />
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
        <Component {...props} {...rest} />
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
