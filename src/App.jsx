import React, {Component} from 'react';
import Chatbar from './ChatBar.jsx'
import MessageList from './MessageList.jsx';
import Navbar from './nav.jsx'
import home from '../styles/home.scss';


class App extends Component {
  constructor(props) {
    super(props);
    this.socket = null;
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
          id: 1
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
          id: 2
        }
      ]
    }
    this.newChatMessage = this.newChatMessage.bind(this);
  }


  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
  }


  newChatMessage(content) {
    console.log("we are able to receive the content ",content);
    const id = this.state.messages[this.state.messages.length - 1].id + 1 
    console.log('id',id);
    const newMessage = {id: id, username: "thomas", content: content.content};
    const messages = this.state.messages.concat(newMessage)
    this.setState({messages: messages})
  }

  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <Navbar />
        <MessageList messages={ this.state.messages }/>
        <Chatbar currentUser={ this.state.currentUser}
          newChatMessage={this.newChatMessage} />
      </div>
    );
  }

}

export default App;