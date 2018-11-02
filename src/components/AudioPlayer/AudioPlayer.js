import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { MouthPlayer } from './MouthPlayer';

const mapStateToProps = state => {
  return {
    audioTrack: createSelector(state.audioTrack, audioTrack => new Audio(audioTrack.url)),
    isPlaying: state.isPlaying
  };
};

const mouthPlayer = <MouthPlayer />;
const AudioPlayer = connect(mapStateToProps)(MouthPlayer);

export default AudioPlayer;
