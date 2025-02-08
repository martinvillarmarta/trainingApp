import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ReactDom from 'react-dom/client'
import Login from './pages/Login'

const App = () => {
  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="*" element={ <Login /> }/>
        </Routes>
      </Router>
    </React.StrictMode>
    );
};

const root = ReactDom.createRoot(document.getElementById('root'));
root.render(<App />);