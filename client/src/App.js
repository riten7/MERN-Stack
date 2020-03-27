import React from 'react';
import './App.css';
import Header from './components/header';
import Footer from './components/footer';
import MainPage from './components/content/MainPage';

function App() {
  return (
    <div className="App">
      <header className="header">
        <Header />
      </header>
      <MainPage />
      <Footer />
    </div>
  );
}

export default App;
