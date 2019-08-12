import React from 'react';
import ReactDOM from 'react-dom';
import {
  applyMiddleware,
  combineReducers,
  createStore
} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {PersistGate} from 'redux-persist/integration/react';
import thunk from 'redux-thunk';
import App from './App';
import blogReducer from './reducers/blogReducer';
import loginReducer from './reducers/loginReducer';
import notificationReducer from './reducers/notificationReducer';
import userReducer from './reducers/userReducer';
import './index.css';

const store = createStore(persistReducer({
  key: 'root',
  serialize: true,
  storage: storage,
  whitelist: ['login']
}, combineReducers({
  blogs: blogReducer,
  login: loginReducer,
  notification: notificationReducer,
  users: userReducer
})), composeWithDevTools(applyMiddleware(thunk)));

const persistor = persistStore(store);
const render = () => {
  ReactDOM.render((
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor} >
        <App />
      </PersistGate>
    </Provider>
  ), document.getElementById('root'));
};
render();
store.subscribe(render);