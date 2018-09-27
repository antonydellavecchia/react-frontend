import React, { Component } from 'react';
import { render } from 'react-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Toggle } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export class Navigation extends Component {
  
  
  render () {
    return (
      <Navbar inverse collapseOnSelect fluid id="navbar">
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#brand">
              <div id="mouth-player-toggle">
                <img src="assets/images/player-toggle-button.png"/>
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
