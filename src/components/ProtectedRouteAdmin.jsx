// src/components/ProtectedRouteAdmin.jsx

import { Navigate } from 'react-router-dom';
import { isAuthenticated, isAdmin } from '../services/authService';

/**
 * Componente que protege rotas de admin, redirecionando se não for admin
 */
function ProtectedRouteAdmin({ children }) {
    const authenticated = isAuthenticated();
    const admin = isAdmin();

    if (!authenticated) {
        // Redireciona para login se não estiver autenticado
        return <Navigate to="/login" replace />;
    }

    if (!admin) {
        // Redireciona para home se não for admin
        console.warn('⚠️ Acesso negado: Usuário não é ADMIN');
        return <Navigate to="/home" replace />;
    }

    // Renderiza o componente filho se for admin
    return children;
}

export default ProtectedRouteAdmin;

