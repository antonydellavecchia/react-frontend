import { createSelector } from 'reselect';

// track selector
const getTrack = (state) => {
  let queue = state.audioPlayer.queue;
  return queue ? queue.list[queue.index] : null;
}

const apiUrl = process.env.NODE_ENV === 'production' ? 
               process.env.REACT_APP_API_URL : process.env.REACT_APP_DEV_API_URL;

// track reselect function
export const getTrackState = createSelector(
  [ getTrack ],
  (track) =>  (track) ? new Audio(`${apiUrl}/static/music_files/${track.filename}`) : null
);
