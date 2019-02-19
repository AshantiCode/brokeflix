import React from "react";

export default class Carousel extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var images = document.getElementsByClassName("carousel-image");
        var dots = document.querySelectorAll(".carousel-dots div");
        var current = 0;
        var inTransition = false;

        dots.forEach(function(val, idx) {
            val.addEventListener("click", function(e) {
                // this runs in.. THE FUTURE!!
                if (
                    !e.target.classList.contains("active") &&
                    inTransition == false
                ) {
                    // if NOT active
                    e.target.classList.add("active"); // make it so
                    clearTimeout(timer); // stop the clock!
                    moveImages(idx); // and pass the requested image array id / "current"
                } else if (inTransition == true) {
                    // do not allow anything to mess things up when a transition is running
                    console.log("in Transition!!");
                    e.target.style.backgroundColor = "rgb(255,0,0,0.5)"; // visual key
                    e.target.style.border = "6px solid red";
                    setTimeout(function() {
                        // turn off visual key
                        e.target.style.backgroundColor = "";
                        e.target.style.border = "";
                    }, 750);
                    return;
                }
            });
        });

        function moveImages(next) {
            inTransition = true;
            images[current].classList.remove("onscreen"); // remove onscreen from currently featured image
            images[current].classList.add("exit"); // and add exit -> it slides to left
            images[current].addEventListener("transitionend", function(e) {
                // add a listener to the newly featured image
                e.target.classList.remove("exit"); // that removes its exit class
                inTransition = false;
                e.target.removeEventListener("transitionend", function() {}); // and removes itself to prevent memory from piling up
            });

            dots[current].classList.remove("active"); // remove active from currently featured dot

            console.log("current element: ", images[current]);

            if (typeof next == "undefined") {
                // if the function is not passed an argument at all
                current++; // continue as planned
                if (current >= images.length) {
                    // unless of course we are reaching the end of the loop
                    current = 0; // reset
                }
            } else {
                current = next; // or use the argument passed. onscreen is added, etc etc
            }
            images[current].classList.add("onscreen"); // shift next image onto screen
            dots[current].classList.add("active"); // add active to currently featured dot
            console.log("NEW current element: ", images[current]);

            timer = setTimeout(moveImages, 4000); // calling mself again ad infinitum
        }

        /* Initial call */
        var timer = setTimeout(moveImages, 4000);
        images[current].classList.add("onscreen");
        dots[current].classList.add("active");
        console.log("timer: ", timer);
    }

    render() {
        return (
            <div>
                <div className="carousel-dots">
                    <div className="active" />
                    <div />
                    <div />
                    <div />
                </div>
                <div className="carousel-wrapper">
                    <div id="0" className="carousel-image">
                        <img
                            src="./assets/kimmy-hero.jpeg"
                            alt="Kimmy Schmidt"
                        />
                    </div>

                    <div id="1" className="carousel-image">
                        <img src="./assets/glow-hero.png" alt="Glow" />
                    </div>

                    <div id="2" className="carousel-image">
                        <img
                            src="./assets/breaking-hero.png"
                            alt="Breaking Bad"
                        />
                    </div>

                    <div id="3" className="carousel-image">
                        <img
                            src="./assets/orange-hero.jpg"
                            alt="Orange is the new black"
                        />
                    </div>
                </div>
            </div>
        );
    }
}
