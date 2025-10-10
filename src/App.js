// src/App.js

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './screens/home/Home';
import Login from './screens/login/Login';
import Sobre from './screens/sobre/Sobre';
import Contato from './screens/contato/Contato';
import Carrinho from './screens/carrinho/Carrinho';
import Register from './screens/register/Register';
import ComponentHeaderGabriel from './components/componentHeaderGabriel/ComponentHeaderGabriel';
import Perfil from './screens/perfil/Perfil'; // MUDANÇA: 1. Importar o Perfil

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ComponentHeaderGabriel />
        <main>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/cadastro" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="/perfil" element={<Perfil />} /> {/* MUDANÇA: 2. Adicionar a rota */}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;