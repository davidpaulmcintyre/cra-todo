import React from "react"; 
import { BrowserRouter, Route } from "react-router-dom";
import "todomvc-app-css/index.css"; 
import Footer from "../components/Footer";
import AuthContainer from "../containers/AuthContainer"; 

export default function App() {  
  return (
    <div class="todoapp">
      <AuthContainer /> 
    </div> )
}
