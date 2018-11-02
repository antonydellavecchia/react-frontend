import React, { Component } from 'react';
import { render } from 'react-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Toggle } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { audioPlayerActions } from '../actions/audioPlayer.actions';

const mapDispatchToProps = dispatch => {
  return {
    showControls: () => dispatch(audioPlayerActions.showControls()),
    hideControls: () => dispatch(audioPlayerActions.hideControls())
  };
};

const mapStateToProps = state => {
  return {
    audioTrack: state.audioPlayer.audioTrack,
    isPlaying: state.audioPlayer.isPlaying,
    controllerView: state.audioPlayer.controllerView
  };
};

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.togglePlayer = this.togglePlayer.bind(this);
  }
  
  togglePlayer(event) {
    event.preventDefault();

    console.log(this.props.controllerView);
    
    if (this.props.controllerView) {
      this.props.hideControls();
    }
    else {
      this.props.showControls();
    }
  }
  
  render () {
    return (
      <Navbar inverse collapseOnSelect fixedTop fluid id="navbar">
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#" onClick={this.togglePlayer }>
              <div id="mouth-player-toggle">
                <img src="/assets/images/player-toggle-button.png"/>
              </div>
            </a>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            { this.props.children }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
};

const ConnectedNavigation = connect(mapStateToProps, mapDispatchToProps)(Navigation);
export { ConnectedNavigation as Navigation };
