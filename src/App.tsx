import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import HomePage from './components/Pages/HomePage';
import RoomPage from './components/Pages/RoomPage';
import Router from './components/Router/Router';

function App() {
  const PAGE = window.location.href.split('/').pop();
  console.log(PAGE);
  return (
    <>
      <Router></Router>
    </>
  );
}

export default App;
