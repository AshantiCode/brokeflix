import React from "react";
import { HashRouter, Route, Link } from "react-router-dom";
import axios from "../axios";
import Welcome from "../welcome";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentWillMount() {
        let landingGreeting = document.getElementById("landing-greeting");
        landingGreeting.style.display = "none";
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
            <div className="register-container">
                <div className="registration-form">
                    {this.state.error && (
                        <div className="error">
                            Oops! Something went wrong,please try again!
                        </div>
                    )}
                    <div className="register-input-group">
                        <label htmlFor="email">Email</label>
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

                        <button className="login-btn" onClick={this.submit}>
                            Log In
                        </button>
                        <Link
                            to="/register"
                            className="register-offer no-link-styling red"
                            id="back-register-link"
                        >
                            Register first? <br />
                            Back to <span>Registration</span>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}
