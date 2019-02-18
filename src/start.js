import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";

let component;

if (location.pathname == "/") {
    component = <Welcome />;
} else {
    component = <App />;
}

ReactDOM.render(component, document.querySelector("main"));
