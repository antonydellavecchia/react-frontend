import React from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { userActions, audioPlayerActions } from '../actions';
import { TrackDisplay, ContentListContainer } from '../components';

const mapDispatchToProps = dispatch => {
  return {
    setQueue: (endpoint) => dispatch(audioPlayerActions.setQueue(endpoint)),
    pauseTrack: () => dispatch(audioPlayerActions.pauseTrack())
  };
};

const mapStateToProps = state => {
  return {
    queue: state.audioPlayer.queue
  };
};

class Discover extends React.Component {
  constructor(props) {
    super(props);

    // set initial queue
    this.props.setQueue('/tracks');

    this.state = {
      content: null,
      refs: null
    }
  }

  componentDidMount() {
    // create content
    console.log(this.props.queue, 'hello');
  }

  componentDidUpdate() {
    console.log(this.props.queue);

    if (!this.state.refs) {
      let refs = this.props.queue.list.map((item) => {
        return React.createRef();
      });

      this.setState({refs: refs});
    }

    else {
      this.scrollToItem();
    }
  }

  scrollToItem () {
    let item = this.state.refs[this.props.queue.index];
    //console.log(this.state.refs, this.props.queue.index);

    if (item.current) {
      window.scrollTo({
        top: item.current.offsetTop - 50, 
        behavior: "smooth"
      });
    }
  }

  content () {
    let queue = this.props.queue;
    let content = null;
    
    if (queue && this.state.refs) {
      let items = queue.list.map((track, index) => {
        let className = (index == queue.index) ? 'active-item' : 'item';
        
        let div =  (
          <div ref={ this.state.refs[index]  } className={className}>
            <TrackDisplay track={track}/>
          </div>
        );

        return { div: div };
      });

      return <ContentListContainer items={ items }/>;
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
}

const connectedDiscover = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { withRef: true}
)(Discover);

export { connectedDiscover as Discover };
