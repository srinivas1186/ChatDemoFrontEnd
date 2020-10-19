import React from 'react';
import {Row} from 'react-bootstrap';


class Message extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            messages:[]
        }
    }
    renderMessages = ()=>{
        let message = this.props.data || {};
        return (
            <div>
                <div className='userName'>
                    {message.user}
                </div>
                <div className='body'>
                    {message.content}
                </div>
                <div className='time'>
                    {message.time}
                </div>
            </div>
        )
    }
  render() {
    return (
        <Row>
            {this.renderMessage}
        </Row>
      
    );
  }
}

const mapStateToProps = (state)=>({
    messages : state.messages
})

export default connect(mapStateToProps)(Message);