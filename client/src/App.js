import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import NavBar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from "./components/add-credentials/AddExperience";
import AddEducation from "./components/add-credentials/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import NotFound from "./components/not-found/NotFound";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";

import store from "./store";

import PrivateRoute from "./components/common/PrivateRoute";

import "./App.css";
import { clearCurrentProfile } from "./actions/profileAction";

//Check for user token
if (localStorage.jwtToken) {
  //Set auth token header
  setAuthToken(localStorage.jwtToken);

  //Decode token -- get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);

  //Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Logout
    store.dispatch(logoutUser());

    //Clear profile
    store.dispatch(clearCurrentProfile());

    //todo Clear profile
    //Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <NavBar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
            </div>
            <div className="container">
              <Route exact path="/login" component={Login} />
            </div>
            <div className="container">
              <Route exact path="/profiles" component={Profiles} />
            </div>
            <div className="container">
              <Route exact path="/profile/:handle" component={Profile} />
            </div>
            <div className="container">
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
            </div>
            <div className="container">
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
            </div>
            <div className="container">
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
            </div>
            <div className="container">
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                />
              </Switch>
            </div>
            <div className="container">
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
              </Switch>
            </div>
            <div className="container">
              <Switch>
                <PrivateRoute exact path="/feed" component={Posts} />
              </Switch>
            </div>
            <div className="container">
              <Switch>
                <PrivateRoute exact path="/post/:id" component={Post} />
              </Switch>
            </div>
            <div className="container">
              <Route exact path="/not-found" component={NotFound} />
            </div>

            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
