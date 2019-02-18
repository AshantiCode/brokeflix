import React from "react";
import { HashRouter, Route, Link } from "react-router-dom";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: "",
            first: "",
            last: ""
        };
    }

    render() {
        return (
            <div className="registration-form">
                {this.state.error && (
                    <div className="error">Oops! Something went wrong!</div>
                )}

                <label htmlFor="first">First name</label>
                <input name="first" id="first" onChange={this.handleChange} />

                <label htmlFor="last">Last Name</label>
                <input name="last" id="last" onChange={this.handleChange} />

                <label htmlFor="email">Your Best Email</label>
                <input name="email" id="email" onChange={this.handleChange} />

                <label htmlFor="password">Password</label>
                <input
                    name="password"
                    id="password"
                    onChange={this.handleChange}
                />

                <button className="register-button" onClick={this.submit}>
                    Register
                </button>
                <p className="login-offer">
                    Already a Member? Please <Link to="/login">Log In</Link>
                </p>
            </div>
        );
    }
}
