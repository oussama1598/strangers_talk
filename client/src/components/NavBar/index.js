import React, { Component } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  IconButton
} from "@material-ui/core";
import { withTheme, withStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { withRouter } from "react-router";

import socketIO from "../../services/socketIO";

const styles = () => ({
  onlineUsers: {
    position: "relative",
    marginLeft: 0
  }
});

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      onlineUsers: 0,
      showBack: this.props.location.pathname === "/chat"
    };

    this.clearTypingTimeout = null;
  }

  componentDidMount() {
    const { history, location } = this.props;

    history.listen(this.onRouteChange.bind(this));

    this._updateSocketListeners(location);
  }

  onRouteChange(route) {
    this.setState({
      showBack: route.pathname === "/chat"
    });

    this._updateSocketListeners(route);
  }

  onBackClick = () => {
    socketIO.emit("user_leave");

    this.props.history.push("/");
  };

  onUsersNumberChanged = users => {
    this.setState({
      onlineUsers: users
    });
  };

  onStrangerTyping = () => {
    if (this.clearTypingTimeout) clearTimeout(this.clearTypingTimeout);

    this.clearTypingTimeout = setTimeout(() => {
      this.setState({
        typing: false
      });
    }, 1000);

    this.setState({
      typing: true
    });
  };

  _updateSocketListeners(route) {
    if (route.pathname !== "/chat") {
      socketIO.on("users_updated", this.onUsersNumberChanged);
      socketIO.off("stranger_typing", this.onStrangerTyping);
    } else {
      socketIO.on("stranger_typing", this.onStrangerTyping);
      socketIO.off("users_updated", this.onUsersNumberChanged);
    }
  }

  render() {
    const { classes } = this.props;
    const { showBack, typing } = this.state;

    return (
      <AppBar color="inherit" position="static">
        <Toolbar>
          {showBack && (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={this.onBackClick}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
          <Grid container justify="space-between">
            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="h6">Strangers Talk</Typography>
                </Grid>
                <Grid item>
                  <Typography
                    className={classes.time}
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {typing && "Stranger is typing ..."}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            {!showBack && (
              <Grid item>
                <Typography className={classes.onlineUsers}>
                  {this.state.onlineUsers} Online Users
                </Typography>
              </Grid>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withRouter(withStyles(styles)(withTheme(NavBar)));
