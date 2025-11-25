// src/services/api.js

import axios from 'axios';
import { getToken } from './authService';

const API_BASE_URL = 'http://localhost:8080';

// Criar instância do Axios
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para adicionar token de autenticação
axiosInstance.interceptors.request.use(
    (config) => {
        // Para endpoints de autenticação, não adiciona o token
        const isAuthEndpoint = config.url?.includes('/auth/');
        
        if (!isAuthEndpoint) {
            const token = getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
                console.log('Token enviado:', token.substring(0, 20) + '...');
            } else {
                console.warn('⚠️ Token não encontrado! A requisição será feita sem autenticação.');
            }
        }
        
        // Log da requisição
        console.log('📤 Requisição:', config.method?.toUpperCase(), config.url);
        if (config.data) {
            console.log('📦 Dados enviados:', config.data);
        }
        console.log('🔑 Headers:', config.headers);
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para tratar erros
axiosInstance.interceptors.response.use(
    (response) => {
        // Se a resposta não tiver conteúdo, retorna null
        if (response.status === 204 || !response.data) {
            return null;
        }
        return response.data;
    },
    (error) => {
        // Tratamento de erros
        if (error.response) {
            // Erro com resposta do servidor
            const errorMessage = error.response.data?.message || 
                                error.response.data?.error || 
                                `Erro: ${error.response.status}`;
            throw new Error(errorMessage);
        } else if (error.request) {
            // Erro de rede (sem resposta)
            throw new Error('Erro de conexão. Verifique sua internet.');
        } else {
            // Erro ao configurar a requisição
            throw new Error(error.message || 'Erro na requisição');
        }
    }
);

/**
 * Métodos HTTP simplificados usando Axios
 */
export const api = {
    get: (endpoint, config = {}) => 
        axiosInstance.get(endpoint, config),
    
    post: (endpoint, data, config = {}) => 
        axiosInstance.post(endpoint, data, config),
    
    put: (endpoint, data, config = {}) => 
        axiosInstance.put(endpoint, data, config),
    
    delete: (endpoint, config = {}) => 
        axiosInstance.delete(endpoint, config),
    
    patch: (endpoint, data, config = {}) => 
        axiosInstance.patch(endpoint, data, config),
};

export default api;


