import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline, Box } from "@material-ui/core";

import theme from "./config/theme";
import NavBar from "./components/NavBar";
import Home from "./pages/Home/Home";
import ChatPage from "./pages/ChatPage";

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Box display="flex" flexDirection="column" className="vh-100">
            <Box>
              <NavBar />
            </Box>
            <Box flexGrow={1} display="flex" flexDirection="column">
              <Switch>
                <Route path="/chat">
                  <ChatPage />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </Box>
          </Box>
        </Router>
      </ThemeProvider>
    );
  }
}
