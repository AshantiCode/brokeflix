import React from "react";
import { HashRouter, Route, Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="registration-form">
                <h1>Please Log In!</h1>
                {this.state.error && (
                    <div className="error">
                        Oops! Something went wrong,please try again!
                    </div>
                )}

                <label htmlFor="email">Email</label>
                <input name="email" id="email" onChange={this.handleChange} />

                <label htmlFor="password">Password</label>
                <input
                    name="password"
                    id="password"
                    onChange={this.handleChange}
                />

                <button className="login-btn" onClick={this.submit}>
                    Log In
                </button>
                <Link to="/" className="register-offer">
                    Back to Registration
                </Link>
            </div>
        );
    }
}
