import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    console.log('MessageList Props', this.props);

    /* [messageDataObjects].map(messageDataObject => messagePresentation) => [messagePresentation]*/
    const messageComponents = this.props.messages.map((message) => {
      return <Message message={message.content} //variable that can change 
          key = {message.id}
          username = {message.username}/>
    })
    return (
        <div className="message">
          {messageComponents}
          <div className="message system">
           Anonymous1 changed their name to nomnom.
           </div>
       </div>
    )
  }
}
export default MessageList;
