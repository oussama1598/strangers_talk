import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import { Box, ListItem, InputBase, Fab, List, Fade } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import OtherMessage from "./OtherMessage";
import MyMessage from "./MyMessage";

const styles = () => ({
  inputBox: {
    margin: "5px 10px",
    padding: "10px 20px",
    backgroundColor: "white",
    borderRadius: "30px"
  },
  input: {
    backgroundColor: "white",
    color: "black"
  },
  fabBox: {
    marginRight: 10
  },
  messagesList: {
    "overflow-y": "auto"
  },
  messageAppear: {
    opacity: 0.01
  },
  messageAppearActive: {
    opacity: 1,
    transition: "opacity 1s ease-in"
  }
});

class ChatBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: 100,
      message: ""
    };
  }

  updateWindowDimensions = () => {
    this.setState({ height: window.innerHeight });
  };

  onMessageChange = event => {
    this.setState({
      message: event.target.value
    });

    this.props.onUserTyping();
  };

  onMessageKeyPress = event => {
    if (event.key === "Enter") {
      this.onSendButtonClick();
    }
  };

  onSendButtonClick = () => {
    if (this.state.message === "") return;

    this.props.onMessageSend(this.state.message);

    this.setState({
      message: ""
    });
  };

  componentDidMount() {
    this.updateWindowDimensions();

    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  _renderMessage(index, messageData) {
    const { received, message, name } = messageData;

    return (
      <Fade in={true} timeout={300} key={index}>
        <ListItem>
          {received ? (
            <OtherMessage message={message} name={name} />
          ) : (
            <MyMessage message={message} />
          )}
        </ListItem>
      </Fade>
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <Box flexGrow={1} display="flex" flexDirection="column">
        <Box flexGrow={1}>
          <List
            style={{ height: this.state.height - 64 - 100 + "px" }}
            className={classes.messagesList}
          >
            {this.props.messages.map((messageData, index) =>
              this._renderMessage(index, messageData)
            )}
          </List>
        </Box>
        <Box>
          <Box
            flexGrow={1}
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
          >
            <Box flexGrow={1} className={classes.inputBox}>
              <InputBase
                className={classes.input}
                fullWidth
                placeholder="Type Something ..."
                value={this.state.message}
                onChange={this.onMessageChange}
                onKeyPress={this.onMessageKeyPress}
              />
            </Box>
            <Box className={classes.fabBox}>
              <Fab
                aria-label="More"
                color="secondary"
                className={classes.fab}
                onClick={this.onSendButtonClick}
              >
                <SendIcon></SendIcon>
              </Fab>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default withStyles(styles)(ChatBox);
