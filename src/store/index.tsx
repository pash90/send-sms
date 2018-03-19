/** Libraries */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form'
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import { composeWithDevTools } from 'redux-devtools-extension';

// Creating browser history
const history = createBrowserHistory();

// Building the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

// Add the reducer to your store on the 'router' key
// Also apply middleware for navigating
// This is also making the app state - currently just router and forms
const reducers = combineReducers<{}>({
  router: routerReducer,
  form: formReducer
});
const enhancers = composeWithDevTools(applyMiddleware(middleware));

const store = createStore<{}>(reducers, enhancers);

export default store;
export { history };