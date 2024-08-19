import React from 'react';
import LaunchList from './components/LaunchList';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Space Launches</h1>
      <LaunchList />
    </div>
  );
};

export default App;