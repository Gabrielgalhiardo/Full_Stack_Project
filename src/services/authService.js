// src/services/authService.js

const TOKEN_KEY = 'auth_token';

/**
 * Salva o token JWT no localStorage
 */
export const saveToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
};

/**
 * Obtém o token JWT do localStorage
 */
export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

/**
 * Remove o token JWT do localStorage (logout)
 */
export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
};

/**
 * Verifica se o usuário está autenticado (tem token)
 */
export const isAuthenticated = () => {
    return !!getToken();
};

/**
 * Decodifica o payload do JWT token
 */
export const decodeToken = () => {
    const token = getToken();
    if (!token) return null;

    try {
        // JWT tem formato: header.payload.signature
        const payload = token.split('.')[1];
        if (!payload) return null;

        // Decodifica base64
        const decodedPayload = JSON.parse(atob(payload));
        return decodedPayload;
    } catch (error) {
        console.error('Erro ao decodificar token:', error);
        return null;
    }
};

/**
 * Obtém a role do usuário do token JWT
 */
export const getUserRole = () => {
    const decoded = decodeToken();
    if (!decoded) return null;

    // Verifica diferentes possíveis campos de role
    // Spring Security pode retornar: role, authorities[].authority, ou roles[]
    const role = decoded.role || decoded.authorities?.[0]?.authority || decoded.roles?.[0] || null;
    
    return role;
};

/**
 * Verifica se o usuário tem uma role específica
 */
export const hasRole = (requiredRole) => {
    const userRole = getUserRole();
    if (!userRole) return false;

    // Remove o prefixo "ROLE_" se existir (Spring Security adiciona isso)
    const normalizedUserRole = userRole.replace('ROLE_', '').toUpperCase();
    const normalizedRequiredRole = requiredRole.replace('ROLE_', '').toUpperCase();

    return normalizedUserRole === normalizedRequiredRole;
};

/**
 * Verifica se o usuário é ADMIN
 */
export const isAdmin = () => {
    return hasRole('ADMIN');
};

/**
 * Verifica se o usuário é COLLABORATOR
 */
export const isCollaborator = () => {
    return hasRole('COLLABORATOR');
};

/**
 * Verifica se o usuário é USER
 */
export const isUser = () => {
    return hasRole('USER');
};

/**
 * Verifica se o usuário tem pelo menos uma das roles especificadas
 */
export const hasAnyRole = (...roles) => {
    return roles.some(role => hasRole(role));
};

/**
 * Obtém os headers de autenticação para usar nas requisições
 */
export const getAuthHeaders = () => {
    const token = getToken();
    return {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
    };
};

