import React from "react";    
import { connect } from 'react-redux';
import TodoContainer from './TodoContainer';
import Logout from '../components/Logout' 
import { authenticate } from '../actions/todo';

// use 'implicit grant' to authenticate user using access_token
class AuthContainer extends React.Component {
    constructor(props){
        super(props) 
        const qs = new URLSearchParams(window.location.hash.replace('#','?'));
        const token = qs.get('id_token'); 
        // todo: apply expiration
        const expires_in = qs.get('expires_in');
        if (token){
            window.token = token;
            this.props.authenticate(token)
        } 
    }  

    render(){
        const { authenticated } = this.props; 
        if (authenticated){
            return <TodoContainer /> 
        } else if (authenticated === false){
            return <Logout  />;
        } else {
            return <span>...Authenticating</span>
        } 
    }
}

const mapStateToProps = state => {
    return {
        authenticated: state.authenticated
    }
}

const mapDispatchToProps = dispatch => {
    return {
      authenticate: (token) => {
        dispatch(authenticate(token));
      },   
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer); 