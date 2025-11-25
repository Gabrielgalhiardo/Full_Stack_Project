// src/components/ProtectedRoute.jsx

import { Navigate } from 'react-router-dom';
import { isAuthenticated, hasRole, hasAnyRole } from '../services/authService';

/**
 * Componente que protege rotas, redirecionando para login se não autenticado
 * Opcionalmente pode verificar uma role específica ou múltiplas roles
 * @param {string|string[]} requiredRole - Role única ou array de roles permitidas
 */
function ProtectedRoute({ children, requiredRole = null }) {
    const authenticated = isAuthenticated();

    if (!authenticated) {
        // Redireciona para login se não estiver autenticado
        return <Navigate to="/login" replace />;
    }

    // Se uma role específica for requerida, verifica
    if (requiredRole) {
        const hasAccess = Array.isArray(requiredRole) 
            ? hasAnyRole(...requiredRole)
            : hasRole(requiredRole);
            
        if (!hasAccess) {
            const rolesStr = Array.isArray(requiredRole) ? requiredRole.join(' ou ') : requiredRole;
            console.warn(`⚠️ Acesso negado: Role(s) ${rolesStr} requerida(s)`);
            return <Navigate to="/home" replace />;
        }
    }

    // Renderiza o componente filho se estiver autenticado
    return children;
}

export default ProtectedRoute;

