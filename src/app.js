import React from "react";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <p> Hi You are now logged in and App.js is running</p>
                <a href="/logout" className="link">
                    <p>Log Out</p>
                </a>
            </div>
        );
    }
}
