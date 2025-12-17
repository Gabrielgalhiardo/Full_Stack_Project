import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ListaColaboradores.css';
import { api } from '../../services/api';
import { FaUsers, FaUserPlus, FaTrash, FaEye, FaBan, FaCheckCircle, FaFilter } from 'react-icons/fa';

function ListaColaboradores() {
    const navigate = useNavigate();
    const [collaborators, setCollaborators] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCollaborator, setSelectedCollaborator] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [filter, setFilter] = useState('active'); // 'active', 'inactive', 'all'

    useEffect(() => {
        loadCollaborators(filter);
    }, [filter]);

    const loadCollaborators = async (filterType = 'active') => {
        try {
            setLoading(true);
            let endpoint = '/api/collaborators';
            
            // Define o endpoint baseado no filtro
            // Baseado no CollaboratorService:
            // - findAllActive() -> GET /api/collaborators (padrão)
            // - findAllInactive() -> GET /api/collaborators/inactive
            // - findAllOrderedByActive() -> GET /api/collaborators/all
            if (filterType === 'inactive') {
                endpoint = '/api/collaborators/inactive';
            } else if (filterType === 'all') {
                endpoint = '/api/collaborators/all';
            }
            // 'active' usa o endpoint padrão /api/collaborators (findAllActive)
            
            const data = await api.get(endpoint);
            console.log(`📋 Colaboradores carregados (${filterType}):`, data);
            setCollaborators(data || []);
        } catch (err) {
            console.error("❌ Erro ao carregar colaboradores:", err);
            setError(err.message || 'Erro ao carregar colaboradores');
        } finally {
            setLoading(false);
        }
    };

    const handleViewDetails = async (collaboratorId) => {
        try {
            const data = await api.get(`/api/collaborators/${collaboratorId}`);
            setSelectedCollaborator(data);
            setShowDetailsModal(true);
        } catch (err) {
            console.error("❌ Erro ao buscar detalhes do colaborador:", err);
            alert(err.message || 'Erro ao buscar detalhes do colaborador');
        }
    };

    const handleDeactivate = async (collaboratorId) => {
        if (!window.confirm('Tem certeza que deseja desativar este colaborador? Ele não poderá mais fazer login no sistema.')) {
            return;
        }

        try {
            await api.patch(`/api/collaborators/${collaboratorId}/deactivate`);
            console.log('✅ Colaborador desativado com sucesso');
            loadCollaborators(filter); // Recarrega a lista mantendo o filtro
        } catch (err) {
            console.error("❌ Erro ao desativar colaborador:", err);
            alert(err.message || 'Erro ao desativar colaborador');
        }
    };

    const handleActivate = async (collaboratorId) => {
        try {
            await api.patch(`/api/collaborators/${collaboratorId}/activate`);
            console.log('✅ Colaborador reativado com sucesso');
            loadCollaborators(filter); // Recarrega a lista mantendo o filtro
        } catch (err) {
            console.error("❌ Erro ao reativar colaborador:", err);
            alert(err.message || 'Erro ao reativar colaborador');
        }
    };

    const handleDelete = async (collaboratorId) => {
        if (!window.confirm('⚠️ ATENÇÃO: Esta ação é IRREVERSÍVEL!\n\nTem certeza que deseja deletar permanentemente este colaborador? Todos os dados serão perdidos.')) {
            return;
        }

        try {
            await api.delete(`/api/collaborators/${collaboratorId}`);
            console.log('✅ Colaborador deletado com sucesso');
            loadCollaborators(filter); // Recarrega a lista mantendo o filtro
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
                    <button className="retry-button" onClick={() => loadCollaborators(filter)}>
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
                </div>
            </header>

            {/* Filtros */}
            <div className="filters-container">
                <div className="filters-header">
                    <FaFilter /> <span>Filtros</span>
                </div>
                <div className="filters-buttons">
                    <button 
                        className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
                        onClick={() => setFilter('active')}
                    >
                        <FaCheckCircle /> Ativos
                    </button>
                    <button 
                        className={`filter-btn ${filter === 'inactive' ? 'active' : ''}`}
                        onClick={() => setFilter('inactive')}
                    >
                        <FaBan /> Inativos
                    </button>
                    <button 
                        className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        <FaUsers /> Todos
                    </button>
                </div>
            </div>

            <main className="lista-colaboradores-content">
                {collaborators.length > 0 ? (
                    <div className="table-container">
                        {/* Tabela para desktop */}
                        <table className="collaborators-table">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {collaborators.map(collaborator => (
                                    <tr key={collaborator.id}>
                                        <td className="collaborator-name-cell">
                                            <div className="name-content">
                                                <div className="collaborator-avatar-small">
                                                    {collaborator.name?.charAt(0).toUpperCase() || 'U'}
                                                </div>
                                                <span>{collaborator.name || 'Sem nome'}</span>
                                            </div>
                                        </td>
                                        <td>{collaborator.email || 'Sem email'}</td>
                                        <td>
                                            <span className={`status-badge ${collaborator.active ? 'active' : 'inactive'}`}>
                                                {collaborator.active ? (
                                                    <>
                                                        <FaCheckCircle /> Ativo
                                                    </>
                                                ) : (
                                                    <>
                                                        <FaBan /> Inativo
                                                    </>
                                                )}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="table-actions">
                                                <button 
                                                    className="btn-view"
                                                    onClick={() => handleViewDetails(collaborator.id)}
                                                    title="Ver detalhes"
                                                >
                                                    <FaEye /> Detalhes
                                                </button>
                                                {collaborator.active ? (
                                                    <button 
                                                        className="btn-deactivate"
                                                        onClick={() => handleDeactivate(collaborator.id)}
                                                        title="Desativar colaborador"
                                                    >
                                                        <FaBan /> Desativar
                                                    </button>
                                                ) : (
                                                    <button 
                                                        className="btn-activate"
                                                        onClick={() => handleActivate(collaborator.id)}
                                                        title="Reativar colaborador"
                                                    >
                                                        <FaCheckCircle /> Reativar
                                                    </button>
                                                )}
                                                <button 
                                                    className="btn-delete"
                                                    onClick={() => handleDelete(collaborator.id)}
                                                    title="Deletar permanentemente"
                                                >
                                                    <FaTrash /> Deletar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Cards para mobile */}
                        <div className="collaborators-cards">
                            {collaborators.map(collaborator => (
                                <div key={collaborator.id} className="collaborator-card">
                                    <div className="collaborator-card-header">
                                        <div className="collaborator-avatar-small">
                                            {collaborator.name?.charAt(0).toUpperCase() || 'U'}
                                        </div>
                                        <div>
                                            <div className="collaborator-card-value" style={{ fontWeight: 600 }}>
                                                {collaborator.name || 'Sem nome'}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="collaborator-card-body">
                                        <div className="collaborator-card-item">
                                            <div className="collaborator-card-label">Email</div>
                                            <div className="collaborator-card-value">{collaborator.email || 'Sem email'}</div>
                                        </div>
                                        <div className="collaborator-card-item">
                                            <div className="collaborator-card-label">Status</div>
                                            <span className={`status-badge ${collaborator.active ? 'active' : 'inactive'}`}>
                                                {collaborator.active ? (
                                                    <>
                                                        <FaCheckCircle /> Ativo
                                                    </>
                                                ) : (
                                                    <>
                                                        <FaBan /> Inativo
                                                    </>
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="collaborator-card-actions">
                                        <button 
                                            className="btn-view"
                                            onClick={() => handleViewDetails(collaborator.id)}
                                            title="Ver detalhes"
                                        >
                                            <FaEye /> Detalhes
                                        </button>
                                        {collaborator.active ? (
                                            <button 
                                                className="btn-deactivate"
                                                onClick={() => handleDeactivate(collaborator.id)}
                                                title="Desativar colaborador"
                                            >
                                                <FaBan /> Desativar
                                            </button>
                                        ) : (
                                            <button 
                                                className="btn-activate"
                                                onClick={() => handleActivate(collaborator.id)}
                                                title="Reativar colaborador"
                                            >
                                                <FaCheckCircle /> Reativar
                                            </button>
                                        )}
                                        <button 
                                            className="btn-delete"
                                            onClick={() => handleDelete(collaborator.id)}
                                            title="Deletar permanentemente"
                                        >
                                            <FaTrash /> Deletar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="table-container">
                        <div className="empty-state">
                            <div className="empty-icon">
                                <FaUsers />
                            </div>
                            <h3>
                                {filter === 'active' && 'Nenhum colaborador ativo'}
                                {filter === 'inactive' && 'Nenhum colaborador inativo'}
                                {filter === 'all' && 'Nenhum colaborador cadastrado'}
                            </h3>
                            <p>
                                {filter === 'active' && 'Não há colaboradores ativos no momento.'}
                                {filter === 'inactive' && 'Não há colaboradores inativos no momento.'}
                                {filter === 'all' && 'Comece cadastrando seu primeiro colaborador!'}
                            </p>
                            {filter === 'all' && (
                                <button 
                                    className="btn-primary" 
                                    onClick={() => navigate('/admin/cadastro-colaborador')}
                                >
                                    <FaUserPlus /> Cadastrar Primeiro Colaborador
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </main>

            {/* Modal de Detalhes */}
            {showDetailsModal && selectedCollaborator && (
                <div className="modal-overlay" onClick={() => setShowDetailsModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Detalhes do Colaborador</h2>
                            <button className="modal-close" onClick={() => setShowDetailsModal(false)}>
                                ×
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="detail-item">
                                <strong>ID:</strong>
                                <span>{selectedCollaborator.id}</span>
                            </div>
                            <div className="detail-item">
                                <strong>Nome:</strong>
                                <span>{selectedCollaborator.name || 'N/A'}</span>
                            </div>
                            <div className="detail-item">
                                <strong>Email:</strong>
                                <span>{selectedCollaborator.email || 'N/A'}</span>
                            </div>
                            <div className="detail-item">
                                <strong>Status:</strong>
                                <span className={`status-badge ${selectedCollaborator.active ? 'active' : 'inactive'}`}>
                                    {selectedCollaborator.active ? (
                                        <>
                                            <FaCheckCircle /> Ativo
                                        </>
                                    ) : (
                                        <>
                                            <FaBan /> Inativo
                                        </>
                                    )}
                                </span>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn-secondary" onClick={() => setShowDetailsModal(false)}>
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ListaColaboradores;

