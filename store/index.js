import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import reducers from '../reducers';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'activeProject']
};

const persistedReducer = persistReducer(persistConfig, reducers);

let store = createStore(persistedReducer, {},
    compose(
        applyMiddleware(thunk)
    ));

let persistor = persistStore(store);
// persistor.purge();

export {store, persistor};