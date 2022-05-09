import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Home from './assets/pages/home/Home';
import Todo from './assets/pages/todo/Todo';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/todo" element={<Todo />} />
    </Routes>
  );
}

export default App;