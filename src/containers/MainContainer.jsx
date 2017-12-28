import React from 'react';

import connectWithRouter from '../../modules/connectWithRouter';
import ServiceNameContainer from './ServiceNameContainer';
import About from '../components/About';
import { Route, Switch } from 'react-router-dom';

const MainContainer = ({ sessionCounter }) => (
  <div>
    <div>
      <strong>Session counter: {sessionCounter.counter}</strong>
      <br/>
      (Note that this value is incresed only when server side rendering requested)
    </div>
    <Switch>
      <Route exact path='/' component={ServiceNameContainer}/>
      <Route path='/about' component={About}/>
    </Switch>
  </div>
);

const mapStateToProps = (state) => {
  return {
    sessionCounter: state.sessionCounter,
  };
};

export default connectWithRouter(
  mapStateToProps,
  null
)(MainContainer);
