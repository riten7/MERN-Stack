import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MovieList from './MovieList';
import MovieDetail from './MovieDetail';

const MainPage = () => (
  <main>
    <Switch>
      <Route exact path='/' component={MovieList}/>
      <Route exact path='/movie/:id' component={MovieDetail}/>
    </Switch>
  </main>
)

export default MainPage;
