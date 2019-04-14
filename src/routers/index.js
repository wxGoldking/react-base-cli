import React from 'react';
import "whatwg-fetch"; // 
import AsyncComponent from '../AsyncComponent';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

const Home = AsyncComponent(() => import(/* webpackChunkName: "Home" */ "../views/Home")),
      User = AsyncComponent(() => import(/* webpackChunkName: "User" */ "../views/User")),
      Home1 = AsyncComponent(() => import(/* webpackChunkName: "Home1" */ "../views/Home1")),
      Home2 = AsyncComponent(() => import(/* webpackChunkName: "User2" */ "../views/Home2"));

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