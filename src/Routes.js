import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { LandingPage } from "./containers/landingPage";
import { Login } from "./components/login";
import { CardItem } from "./components/cartItem";

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/landingpage" render={() => <LandingPage />} />
        <Route path="/login" render={() => <Login />} />
        <Route component={CardItem} />
      </Switch>
    );
  }
}
