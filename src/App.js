// src/App.js

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './screens/home/Home';
import Login from './screens/login/Login';
import Sobre from './screens/sobre/Sobre';
import Carrinho from './screens/carrinho/Carrinho';
import Pedidos from './screens/pedidos/Pedidos';
import Vendas from './screens/vendas/Vendas';
import Register from './screens/register/Register';
import ComponentHeaderGabriel from './components/componentHeaderGabriel/ComponentHeaderGabriel';
import Perfil from './screens/perfil/Perfil';
import CadastroColaborador from './screens/admin/CadastroColaborador';
import ListaColaboradores from './screens/admin/ListaColaboradores';
import ProtectedRoute from './components/ProtectedRoute';
import ProtectedRouteAdmin from './components/ProtectedRouteAdmin';
import { CartProvider } from './contexts/CartContext';
import { OrderProvider } from './contexts/OrderContext';

function App() {
  return (
    <CartProvider>
      <OrderProvider>
        <BrowserRouter>
        <div className="App">
          <ComponentHeaderGabriel />
          <main>
          <Routes>
            {/* Rotas públicas - acessíveis sem autenticação */}
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Register />} />
            
            {/* Redireciona "/" para /login */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            {/* Rotas protegidas - requerem autenticação */}
            <Route 
              path="/home" 
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/sobre" 
              element={
                <ProtectedRoute>
                  <Sobre />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/carrinho" 
              element={
                <ProtectedRoute>
                  <Carrinho />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/pedidos" 
              element={
                <ProtectedRoute>
                  <Pedidos />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/perfil" 
              element={
                <ProtectedRoute requiredRole={["COLLABORATOR", "ADMIN"]}>
                  <Perfil />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/vendas" 
              element={
                <ProtectedRoute requiredRole={["COLLABORATOR", "ADMIN"]}>
                  <Vendas />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/cadastro-colaborador" 
              element={
                <ProtectedRouteAdmin>
                  <CadastroColaborador />
                </ProtectedRouteAdmin>
              } 
            />
            <Route 
              path="/admin/colaboradores" 
              element={
                <ProtectedRouteAdmin>
                  <ListaColaboradores />
                </ProtectedRouteAdmin>
              } 
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
      </OrderProvider>
    </CartProvider>
  );
}

export default App;