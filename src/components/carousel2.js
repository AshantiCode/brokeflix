import React from "react";

export default class Carousel extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var kitty = document.getElementsByClassName("kitty");
        var current = 0;
        var dot = document.querySelectorAll(".carousel-dots div");

        // var dot = document.getElementById("dot");
        var timer;

        function moveKitties(next) {
            kitty[current].classList.remove("onscreen");
            dot[current].classList.remove("fill");
            kitty[current].classList.add("exit");
            console.log("the current  one is " + current);

            // if ( typeof next == "undefined") {

            current++;
            if (current >= kitty.length) {
                current = 0;
            }
            kitty[current].classList.add("onscreen");
            dot[current].classList.add("fill");
        }
        document.addEventListener("transitionend", function fn(e) {
            if (e.target.classList.contains("exit")) {
                e.target.classList.remove("exit");
                timer = setTimeout(moveKitties, 5000);
            }
        });

        [].slice.call(dot).forEach(function(dot, i) {
            dot.addEventListener("click", function(e) {
                console.log(i);

                clearTimeout(timer);
                moveKitties(i);
            });
        });

        timer = setTimeout(moveKitties, 6000);
    }

    render() {
        return (
            <div id="kitties">
                <div className="kitty onscreen">
                    <img src="./assets/glow-hero.png" alt="Ardorable" />
                </div>
                <div className="kitty">
                    <img src="./assets/kimmy-hero.jpeg" alt="Ardorable" />
                </div>
                <div className="kitty">
                    <img src="./assets/breaking-hero.png" alt="Ardorable" />
                </div>
                <div className="kitty ">
                    <img src="./assets/orange-hero.jpg" alt="Ardorable" />
                </div>
                <div className="carousel-dots">
                    <div className="fill" />
                    <div />
                    <div />
                    <div />
                </div>
            </div>
        );
    }
}
