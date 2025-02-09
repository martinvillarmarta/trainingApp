import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ReactDom from 'react-dom/client'
import Login from './pages/Login'
import Home from './pages/Home'

const App = () => {
  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="*" element={ <Login /> }/>
          <Route path="/home" element={ <Home /> }/>
        </Routes>
      </Router>
    </React.StrictMode>
    );
};

const root = ReactDom.createRoot(document.getElementById('root'));
root.render(<App />);