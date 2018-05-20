import {combineReducers} from 'redux';
import user from './user_reducer';
import activeProject from './active_project_reducer';

export default combineReducers({
    user,
    activeProject
});