import { audioPlayerConstants } from '../constants';
import { audioService } from '../services';

export const audioPlayerActions = {
  setActiveTrack,
  setQueue,
  playTrack,
  pauseTrack,
  showControls,
  hideControls,
  playAnimation,
  nextTrack,
  prevTrack
};

// sets active track
function setActiveTrack (activeTrack) {
  return {
    type: audioPlayerConstants.SET_ACTIVE_TRACK,
    activeTrack: activeTrack
  };
}

// sets queue
function setQueue (endpoint) {
  return dispatch => {
    audioService.getQueue(endpoint)
                .then(
                  queue => {
                    dispatch(success(queue));
                  });
  };

  function success(queue) {
    return {
      type: audioPlayerConstants.SET_QUEUE,
      queue: queue,
      activeTrack: queue.list[queue.index]
    };
  }
}

// plays ative track
function playTrack(){
  return {
    type: audioPlayerConstants.PLAY_TRACK,
    isPlaying: true
  };
}

// pauses active track
function pauseTrack(){
  return {
    type: audioPlayerConstants.PLAY_TRACK,
    isPlaying: false
  };
}

// plays next track
function nextTrack(queue) {
  let updatedQueue = {
    index: (queue.index + 1) % queue.list.length,
    list: queue.list.slice()
  };

  let activeTrack = updatedQueue.list[updatedQueue.index];

  return {
    type: audioPlayerConstants.CHANGE_TRACK,
    queue: updatedQueue,
    activeTrack: activeTrack
  };
}

// plays prev track
function prevTrack(queue) {
  // unsure index is non negative
  let updatedIndex =  (queue.index - 1) % queue.list.length;
  let updatedQueue = {
    index: updatedIndex > -1 ? updatedIndex : queue.list.length - 1,
    list: queue.list.slice()
  };

  let activeTrack = updatedQueue.list[updatedQueue.index];

  return {
    type: audioPlayerConstants.CHANGE_TRACK,
    queue: updatedQueue,
    activeTrack: activeTrack
  };
}

// show controls
function showControls() {
  return {
    type: audioPlayerConstants.TOGGLE_CONTROLS,
    show: true
  };
}

// hide controls
function hideControls() {
  return {
    type: audioPlayerConstants.TOGGLE_CONTROLS,
    show: false
  };
}

// show sprite
function playAnimation() {
  return{
    type: audioPlayerConstants.PLAY_ANIMATION,
    playing: true
  };
}
