import { audioPlayerConstants } from '../constants';

const initialState = {
  activeTrack: null,
  isPlaying: false,
  controllerView: (window.innerWidth > 900),
  animated: false,
  queue: null
}

export const audioPlayer = (state = initialState, action) => {
  switch (action.type) {
    case audioPlayerConstants.SET_ACTIVE_TRACK:
      return {
        ...state,
        activeTrack: action.activeTrack
      }

    case audioPlayerConstants.SET_QUEUE:
      return {
        ...state,
        queue: action.queue,
        activeTrack: action.activeTrack
      }

    case audioPlayerConstants.PLAY_TRACK:
      return {
        ...state,
        isPlaying: action.isPlaying,
        animated: false
      }

    case audioPlayerConstants.CHANGE_TRACK:
      return {
        ...state,
        queue: action.queue,
        activeTrack: action.activeTrack
      }
      
    case audioPlayerConstants.TOGGLE_CONTROLS:
      return {
        ...state,
        controllerView: action.show
      }

    case audioPlayerConstants.PLAY_ANIMATION:
      return {
        ...state,
        animated: action.playing
      }

    default: return state
  }
}
