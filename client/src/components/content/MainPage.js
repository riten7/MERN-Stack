import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MovieList from './MovieList';
import MovieDetail from './MovieDetail';

const MainPage = () => (
  <main>
    <Switch>
      <Route exact path='/' component={MovieList}/>
      <Route path='/detail' component={MovieDetail}/>
    </Switch>
  </main>
)

export default MainPage;
