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
      currentUser: {name: "Bob"},
      messages: [] // optional. if currentUser is not defined, it means the user is Anonymous
    }
    this.newChatMessage = this.newChatMessage.bind(this);
    // this.handleKeys=this.handleKeys.bind(this);
  }


  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
    console.log('Connected to Server');
    this.socket.addEventListener('message', (msg) => {
      this.setState({
        //receiving is parse
        messages: this.state.messages.concat(JSON.parse(msg.data))
      })
    });
  }

  newChatMessage(content) {
    // console.log("we are able to receive the content ",content);
    // const id = this.state.messages[this.state.messages.length - 1].id + 1 
    // console.log('id',id);
    const newMessage = {username: this.state.currentUser.name, content: content.content};
    this.socket.send(JSON.stringify(newMessage)); // messages now send to server stringify because socket can't take an object
  }

  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <Navbar />
        <MessageList messages={ this.state.messages }/>
        <Chatbar currentUser={ this.state.currentUser}
          newChatMessage={this.newChatMessage}
          onKeyPress={this.handleKeys} />
      </div>
    );
  }

}

export default App;