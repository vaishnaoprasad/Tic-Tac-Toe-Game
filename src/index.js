import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { IonApp } from '@ionic/react';

import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import { StatusBar } from '@capacitor/status-bar';

const hideStatusBar = async () => {
  await StatusBar.hide();
};

const setStatusBarBackgroundColor = async () => {
  await StatusBar.setBackgroundColor({color: "#ffffff"});
};

const root = ReactDOM.createRoot(document.getElementById('root'));

hideStatusBar();
setStatusBarBackgroundColor();

root.render(
  <React.StrictMode>
    <IonApp>
    <App />
    </IonApp>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
