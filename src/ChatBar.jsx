import React, {Component} from 'react';

class Chatbar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        username : props.currentUser.name,
        content: ''
      }
      this.onEnterKey = this.onEnterKey.bind(this);
      this.onNewContent = this.onNewContent.bind(this);
     this.newChatMessage = this.props.newChatMessage.bind(this);
    }
  
    onNewContent(event) {
      this.setState({
        content: event.target.value
      });
    }
    onNewName(event) {
        this.setState({username: event.target.value});
    }

    onEnterNewName(event) {
        if(event.key === "Enter") {
        this.props.currentUser(this.state);
        this.onNewName();
      }
    }
  
    onEnterKey(event) {
       if(event.key == 'Enter'){
         this.props.newChatMessage(this.state);
         this.setState({content:''})
       }
    }
  
    render() {
      return (
        <footer className="chatbar">
          <input className="chatbar-username" placeholder={this.state.username} 
          onChange={this.onNewName} 
          onKeyPress={this.onEnterNewName}/>
          <input className="chatbar-message" placeholder="Type a message and hit ENTER" 
            onChange={this.onNewContent} value={this.state.content} 
            onKeyPress={this.onEnterKey} /> 
        </footer>
      );
    }
  }
  
  export default Chatbar;