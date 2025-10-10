// src/screens/perfil/Perfil.js
import React, { useState, useEffect } from 'react';
import './Perfil.css';
import { FaPlus, FaCog, FaEdit, FaTrash } from 'react-icons/fa';
import Box from '@mui/material/Box'; // MUDANÇA: Importando o Box para o grid

// Componente de Card de Produto para o Perfil (com botões de editar/deletar)
function ProfileProductCard({ product, onEdit, onDelete }) {
    return (
        <div className="produto-card-perfil">
            <img src={product.imageUrl} alt={product.title} className="produto-imagem-perfil" />
            <div className="produto-card-body-perfil">
                <h3 className="produto-titulo-perfil">{product.title}</h3>
                <p className="produto-preco-perfil">R$ {product.price.toFixed(2).replace('.', ',')}</p>
                <p className="produto-descricao-perfil">{product.description}</p>
                <div className="produto-card-actions-perfil">
                    <button onClick={() => onEdit(product)} className="produto-action-btn edit-btn">
                        <FaEdit /> Editar
                    </button>
                    <button onClick={() => onDelete(product)} className="produto-action-btn delete-btn">
                        <FaTrash /> Deletar
                    </button>
                </div>
            </div>
        </div>
    );
}


function Perfil() {
    // --- ESTADOS DO COMPONENTE ---
    const [user, setUser] = useState({ name: 'Carregando...', email: '', avatar: '' });
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isAddEditModalOpen, setAddEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const userId = 1; // ID do usuário logado (exemplo)
        
        // Simulação de busca de usuário
        setUser({ name: 'Gabriel', email: 'gabriel.dev@email.com', avatar: `https://i.pravatar.cc/150?u=gabriel` });

        fetch(`http://localhost:8080/products/active`) // <<< AJUSTE ESTA URL
            .then(response => {
                if (!response.ok) throw new Error('Não foi possível buscar seus produtos.');
                return response.json();
            })
            .then(data => {
                setProducts(data);
            })
            .catch(err => {
                setError(err.message);
                console.error("Erro na API:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);


    // --- FUNÇÕES DE MANIPULAÇÃO DOS MODAIS (permanecem as mesmas) ---
    const handleOpenAddModal = () => {
        setIsEditing(false);
        setSelectedProduct(null);
        setAddEditModalOpen(true);
    };

    const handleOpenEditModal = (product) => {
        setIsEditing(true);
        setSelectedProduct(product);
        setAddEditModalOpen(true);
    };
    
    const handleOpenDeleteModal = (product) => {
        setSelectedProduct(product);
        setDeleteModalOpen(true);
    };

    const handleOpenSettingsModal = () => {
        setSettingsModalOpen(true);
    };
    
    const handleCloseModals = () => {
        setAddEditModalOpen(false);
        setDeleteModalOpen(false);
        setSettingsModalOpen(false);
        setSelectedProduct(null);
    };

    // --- FUNÇÕES DE LÓGICA (CRUD - precisam ser implementadas com a API) ---
    const handleProductSubmit = (e) => { e.preventDefault(); handleCloseModals(); };
    const handleDeleteConfirm = () => { handleCloseModals(); };
    const handleSettingsSubmit = (e) => { e.preventDefault(); handleCloseModals(); };
    

    if (loading) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Carregando perfil...</p>;
    if (error) return <p style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>Erro: {error}</p>;


    return (
        <div className="perfil-container">
            <header className="perfil-header">
                <div className="perfil-info">
                    <img src={user.avatar} alt="Avatar" className="perfil-avatar" />
                    <div className="perfil-texto">
                        <h1>{user.name}</h1>
                        <p>{user.email}</p>
                    </div>
                </div>
                <div className="perfil-actions">
                    <button className="action-button" onClick={handleOpenAddModal}><FaPlus /> Adicionar Produto</button>
                    <button className="action-button secondary" onClick={handleOpenSettingsModal}><FaCog /> Configurações</button>
                </div>
            </header>

            <main className="perfil-main-content">
                <h2>Meus Produtos Cadastrados</h2>
                {/* MUDANÇA: Usando o Box e o novo Card */}
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                    gap: '24px',
                }}>
                    {products.length > 0 ? (
                        products.map(product => (
                            <ProfileProductCard
                                key={product.id}
                                product={product}
                                onEdit={handleOpenEditModal}
                                onDelete={handleOpenDeleteModal}
                            />
                        ))
                    ) : (
                        <p className="sem-produtos">Você ainda não cadastrou nenhum produto.</p>
                    )}
                </Box>
            </main>

            {/* --- SEÇÃO DE MODAIS COM SUAS CLASSES CSS --- */}

            {(isAddEditModalOpen || isSettingsModalOpen || isDeleteModalOpen) && (
                <div className="modal-overlay-perfil" onClick={handleCloseModals}>
                    
                    {/* MODAL 1: Adicionar/Editar Produto */}
                    {isAddEditModalOpen && (
                        // MUDANÇA: Usando sua classe .modal-detalhes
                        <div className="modal-detalhes" onClick={(e) => e.stopPropagation()}>
                            <h2>{isEditing ? 'Editar Produto' : 'Adicionar Novo Produto'}</h2>
                            <form onSubmit={handleProductSubmit} className='modal-form'>
                                {/* Campos do formulário */}
                                <input type="text" placeholder="Nome" defaultValue={isEditing ? selectedProduct.title : ''} required />
                                <textarea placeholder="Descrição" defaultValue={isEditing ? selectedProduct.description : ''} required></textarea>
                                <input type="number" placeholder="Preço" defaultValue={isEditing ? selectedProduct.price : ''} required />
                                <input type="text" placeholder="URL da Imagem" defaultValue={isEditing ? selectedProduct.imageUrl : ''} required />
                                <div className="modal-actions">
                                    <button type="button" className="btn-cancel" onClick={handleCloseModals}>Cancelar</button>
                                    <button type="submit" className="btn-confirm">{isEditing ? 'Salvar' : 'Adicionar'}</button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* MODAL 2: Deletar Produto */}
                    {isDeleteModalOpen && (
                        // MUDANÇA: Usando sua classe .modal-carrinho
                        <div className="modal-carrinho" onClick={(e) => e.stopPropagation()}>
                            <h2>Confirmar Exclusão</h2>
                            <p>Deseja deletar "<strong>{selectedProduct?.title}</strong>"?</p>
                             <div className="modal-actions">
                                <button type="button" className="btn-cancel" onClick={handleCloseModals}>Cancelar</button>
                                <button type="button" className="btn-confirm delete" onClick={handleDeleteConfirm}>Deletar</button>
                            </div>
                        </div>
                    )}

                     {/* MODAL 3: Configurações */}
                    {isSettingsModalOpen && (
                        // MUDANÇA: Usando sua classe .modal-carrinho para o modal menor
                        <div className="modal-carrinho" onClick={(e) => e.stopPropagation()}>
                            <h2>Configurações</h2>
                             <form onSubmit={handleSettingsSubmit} className='modal-form'>
                                <input type="text" defaultValue={user.name} required />
                                <input type="email" defaultValue={user.email} required />
                                <div className="modal-actions">
                                    <button type="button" className="btn-cancel" onClick={handleCloseModals}>Cancelar</button>
                                    <button type="submit" className="btn-confirm">Salvar</button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Perfil;