import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';

export default (initialState = {}) => {
    const middleware = [thunk];
    const enhancers = [];
    if(__DEV__){
        const devToolsExtension = window.devToolsExtension;
        if(typeof devToolsExtension === 'function') {
            enhancers.push(devToolsExtension());
        }
        middleware.push(createLogger());
    }
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(...middleware),
            ...enhancers
        )
    );
    return store;
}