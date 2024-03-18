import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // The Provider component is used to pass the Redux store down to the rest of the components in the application.
  <Provider store={store}>
    <App />
  </Provider>
);

//callback functions