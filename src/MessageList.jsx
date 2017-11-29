import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {

    /* [messageDataObjects].map(messageDataObject => messagePresentation) => [messagePresentation]*/
    const messageComponents = this.props.messages.map((message) => {
      return <Message 
          message={message.content} //variable that can change 
          key = {message.id}
          username = {message.username}/>
    });

    return (
        <div className="messages">
          {messageComponents}
        </div>
    )
  }
}
export default MessageList;
