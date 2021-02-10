import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import GuestApp from "./components/Guest/GuestApp";
import UserApp from "./components/User/UserApp";
import "./styles/App.css";

const App = () => {
  return(
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/home/:id" component={UserApp}/>
          <Route path="/" component={GuestApp}/>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App;
