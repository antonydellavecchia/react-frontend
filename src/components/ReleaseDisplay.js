import React from 'react';

const apiUrl = process.env.NODE_ENV === 'production' ?
               process.env.REACT_APP_API_URL : process.env.REACT_APP_DEV_API_URL;


export class ReleaseDisplay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      coverUrl: `${apiUrl}/static/covers/${props.cover}`,
      title: props.title,
      artist: props.artist,
      tracks: props.tracks
      
    }
  }

  componentDidMount() {
    let trackDivs = this.state.tracks.map((track) => {
      return (
        <div className="release-track">
	  { track.title }
	</div>
      );
    });

    this.setState({trackDivs: trackDivs});
  }
  
  render() {
    return(
      <div className="release-display">
	<div className="fridge-background">
	  <img src="assets/images/fridge-background.png" />
	</div>

	<div className="release-cover">
	  <a href="#" >
	    <img src={ this.state.coverUrl }/>
	  </a>
	</div>

	<div className="release-info">
	  <div className="release-title">
	    { this.state.title }
	  </div>

	  <div className="release-artist">
	    { this.state.artist }
	  </div>
	</div>

	<div className="release-tracks">
          { this.state.trackDivs }
	</div>

      </div>
    );
  }
}
