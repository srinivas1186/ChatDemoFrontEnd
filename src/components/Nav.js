import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ButtonGroup,Button} from 'react-bootstrap'

function Nav(props) {
  const logged_out_nav = (
    <ButtonGroup >
        <Button variant="secondary" onClick={() => props.display_form('login')}>Login</Button>
        <Button variant="secondary" onClick={() => props.display_form('signup')}>Signup</Button>
    </ButtonGroup>
  );

  const logged_in_nav = (
    <ButtonGroup >
        <Button variant="secondary" onClick={props.handle_logout}>Logout</Button>
    </ButtonGroup>
  );
  return <div>{props.logged_in ? logged_in_nav : logged_out_nav}</div>;
}
const mapStateToProps = (state)=>({
    loggedIn : state.loggedIn
})
export default connect(mapStateToProps)(Nav);

Nav.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  display_form: PropTypes.func.isRequired,
  handle_logout: PropTypes.func.isRequired
};