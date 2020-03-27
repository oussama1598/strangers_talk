import React, { Component } from "react";
import { withRouter } from "react-router";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography, Fab, Button, Box } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import InfoDialog from "../../components/InfoDialog";
import LoadingDialog from "../../components/LoadingDialog";
import socketIO from "../../services/socketIO";

const classes = () => ({
  fab: {
    margin: 0,
    top: "auto",
    left: "auto",
    bottom: 20,
    right: 20,
    position: "fixed"
  },
  textMargin: {
    margin: 5
  },
  enterButtonBox: {
    margin: "5px 30px"
  }
});

class Home extends Component {
  constructor() {
    super();

    this.state = {
      infoDialogOpen: false,
      loading: false
    };
  }

  onDialogInfoClose = (clickedButtonId, data = {}) => {
    if (clickedButtonId === 1) {
      socketIO.emit("look_for_stranger", data);

      this.setState({
        loading: true
      });

      socketIO.once("stranger_found", this.onStrangerFound);
    }

    this.setState({
      infoDialogOpen: false
    });
  };

  onEnterChatClick = () => {
    this.setState({
      infoDialogOpen: true
    });
  };

  onStrangerFound = ({ strangers_id }) => {
    this.setState({
      loading: false
    });

    this.props.history.push("/chat", {
      strangerId: strangers_id
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Box flexGrow={1}>
        <Grid
          container
          direction="column"
          alignItems="stretch"
          justify="center"
          style={{ height: "100%" }}
        >
          <Grid item className={classes.textMargin}>
            <Typography align="center">
              Feeling bored, or simply you just want to meet new people.
            </Typography>
          </Grid>
          <Grid item className={classes.textMargin}>
            <Typography align="center">
              Strangers talk offers you the possibility to talk to random
              strangers.
            </Typography>
          </Grid>
          <Grid item className={classes.enterButtonBox}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              fullWidth
              onClick={this.onEnterChatClick}
            >
              Enter the chat
            </Button>
          </Grid>
        </Grid>
        <Fab aria-label="More" color="secondary" className={classes.fab}>
          <AddIcon></AddIcon>
        </Fab>
        <InfoDialog
          open={this.state.infoDialogOpen}
          onClose={this.onDialogInfoClose}
        />
        <LoadingDialog open={this.state.loading} />
      </Box>
    );
  }
}

export default withRouter(withStyles(classes)(Home));
