import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";

import Themes from "./themes";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { LayoutProvider } from "./context/LayoutContext";
import { UserProvider } from "./context/UserContext";
import { FormProvider } from "./context/FormContext"

import MainInterceptors from "./config/mainInterceptors"

MainInterceptors()

ReactDOM.render(
  <LayoutProvider>
    <UserProvider>
      <FormProvider>
      <ThemeProvider theme={Themes.default}>
        <CssBaseline />
        <App />
      </ThemeProvider>
      </FormProvider>
    </UserProvider>
  </LayoutProvider>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
