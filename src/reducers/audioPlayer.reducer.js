import { audioPlayerConstants } from '../constants';

const initialState = {
  activeTrack: null,
  isPlaying: false,
  controllerView: (window.innerWidth > 900)
}

export const audioPlayer = (state = initialState, action) => {
  switch (action.type) {
    case audioPlayerConstants.SET_ACTIVE_TRACK:
      return {
        ...state,
        activeTrack: action.payload
      }

    case audioPlayerConstants.PLAY_TRACK:
      return {
        ...state,
        isPlaying: action.payload
      }

    case audioPlayerConstants.TOGGLE_CONTROLS:
      return {
        ...state,
        controllerView: action.payload
      }
    default: return state
  }
}
