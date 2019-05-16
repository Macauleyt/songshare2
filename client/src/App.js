//Redux import
import { Provider } from "react-redux";
import store from "./store";
import Alert from "./components/layout/Alert";
import { loadUser } from "./actions/auth";
import React, { Fragment, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Login from "./components/authorise/Login";
import Main from "./components/main/main";
import PrivateRoute from "./components/routing/Private";

import Landing from "./components/layout/Landing";
import Register from "./components/authorise/Register";
import AuthToken from "./utils/AuthToken";

if (localStorage.token) {
  AuthToken(localStorage.token);
}
const App = () => {
  //Passing in an empty array so effect is only run once. Effect does not depend on any values from props or state so does not need to loop.
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/main" component={Main} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
