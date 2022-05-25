//imports react
import React from 'react';

//imports do router
import { Routes, Route } from "react-router-dom";

//imports de tela
import Home from './assets/pages/home/Home';
import Login from './assets/pages/login/Login';
import Cadastro  from './assets/pages/cadastro/Cadastro';
import InsertNote from './assets/pages/inserirNota/InsertNote';
import EditarNota from './assets/pages/editarNota/EditarNota';

//imports css
import './style.css';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/inserirNota" element={<InsertNote />} />
      <Route path="/editarNota/:idNota" element={<EditarNota />} />
    </Routes>
  );
}

export default App;