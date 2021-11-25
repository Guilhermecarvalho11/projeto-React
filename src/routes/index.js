import React from 'react'
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

function routes(){
   return(
       <BrowserRouter>
       <Switch>
           <Route path="/" exact component={Home}/>
           <Route path="/SignIn" component={SignIn}/>
           <Route path="/SignUp" component={SignUp}/>
       </Switch>
       </BrowserRouter>

   )
}


export default routes;