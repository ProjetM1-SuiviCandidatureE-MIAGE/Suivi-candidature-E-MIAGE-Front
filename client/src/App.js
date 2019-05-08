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
        token: "",
        id: ""
      }
    };
    this.setUser = this.setUser.bind(this);
    this.resetUser = this.resetUser.bind(this);
    this.getUser = this.getUser.bind(this);
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
          token: userConnected.token,
          id: userConnected.id
        }
      };
    });
  }
  // Fonction pour récupérer la variable User
  getUser() {
    return this.state.User;
  }
  // Fonction pour reset les champs de User
  resetUser() {
    this.setState(state => {
      return {
        User: {
          ...state.User,
          prenom: "",
          nom: "",
          mail: "",
          token: "",
          id: ""
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
              get={this.getUser}
            />
            <PrivateRoute
              exact
              path="/SpaceCandidat"
              component={SpaceCandidat}
              user={this.state.User}
              reset={this.resetUser}
            />
            <PrivateRoute2
              exact
              path="/SpaceAdmin"
              component={SpaceAdmin}
              user={this.state.User}
              reset={this.resetUser}
            />
          </Switch>
          {/* <Mentions /> */}
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
