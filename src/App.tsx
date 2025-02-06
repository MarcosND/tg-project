import React from 'react';
import './App.css';
import { BasePage } from './components';
import { Start } from './pages';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BasePage />
        <Start />
      </header>
    </div>
  );
}

export default App;
