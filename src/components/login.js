import React from "react";
import { HashRouter, Route, Link } from "react-router-dom";
import axios from "../axios";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    handleChange(e) {
        this[e.target.name] = e.target.value;
    }

    async submit() {
        console.log("Submit running");
        try {
            const response = await axios.post("/welcome/login", {
                email: this.email,
                password: this.password
            });
            console.log("Response after Login:", response);

            if (response.data.success) {
                location.replace("/");
            } else {
                this.setState({
                    error: true
                });
            }
        } catch (error) {
            console.log(error.message);
        }
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
