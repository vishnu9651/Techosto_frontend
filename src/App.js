import logo from './logo.svg';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import { Users } from './components/Users';

function App() {
  return (
    <div className="App">
          <Users />
    </div>
  );
}

export default App;
