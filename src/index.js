import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter} from "react-router-dom"
import "./index.css"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import Analytics from 'react-router-ga';

import Constants from './flux/constants';

import { SnackbarProvider, withSnackbar } from 'notistack';

const MyApp = withSnackbar(App);
ReactDOM.render(
  <SnackbarProvider maxSnack={3}>
    <BrowserRouter>
      <Analytics id={Constants.settings.ga} debug>
        <MyApp NoServiceClient={window.NSc} />
      </Analytics>
    </BrowserRouter>
  </SnackbarProvider>, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
