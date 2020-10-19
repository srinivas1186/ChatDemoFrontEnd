import React, { Component } from 'react';
import Nav from './components/Nav';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import './App.css';
import {Container,Row,Modal,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: '',
      logged_in: localStorage.getItem('token') ? true : false,
      username: '',
      errorOccured:false,
      errorMessage:'',
      chatUserFound:false,
      searchString:''
    };
  }

  componentDidMount() {
    if (this.state.logged_in) {
      fetch('http://localhost:8000/auth/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({ username: json.username });
        });
    }
  }

  handle_login = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        return res.json()
      })
      .then(json => {
        try{
          this.setState({
            logged_in: true,
            displayed_form: '',
            username: json.user.username
          });
          localStorage.setItem('token', json.token);
        }
        catch(err){
          this.setState({
            errorOccured:true,
            errorMessage:"Wrong Credentials"
          })
        }

      });
  };

  handle_signup = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/auth/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.username
        });
      });
  };

  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({ logged_in: false, username: '' });
  };

  display_form = form => {
    this.setState({
      displayed_form: form
    });
  };
  handleClose = ()=>{
    this.setState({
      errorMessage:'',
      errorOccured:false
    })
  }
  searchUsers = ()=>{
    let data = {
      
    }
    fetch('http://localhost:8000/auth/search?', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.username
        });
      });
  }
  handleSearchString(event){
    this.setState({
      searchString: event.target.value,
    })
  }
  renderLoggedPage(){
    return(
      <div>
        <Container>
          <Row>Hello, {this.state.username}</Row>
          <Row>
            <input  onChange={this.handleSearchString} placeholder="Enter username"/>
            <Button onClick={this.searchUsers}>Search</Button>
          </Row>
          <Row>
            {this.state.chatUserFound ? 'User Found' : 'Search users to chat'}
          </Row>
        </Container>

      </div>
    )
  }
  render() {
    let form;
    switch (this.state.displayed_form) {
      case 'login':
        form = <LoginForm handle_login={this.handle_login} />;
        break;
      case 'signup':
        form = <SignupForm handle_signup={this.handle_signup} />;
        break;
      default:
        form = null;
    }

    return (
      <div>
        <Container style={{width:"80%"}}>
          <Row style={{flexDirection:"row-reverse"}}>
            <Nav
              logged_in={this.state.logged_in}
              display_form={this.display_form}
              handle_logout={this.handle_logout}
            />
          </Row>
          
          {form}
          <h3>
            {this.state.logged_in
              ? this.renderLoggedPage()
              : 'Please Log In'}
          </h3>
        </Container>
        <Modal show={this.state.errorOccured} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Error !</Modal.Title>
          </Modal.Header>
            <Modal.Body>{this.state.errorMessage}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      
    );
  }
}

export default App;