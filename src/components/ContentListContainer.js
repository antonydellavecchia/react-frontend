import React from 'react';
import { Link, Route } from 'react-router-dom';
import ReactTimeout from 'react-timeout'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Grid } from 'react-bootstrap';

import { history } from '../helpers';
import { ArtistContent } from '../components';

class ContentListContainer extends React.Component {
  constructor(props) {
    super(props);

    
    this.state = {
      items: props.items,
      url: props.url
    };

    this.removeItems.bind(this);
  }
  
  render() {
    let Component = this.state.component;
    return (

      <div className="content-list-container">
	<div className="animation-container">
	  <ReactCSSTransitionGroup transitionName="example"
                                   transitionLeaveTimeout={500}
                                   transitionEnterTimeout={500}>

	      { this.state.content }
	  </ReactCSSTransitionGroup>
	</div>
      </div>
    );
  }

  componentDidMount(){
    this.setItems();
  }


  transitionToRoute(url) {
    this.props.setTimeout(() => {
      history.push(url);
    }, 500);
  }
  
  setItems() {
    let content = this.state.items.map((item, i)=> {
      return(
	<div key={i} onClick={() => this.removeItems(item) }  className="item">
	  { item.div }
        </div>
      );	
    });

    this.setState({content: content});
  }
  
  removeItems(item) {
    if (item.url) {
      this.transitionToRoute(item.url);
    
      this.setState({
        content: null,
        items: this.state.items
      });
    }
  }
}

const TimeOutContentListContainer = ReactTimeout(ContentListContainer);
export { TimeOutContentListContainer as ContentListContainer };

