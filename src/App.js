import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Home from './assets/pages/home/Home';
import Todo from './assets/pages/todo/Todo';
import Todo2 from './assets/pages/todo/Todo2'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/todo" element={<Todo />} />
      <Route path="/todo" element={<Todo2 />} />
    </Routes>
  );
}

export default App;