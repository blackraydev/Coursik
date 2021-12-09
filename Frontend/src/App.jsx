import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import GuestApp from "./components/Guest/GuestApp";
import UserApp from "./components/User/UserApp";
import "./styles/App.css";

const App = () => {
  return(
    <HashRouter>
      <div className="App">
        <Switch>
          <Route path="/home/:id" component={UserApp}/>
          <Route path="/" component={GuestApp}/>
        </Switch>
      </div>
    </HashRouter>
  )
}

export default App;