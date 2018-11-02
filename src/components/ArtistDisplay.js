import React from 'react';

export class ArtistDisplay extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      id: props.artist.id,
      name: props.artist.name
    }
  }

  componentDidMount(){

  }

  render() {
    return(
      <div>
        <div className="pan-background">
	  <img src="/assets/images/frying-pan.png"/>
        </div>

        <div className="artist-name">
          { this.state.name }
        </div>
      </div>
    );
  }
}
