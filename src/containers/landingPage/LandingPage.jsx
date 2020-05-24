import React, { Component } from "react";
import "./landingPage.css";
import { CardItem } from "../../components/cartItem";

class LandingPage extends Component {
  state = {};
  debugger;
  render() {
    return (
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Size</th>
            <th scope="col">Qty</th>
            <th scope="col">Price</th>
          </tr>
          {CardItem}
        </thead>
        <tbody></tbody>
      </table>
    );
  }
}

export { LandingPage };
