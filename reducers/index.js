import {combineReducers} from 'redux';
import auth from './auth_reducer';
import curLang from './cur_lang_reducer';

export default combineReducers({
    auth,
    curLang
});