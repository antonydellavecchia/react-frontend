import { audioPlayerConstants } from '../constants';

export const audioPlayerActions = {
  setActiveTrack,
  playTrack,
  pauseTrack,
  showControls,
  hideControls
};

// sets active track
function setActiveTrack (activeTrack) {
  return {
    type: audioPlayerConstants.SET_ACTIVE_TRACK,
    payload: activeTrack
  };
}

// plays ative track
function playTrack(){
  return {
    type: audioPlayerConstants.PLAY_TRACK,
    payload: true
  };
}

// pauses active track
function pauseTrack(){
  return {
    type: audioPlayerConstants.PLAY_TRACK,
    payload: false
  };
}

// show controls
function showControls() {
  return {
    type: audioPlayerConstants.TOGGLE_CONTROLS,
    payload: true
  };
}

// hide controls
function hideControls() {
  return {
    type: audioPlayerConstants.TOGGLE_CONTROLS,
    payload: false
  };
}
