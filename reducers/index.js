import {combineReducers} from 'redux';
import user from './user_reducer';
import settings from './settings_reducer';

export default combineReducers({
    user,
    settings
});