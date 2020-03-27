import React from 'react';
import './App.css';
import Header from './components/header';
import Footer from './components/footer';
import MovieList from './components/content/MovieList';

function App() {
  return (
    <div className="App">
      <header className="header">
        <Header />
      </header>
      <MovieList />
      <Footer />
    </div>
  );
}

export default App;
