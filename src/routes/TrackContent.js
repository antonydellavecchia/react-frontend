import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {Grid, Col, Row } from 'react-bootstrap';

import { ContentListContainer } from '../components';
import { userService } from '../services';

const apiUrl = process.env.NODE_ENV === 'production' ?
               process.env.REACT_APP_API_URL : process.env.REACT_APP_DEV_API_URL;


class TrackContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      artist: '',
      content: null
    }

  }

  componentDidMount() {
    let { match }  = this.props;

    const requestOptions = {
      method: 'GET'
    };

    userService.authGet(`${match.url}`).then(result => {
      let cover = (
        <div className="track-content-cover item">
          <img src={`${apiUrl}/static/covers/${result.cover}`}/>
        </div>
      );

      let titleDiv = (
        <div className="track-content-title general-text">
          { result.title }
        </div>
      );

      let artistDiv = (
        <div className="track-content-artist general-text">
          { result.artist }
        </div>
      );

      
      let releaseDiv = (
        <div className="track-content-release general-text">
          { result.release }
        </div>
      );
      
      let title = { div: titleDiv, url: null };
      let artist = { div: artistDiv, url: null };
      let release = { div: releaseDiv, url: `/releases/${result.release.id}` };
      let items = [title, artist, release];
      let content = <ContentListContainer items={ items }/>;
      
      this.setState({
        cover: cover,
        content: content
      })
    });
  }


  render() {
    return(
      <Grid fluid className="track-content">
        <Col xs={ 6 }>
          {this.state.cover}
        </Col>
        <Col xs={ 6 }>
          { this.state.content }
        </Col>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    users
  };
}


const connectedTrackContent = withRouter(connect(mapStateToProps)(TrackContent));
export { connectedTrackContent as TrackContent};
