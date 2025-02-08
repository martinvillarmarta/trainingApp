import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReactDom from 'react-dom/client';

const App = () => {
  return (
    <div>Hola Mundo</div>
  );
};

const root = ReactDom.createRoot(document.getElementById('root'));
root.render(<App />);