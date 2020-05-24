import React, { Component } from "react";
import "./login.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { username: "Luke Skywalker", password: "19BBY" },
      error: "",
    };
  }

  handleClick = (event) => {
    const { user } = this.state;
    event.preventDefault();

    if (user.username === "Luke Skywalker" && user.password === "19BBY") {
      this.props.updateUserData(user);
      this.props.history.push("/landingPage");
    } else {
      this.setState({ ...this.state, error: "Incorrect username/password" });
    }
  };

  handleChange = (event) => {
    console.log("[event.target.id]", [event.target.id]);
    this.setState({
      ...this.state,
      user: { ...this.state.user, [event.target.id]: event.target.value },
    });
  };
  render() {
    console.log("data", this.props.userInfo);
    const { user } = this.state;
    return (
      <div>
        {/* <h2>Login123</h2>
        <button onClick={this.handleClick}>Redirect</button> */}
        <form
          style={{
            width: "400px",
            border: "1px solid grey",
            marginLeft: "650px",
            marginTop: "250px",
            padding: "20px",
          }}
        >
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              aria-describedby="emailHelp"
              placeholder="Enter username"
              value={user.username}
              onChange={(event) => this.handleChange(event)}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={user.password}
              onChange={(event) => this.handleChange(event)}
            ></input>
          </div>
          {this.state.error.length > 0 && (
            <div className="form-group">
              <label style={{ color: "red" }}>{this.state.error}</label>
            </div>
          )}
          <button
            className="btn btn-primary"
            onClick={(event) => this.handleClick(event)}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.loginReducer.signedInUser,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateUserData: (user) => {
      dispatch({
        type: "USER_INFO",
        payload: user,
      });
    },
  };
};

Login = connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));

export { Login };
