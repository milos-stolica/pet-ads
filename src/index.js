import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import App from './components/App';
import configureStore from "./redux/configureStore";
import { Provider as ReduxProvider } from "react-redux";
import { loadUserFromStorage } from "./redux/actions/userActions";

const store = configureStore();

const user = JSON.parse(localStorage.getItem('user'));
store.dispatch(loadUserFromStorage(user));

ReactDOM.render(
  <ReduxProvider store={store}>
    <Router>
      <App />
    </Router>
  </ReduxProvider>,
  document.getElementById('root')
);

export default store.dispatch;
