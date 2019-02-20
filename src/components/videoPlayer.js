import React from "react";

export default class VideoPlayer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        return (
            <div className="center-player">
                <iframe
                    id="ytplayer"
                    type="text/html"
                    height="360"
                    width="640"
                    src="http://www.youtube.com/embed/0chL5b-Wjbs?autoplay=1&origin=http://example.com"
                    frameBorder="0"
                    modestbranding="1"
                    fs="1"
                    allowFullScreen="allowFullScreen"
                />
            </div>
        );
    }
}

// return <ReactPlayer url={this.props.playerUrl} />;
