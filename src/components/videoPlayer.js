import React from "react";
import { BrowserRouter, Link } from "react-router-dom";

export default class VideoPlayer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        const { videoId, description, title } = this.props;
        return (
            <div className="flex-container">
                <Link to="/" className="no-link-styling">
                    <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 100 125" x="0px" y="0px"><title>01</title><polygon points="66.99 16.09 31.62 50 66.99 83.91 68.38 82.46 34.51 50 68.38 17.54 66.99 16.09" /></svg>Back
                </Link>
                <iframe
                    id="ytplayer"
                    type="text/html"
                    width="640"
                    height="360"
                    src={`http://www.youtube.com/embed/${videoId}?autoplay=1&origin=http://example.com`}
                    frameBorder="0"
                    modestbranding="1"
                    fs="1"
                    allowFullScreen="allowFullScreen"
                />
                <div className="video-description">
                    <h2 className="video-title">{title}</h2>
                    <p>{description}</p>
                </div>
            </div>
        );
    }
}

// return <ReactPlayer url={this.props.playerUrl} />;
// src = "http://www.youtube.com/embed/0chL5b-Wjbs?autoplay=1&origin=http://example.com"
