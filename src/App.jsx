import React, {Component} from 'react';
import Chatbar from './ChatBar.jsx'
import MessageList from './MessageList.jsx';
import Navbar from './nav.jsx'
import home from '../styles/home.scss';


class App extends Component {
  constructor(props) {
    super(props);
    this.socket=null;
    this.state = {
      currentUser: {
        name: 'Bob'
      }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
    this.newChatMessage = this.newChatMessage.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");

    this.socket.addEventListener('message', (msg) => {
      this.setState({
        currentUser: this.state.currentUser,
        messages: this.state.messages.concat(JSON.parse(msg.data))});
    });
  }

  componentWillMount() {

  }


  newChatMessage(content) {
    var tempMessage = content;
    console.log("new message in app ",tempMessage);

    console.log(tempMessage.newUsername);

    //if condition for the Notification where user name changes its name from old to new
    if(tempMessage.type==='Notification'){
      var newMessage = {
        content: this.state.currentUser.name + ' has changed named to '+content.newUsername,
      };

      this.setState({
        currentUser: {
          name: tempMessage.newUsername
        }
      });

    }
    else if(tempMessage.type==='NewMessage'){
      var newMessage = {

        content: content.content,
        username: content.username,
      };
      this.setState({
        currentUser : {
          name: content.username
        }
      });

    }

    //const newMessage = {username: this.state.currentUser.name, content: content.content};
    this.socket.send(JSON.stringify(newMessage))
  }

  render() {
    console.log("Rendering <App/>");
    console.l
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