import React, {Component} from 'react';
class Message extends Component {
  render() {
    console.log('Message Props', this.props);
    return (
      <div>
        <div className="message">
          <span className="message-username">{this.props.message.username}</span>
          <span className="message-content">{this.props.message.content}</span>
          <span className="message-id">{this.props.message.id}</span>
        </div>
      </div>
      )
  }
}
export default Message;
console.log("Rendering <Message />");
