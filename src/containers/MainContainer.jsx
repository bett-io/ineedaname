import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ServiceNameContainer from './ServiceNameContainer';
import About from '../components/About';

const MainContainer = () => (
  <div>
    <Switch>
      <Route exact path='/' component={ServiceNameContainer}/>
      <Route path='/about' component={About}/>
    </Switch>
  </div>
);

export default MainContainer;
