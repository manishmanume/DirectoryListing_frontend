import React from 'react';
import { Provider } from 'react-redux';
import store from './store/Store';
import HomePage from './pages/HomePage';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

export default App;