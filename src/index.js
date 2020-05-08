import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import "./index.css";
import App from "./App/App"; 
import * as serviceWorker from "./serviceWorker";
// import {CognitoAuth} from 'amazon-cognito-auth-js';
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

// const config = {
//   "base_url": "https://d345h51m1kfpo7.cloudfront.net/",
//   "clientId": "48kphk3sdpmvo3df882q51lcso",
//   "appWebDomain": "todo-mcintyre-david.auth.us-east-1.amazoncognito.com",
//   "tokenScopesArray": ["email", "profile","openid", "aws.cognito.signin.user.admin"],
//   "redirectUriSignIn": "https://d345h51m1kfpo7.cloudfront.net", // <- this has to match the App config in cognito.
//   "redirectUriSignOut": "https://d345h51m1kfpo7.cloudfront.net/logout" // <- this has to match the App config in cognito.
// } 
// // todo: add logout route
//   const authData = {
//     ClientId : config.clientId, // Your client id here
//     AppWebDomain : config.appWebDomain,
//     TokenScopesArray : config.tokenScopesArray,
//     RedirectUriSignIn : config.redirectUriSignIn,
//     RedirectUriSignOut : config.redirectUriSignOut 
// }
// var auth = new AmazonCognitoIdentity.CognitoAuth(authData);
// var auth = new CognitoAuth(authData); 
// var curUrl = window.location.href;
// auth.parseCognitoWebResponse(curUrl);
// auth.userhandler = {
// 	onSuccess: function(result) {
//     console.log('logged in')
// 		alert("Sign in success");
		// showSignedIn(result);
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
); 

serviceWorker.unregister(); 