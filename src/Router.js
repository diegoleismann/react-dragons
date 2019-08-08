import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './pages/Login';
import DragonList from './pages/DragonList';
import DragonDetail from './pages/DragonDetail';
import DragonAdd from './pages/DragonAdd';

class AppRouter extends Component {
  render() {
    return (
      <div className="Router">
      <Router>
          <Route exact path='/' component={Login} />
          <Route path='/login' component={Login} />
          <Route path='/list' component={DragonList} />
          <Route path='/add' component={DragonAdd} />
          <Route path='/dragon/:id' component={DragonDetail} />
          
      </Router>
      </div>
    );
  }
}
/*
<Route path='contacts' component={ContactList}/>
<Route path='contacts/:id' component={ContactDetail} />
<Route path='*' component={NotFound}/>
*/
export default AppRouter;
