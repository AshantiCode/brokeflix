import React from "react";
import { HashRouter, Route, Link } from "react-router-dom";
import axios from "../axios";
import Welcome from "../welcome";

// let signInButton = document.getElementById("sign-in-btn");
// signInButton.style.display = "none";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: "",
            first: "",
            last: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    handleChange(e) {
        this[e.target.name] = e.target.value;
    }

    async submit() {
        console.log("Button Clicked");
        try {
            let response = await axios.post("/welcome/register", {
                first: this.first,
                last: this.last,
                email: this.email,
                password: this.password
            });
            console.log("Respone: ", response);

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
        // hide Greeting + Sign in Button while Form is displayed
        let signInButton = document.getElementById("sign-in-btn");
        signInButton.style.display = "none";

        let landingGreeting = document.getElementById("landing-greeting");
        landingGreeting.style.display = "none";

        return (
            <div className="register-container">
                <div className="registration-form">
                    {this.state.error && (
                        <div className="error">Oops! Something went wrong!</div>
                    )}
                    <div className="register-input-group">
                        <label htmlFor="first">First name</label>
                        <input
                            name="first"
                            id="first"
                            onChange={this.handleChange}
                        />

                        <label htmlFor="last">Last Name</label>
                        <input
                            name="last"
                            id="last"
                            onChange={this.handleChange}
                        />

                        <label htmlFor="email">Your Best Email</label>
                        <input
                            name="email"
                            id="email"
                            onChange={this.handleChange}
                        />

                        <label htmlFor="password">Password</label>
                        <input
                            name="password"
                            id="password"
                            onChange={this.handleChange}
                        />

                        <button
                            className="register-button"
                            onClick={this.submit}
                        >
                            Register
                        </button>
                        <p className="login-offer">
                            Already a Member? Please{" "}
                            <Link to="/login" className="no-link-styling">
                                Log In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
