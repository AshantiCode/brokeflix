import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";

let component;

// if (location.pathname == "/welcome") {
//     component = <Welcome />;
// } else {
//     component = <App />;
// }

ReactDOM.render(<Welcome />, document.querySelector("main"));
