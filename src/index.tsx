import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/tailwind.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Auth0Provider} from "@auth0/auth0-react";
import {Provider} from "react-redux";
import store from "./store";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
//
 const domain = process.env.REACT_APP_AUTH0_DOMAIN;
 const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
 const audience = process.env.REACT_APP_AUTH0_AUDIENCE;
 const redirectUrl = process.env.REACT_APP_BASE_URL;



if (domain !== undefined && clientId !== undefined)
ReactDOM.render(
    <Provider store={store}>
        <Auth0Provider
            domain= {domain}
            clientId= {clientId}
            redirectUri={redirectUrl}
            audience={audience}
        >
          <App />
      </Auth0Provider>
    </Provider>,

  document.getElementById('root')
);
else
    throw new Error('Auth0 domain and/or client id is missing');

serviceWorkerRegistration.register()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
