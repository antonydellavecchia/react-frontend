import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { audioPlayer } from './audioPlayer.reducer';

const rootReducer = combineReducers({
  authentication,
  users,
  alert,
  audioPlayer
});

export default rootReducer;
