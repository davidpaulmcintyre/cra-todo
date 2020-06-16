import React from "react";    
import { connect } from 'react-redux';
import TodoContainer from './TodoContainer';
import Logout from '../components/Logout' 
import { authenticate } from '../actions/todo';

// use 'implicit grant' to authenticate user using access_token
class AuthContainer extends React.Component {
    constructor(props){
        super(props) 
        const qs = new URLSearchParams(window.location.search);
        const access_token = qs.get('access_token');
        const token_type = qs.get('token_type');
        // todo: apply expiration
        const expires_in = qs.get('expires_in');
        if (access_token && token_type){
            const strToken = `${token_type} ${access_token}`
            this.props.authenticate(strToken)
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