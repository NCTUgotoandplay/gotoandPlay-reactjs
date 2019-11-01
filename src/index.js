import React, { useState } from 'react';
import ReactDOM from "react-dom"
import { BrowserRouter} from "react-router-dom"
import "./index.css"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import Analytics from 'react-router-ga';

import Constants from './flux/constants';

import { SnackbarProvider, withSnackbar } from 'notistack';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const MyApp = withSnackbar(App);

const Theme = createMuiTheme({
});
const DarkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: { main: '#2962ff' },
  },
});

function Theming(props) {
  const [dark_theme, setDarktheme] = useState(false);
  let theme = dark_theme===true?DarkTheme:Theme;
  return(
    <ThemeProvider theme={theme}>
      {props.render(dark_theme, setDarktheme)}
    </ThemeProvider>
  );
}

ReactDOM.render(
  <Theming render={(dark_theme, setDarktheme)=> {
    return(
      <SnackbarProvider maxSnack={3}>
        <BrowserRouter>
          <Analytics id={Constants.settings.ga} debug>
            <MyApp NoServiceClient={window.NSc} dark_theme={dark_theme} dark_theme_state={[dark_theme, setDarktheme]}/>
          </Analytics>
        </BrowserRouter>
      </SnackbarProvider>
    )
  }}/>, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
