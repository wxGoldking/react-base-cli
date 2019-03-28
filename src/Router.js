import React from 'react';
import AsyncComponent from './AsyncComponent';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
// import Home from './Home';
// import User from './User';

const Home = AsyncComponent(() => import(/* webpackChunkName: "Home" */ "./Home")),
      User = AsyncComponent(() => import(/* webpackChunkName: "User" */ "./User")),
      Home1 = AsyncComponent(() => import(/* webpackChunkName: "Home1" */ "./Home1")),
      Home2 = AsyncComponent(() => import(/* webpackChunkName: "User2" */ "./Home2"));

const BasicRoute = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" render={()=><Home/>}/>
            <Route exact path="/user" render={()=><User/>}/>
            <Route exact path="/hom" render={()=><Home1/>}/>
            <Route exact path="/home" render={()=><Home2/>}/>
            <Redirect to="/" />
        </Switch>
    </BrowserRouter>
);


export default BasicRoute;