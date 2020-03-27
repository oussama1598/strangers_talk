import React, { Component } from "react";
import { withRouter } from "react-router";
import ChatBox from "../../components/ChatBox";
import socketIO from "../../services/socketIO";

class ChatPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };
  }

  componentWillMount() {
    if (!this.props.location.state) return this.props.history.push("/");

    const { strangerId } = this.props.location.state;

    this.props.history.replace({
      pathname: "/chat",
      state: {}
    });

    if (!strangerId) this.props.history.push("/");
  }

  componentDidMount() {
    socketIO.on("message", this.onMessageReceived);
    socketIO.on("stranger_left", this.onStrangerLeft);
  }

  componentWillUnmount() {
    socketIO.off("message", this.onMessageReceived);
    socketIO.off("stranger_left", this.onStrangerLeft);
  }

  onUserTyping = () => {
    socketIO.emit("user_typing");
  };

  onMessageSend = message => {
    socketIO.emit("message_stranger", { message });

    this._addMessage({ received: false, name: "You", message });
  };

  onMessageReceived = message => {
    this._addMessage({ received: true, name: "Stranger", message });
  };

  onStrangerLeft = () => {
    this.props.history.push("/");
  };

  _addMessage({ received, name, message }) {
    this.setState({
      messages: [
        ...this.state.messages,
        {
          received: received,
          name: name,
          message
        }
      ]
    });
  }

  render() {
    return (
      <ChatBox
        onUserTyping={this.onUserTyping}
        onMessageSend={this.onMessageSend}
        messages={this.state.messages}
      ></ChatBox>
    );
  }
}

export default withRouter(ChatPage);
