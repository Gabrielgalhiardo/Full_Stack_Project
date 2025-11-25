import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ListaColaboradores.css';
import { api } from '../../services/api';
import { FaUsers, FaUserPlus, FaTrash, FaEdit, FaArrowLeft } from 'react-icons/fa';

function ListaColaboradores() {
    const navigate = useNavigate();
    const [collaborators, setCollaborators] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadCollaborators();
    }, []);

    const loadCollaborators = async () => {
        try {
            setLoading(true);
            // Endpoint para listar colaboradores (ajuste conforme sua API)
            const data = await api.get('/api/collaborators');
            console.log('📋 Colaboradores carregados:', data);
            setCollaborators(data || []);
        } catch (err) {
            console.error("❌ Erro ao carregar colaboradores:", err);
            setError(err.message || 'Erro ao carregar colaboradores');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (collaboratorId) => {
        if (!window.confirm('Tem certeza que deseja excluir este colaborador?')) {
            return;
        }

        try {
            // Endpoint para deletar colaborador (ajuste conforme sua API)
            await api.delete(`/api/collaborators/${collaboratorId}`);
            console.log('✅ Colaborador deletado com sucesso');
            loadCollaborators(); // Recarrega a lista
        } catch (err) {
            console.error("❌ Erro ao deletar colaborador:", err);
            alert(err.message || 'Erro ao deletar colaborador');
        }
    };

    if (loading) {
        return (
            <div className="lista-colaboradores-container">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Carregando colaboradores...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="lista-colaboradores-container">
                <div className="error-container">
                    <p className="error-message">Erro: {error}</p>
                    <button className="retry-button" onClick={loadCollaborators}>
                        Tentar Novamente
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="lista-colaboradores-container">
            <header className="lista-colaboradores-header">
                <div className="header-content">
                    <h1>
                        <FaUsers /> Colaboradores
                    </h1>
                    <span className="collaborator-count">
                        {collaborators.length} {collaborators.length === 1 ? 'colaborador' : 'colaboradores'}
                    </span>
                </div>
                <div className="header-actions">
                    <button 
                        className="btn-primary" 
                        onClick={() => navigate('/admin/cadastro-colaborador')}
                    >
                        <FaUserPlus /> Cadastrar Colaborador
                    </button>
                    <button 
                        className="btn-secondary" 
                        onClick={() => navigate(-1)}
                    >
                        <FaArrowLeft /> Voltar
                    </button>
                </div>
            </header>

            <main className="lista-colaboradores-content">
                {collaborators.length > 0 ? (
                    <div className="collaborators-grid">
                        {collaborators.map(collaborator => (
                            <div key={collaborator.id} className="collaborator-card">
                                <div className="collaborator-info">
                                    <div className="collaborator-avatar">
                                        {collaborator.name?.charAt(0).toUpperCase() || 'U'}
                                    </div>
                                    <div className="collaborator-details">
                                        <h3 className="collaborator-name">{collaborator.name || 'Sem nome'}</h3>
                                        <p className="collaborator-email">{collaborator.email || 'Sem email'}</p>
                                        {collaborator.role && (
                                            <span className="collaborator-role">{collaborator.role}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="collaborator-actions">
                                    <button 
                                        className="btn-edit"
                                        onClick={() => {
                                            // Implementar edição se necessário
                                            alert('Funcionalidade de edição em desenvolvimento');
                                        }}
                                    >
                                        <FaEdit /> Editar
                                    </button>
                                    <button 
                                        className="btn-delete"
                                        onClick={() => handleDelete(collaborator.id)}
                                    >
                                        <FaTrash /> Excluir
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <div className="empty-icon">
                            <FaUsers />
                        </div>
                        <h3>Nenhum colaborador cadastrado</h3>
                        <p>Comece cadastrando seu primeiro colaborador!</p>
                        <button 
                            className="btn-primary" 
                            onClick={() => navigate('/admin/cadastro-colaborador')}
                        >
                            <FaUserPlus /> Cadastrar Primeiro Colaborador
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}

export default ListaColaboradores;

