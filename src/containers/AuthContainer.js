import React from "react";    
import TodoContainer from './TodoContainer';
import Logout from '../components/Logout' 

class AuthContainer extends React.Component {
    constructor(props){
        super(props)
        function getToken() {
            const hash = parseParms(document.location.hash.substring(1));
            return hash;
        }

        function parseParms(str) {
            var pieces = str.split("&"), data = {}, i, parts;
            for (i = 0; i < pieces.length; i++) {
                parts = pieces[i].split("=");
                if (parts.length < 2) {
                    parts.push("");
                }
                data[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
            }
            return data;
        }  
        const tokens = getToken(); 
        const id_token = tokens.id_token; 
        this.state = { 
            isAuthenticated: id_token && id_token.length > 0 
        }  
        // hack: store token as global var
        window.token = id_token;
    } 

    render(){
        const { isAuthenticated } = this.state; 
        if (isAuthenticated){
            return <TodoContainer /> 
        } else if (isAuthenticated === false){
            return <Logout  />;
        } else {
            return <span>...Authenticating</span>
        } 
    }
}

export default AuthContainer; 