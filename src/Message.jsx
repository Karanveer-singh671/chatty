import React, {Component} from 'react';
class Message extends Component {
  render() {
    return (
      <div>
        <div className="messages">
        <span className="message-username">{this.props.username}</span>
        <span className="message-content">{this.props.message}</span>
        </div>
      </div>
      )
  }
}
export default Message;
