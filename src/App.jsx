import React, {Component} from 'react';
import Chatbar from './ChatBar.jsx'
import MessageList from './MessageList.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.socket=null;
    this.state = {
      currentUser: {
        name: 'Bob'
      }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      count: 0
    };
    this.newChatMessage = this.newChatMessage.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');

    this.socket.addEventListener('message', (msg) => {
      let parsedMessage = JSON.parse(msg.data);
      
      if (parsedMessage.type === 'userCount') {
          this.setState({
          userCount: parsedMessage.userCount
          })
      }
      else {
        this.setState({
        messages: this.state.messages.concat(parsedMessage)
        });
      } 
    })
  }
      
  newChatMessage(content) {
    var tempMessage = content;
    //if condition for the Notification where user name changes its name from old to new
    if(tempMessage.type==='Notification'){
      var newMessage = {
        content: this.state.currentUser.name + ' has changed their name to '+content.newUsername,
      };

      this.setState({
        currentUser: {
          name: tempMessage.newUsername
        }
      });

    }
    else if(tempMessage.type==='NewMessage'){
      newMessage = {

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
    return (
      <div>
        <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <a href="/" className="navbar-counter"> {this.state.userCount}users online</a>
        </nav>
        <MessageList messages={ this.state.messages }/>
        <Chatbar currentUser={ this.state.currentUser}
          newChatMessage={this.newChatMessage} />
      </div>
    );
  }

}

export default App;