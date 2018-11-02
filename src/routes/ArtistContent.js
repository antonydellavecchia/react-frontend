import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Grid, Col, Row } from 'react-bootstrap';

import { userService } from '../services';
import { ContentListContainer } from '../components';

const apiUrl = process.env.NODE_ENV === 'production' ?
               process.env.REACT_APP_API_URL : process.env.REACT_APP_DEV_API_URL;


class ArtistContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name:'',
      content: null
    }

  }

  componentDidMount() {
    let { match }  = this.props;

    const requestOptions = {
      method: 'GET'
    };

    userService.authGet(`${match.url}`).then(result => {
      let avatar = (
        <div className="pan-background item">
	  <img src="/assets/images/frying-pan.png"/>
        </div>
      );

      let nameDiv = (
        <div className="artist-content-name general-text">
          { result.name }
        </div>
      );

      let name = { div: nameDiv, url: null };
      let items = [ name ];
      let content = <ContentListContainer items={ items }/>;
      
      this.setState({
        content: content,
        avatar: avatar
      })
    });
  }


  render() {
    return(
      <Grid fluid className="artist-content">
        <Col xs={ 6 }>
          { this.state.avatar }
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


const connectedArtistContent = withRouter(connect(mapStateToProps)(ArtistContent));
export { connectedArtistContent as ArtistContent};
