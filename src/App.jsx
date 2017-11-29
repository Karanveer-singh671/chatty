import React, {Component} from 'react';
import Chatbar from './ChatBar.jsx'
import MessageList from './MessageList.jsx';
import Navbar from './nav.jsx'

class App extends Component {
  constructor(props){
    super(props);
    this.state={
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      id:'1',
      username: "Bob", 
      content: "Has anyone seen my marbles?",
    },
    {
      id:'2',
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }
  ]
};
  }
  render() {
    return (
      <div>
        <Navbar />
        <MessageList messages={this.state.messages} />  // makes it a prop
        <Chatbar currentUser={this.state.currentUser}/>
      </div>
    );
  }
}
export default App;