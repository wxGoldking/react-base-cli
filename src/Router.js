import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Home from './Home';
import User from './User';

const BasicRoute = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/user" component={User}/>
            <Redirect to="/" />
        </Switch>
    </BrowserRouter>
);


export default BasicRoute;