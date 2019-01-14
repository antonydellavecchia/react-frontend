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

    this.removeItems.bind(this);
    this.state = {
      items: props.items
    }
  }
  
  render() {
    return (
      <div className="content-list-container">
        <div className="animation-container">
	  <ReactCSSTransitionGroup transitionName="example"
                                   transitionLeaveTimeout={500}
                                   transitionEnterTimeout={500}>
            
	    { this.content() }
	  </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }


  
  componentDidMount() {
    if (!this.state.content) {
      let content = this.content();
      
      this.setState({content: content});
    }
  }

  componentDidUpdate(){
    console.log(this.state.items);
  }

  transitionToRoute(url) {
    this.props.setTimeout(() => {
      history.push(url);
    }, 500);
  }
  
  content() {
    return  this.props.items.map((item, i)=> {
      return(
	<div key={i}>
	  { item.div }
        </div>
      );
    });

   
  }
  
  removeItems(item) {
    if (item.url) {
      //this.transitionToRoute(item.url);
      
      this.setState({
        content: null,
        items: this.state.items
      });
    }
  }
}

const TimeOutContentListContainer = ReactTimeout(ContentListContainer);
export { TimeOutContentListContainer as ContentListContainer };

