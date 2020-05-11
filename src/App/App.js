import React from "react"; 
import { BrowserRouter, Route } from "react-router-dom";
import "todomvc-app-css/index.css"; 
import Footer from "../components/Footer";
import AuthContainer from "../containers/AuthContainer"; 

export default function App() {  
  return <AuthContainer />
  // return ( 
  //     <BrowserRouter>
  //       <React.Fragment>
  //         <div className="todoapp">  
  //           <Route component={AuthContainer} /> 
  //         </div>
  //         <Footer />
  //       </React.Fragment>
  //     </BrowserRouter> 
  // );
}
