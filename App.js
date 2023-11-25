import React from "react";
import './App.css';
import Signup from "./components/authorization/Signup";
import Login from "./components/authorization/Login";
import { Account } from "./components/authorization/Account";
import Status from "./components/authorization/Status";
import Settings from "./components/authorization/Settings";
import ForgotPassword from "./components/authorization/ForgotPassword";
import ChangeEmail from "./ChangeEmail";
import Attributes from "./components/authorization/Attributes";

const App = () => {
  return (
    <Account>
      <Status/>
      <Signup/>
      <Login/>
      <ForgotPassword/>
      <Settings/>
      <Attributes/>
    </Account>
    );

};


export default App;
