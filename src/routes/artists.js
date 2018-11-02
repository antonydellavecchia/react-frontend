import React from 'react';
import { connect } from 'react-redux';
import {Grid, Row, Col, nav} from 'react-bootstrap';
import { withRouter, Route, Link} from 'react-router-dom';

import { userService } from '../services';
import { userActions } from '../actions';
import { ReleaseDisplay, ArtistContent, ArtistDisplay, ContentListContainer } from '../components';


class Artists extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      artists: [],
      content: null
    };
  }

  componentDidMount() {
    let { match } = this.props;

    userService.authGet(`${match.url}`).then(data => {
      let artists = data.artists;
      let items = artists.map(artist => {
        let url = `${ match.url }/${ artist.id}`;
        let div = (
          <div>
            <ArtistDisplay artist={ artist }/>
          </div>
        );

        return { url: url, div: div };
      });

      let content = <ContentListContainer items={ items }/>

      this.setState({
        artists: artists,
        content: content
      });
    });
  }

  render() {
    return (
      <div >
        { this.state.content }
      </div>
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

const connectedArtists = connect(mapStateToProps)(Artists);
export { connectedArtists as Artists };
