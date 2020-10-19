import React from 'react';
import {Container} from 'react-bootstrap';
import Message from './Message';


class ChatRoom extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            messages:[]
        }
    }
    renderMessages = ()=>{
        if(this.state.messages){
            if(this.state.messages.length==0){
                return (
                    <p>
                        No Messages
                    </p>
                ) 
            }else{
                return this.state.messages.map(message=>{
                    return <Message data={message}/>
                })
            }
        }else{
            return (
                <p>
                    No Messages
                </p>
            )
        }
    }
  render() {
    return (
        <Container>
        {this.renderMessages}
        </Container>
      
    );
  }
}

const mapStateToProps = (state)=>({
    messages : state.messages
})

export default ChatRoom;
