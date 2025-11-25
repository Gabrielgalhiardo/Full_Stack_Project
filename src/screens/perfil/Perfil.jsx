// src/screens/perfil/Perfil.js
import React, { useState, useEffect } from 'react';
import './Perfil.css';
import { FaPlus, FaCog } from 'react-icons/fa';
import { api } from '../../services/api';
import ProfileProductCard from '../../components/ProfileProductCard';
import ProductForm from '../../components/ProductForm';


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

        // Busca os produtos do colaborador autenticado
        api.get('/api/products/my-products')
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


    // --- FUNÇÕES DE MANIPULAÇÃO DOS MODAIS ---
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

    // --- FUNÇÕES DE LÓGICA (CRUD) ---
    const handleProductSubmit = async (formData) => { 
        // Converte o preço corretamente (substitui vírgula por ponto se necessário)
        const priceValue = typeof formData.price === 'string' 
            ? parseFloat(formData.price.replace(',', '.')) 
            : parseFloat(formData.price);
        
        // Verifica se imageUrl é base64 (muito grande para o banco)
        let imageUrl = formData.imageUrl;
        if (imageUrl && imageUrl.startsWith('data:image')) {
            console.warn('⚠️ Imagem base64 detectada. Base64 é muito grande para o banco de dados.');
            console.warn('💡 Por favor, use uma URL de imagem válida.');
            // Não permite enviar base64
            setError('Por favor, insira uma URL de imagem válida. Base64 não é suportado.');
            return;
        }
        
        const productData = {
            title: formData.title,
            description: formData.description,
            price: priceValue,
            quantity: parseInt(formData.quantity),
            imageUrl: imageUrl,
            productStatus: formData.productStatus,
            productCategory: formData.productCategory
        };

        // Log do produto antes de enviar
        console.log('📋 Produto a ser enviado:', JSON.stringify(productData, null, 2));
        console.log('🔍 Tipo de operação:', isEditing ? 'EDITAR' : 'CRIAR');
        console.log('💰 Preço convertido:', priceValue, '(tipo:', typeof priceValue, ')');
        console.log('📊 Quantidade convertida:', parseInt(formData.quantity), '(tipo:', typeof parseInt(formData.quantity), ')');

        try {
            if (isEditing) {
                // Atualizar produto existente - PUT /api/products/{id}
                console.log('✏️ Atualizando produto ID:', selectedProduct.id);
                const response = await api.put(`/api/products/${selectedProduct.id}`, productData);
                console.log('✅ Produto atualizado com sucesso:', response);
            } else {
                // Criar novo produto - POST /api/products
                console.log('➕ Criando novo produto...');
                const response = await api.post('/api/products', productData);
                console.log('✅ Produto criado com sucesso:', response);
            }
            
            // Recarregar lista de produtos - GET /api/products/my-products
            const data = await api.get('/api/products/my-products');
            setProducts(data);
            
            handleCloseModals();
        } catch (err) {
            console.error("❌ Erro ao salvar produto:", err);
            console.error("📝 Detalhes do erro:", err.response?.data || err.message);
            setError(err.message || 'Erro ao salvar produto');
        }
    };

    const handleDeleteConfirm = async () => {
        try {
            // Deletar produto - DELETE /api/products/{id}
            await api.delete(`/api/products/${selectedProduct.id}`);
            
            // Recarregar lista de produtos
            const data = await api.get('/api/products/my-products');
            setProducts(data);
            
            handleCloseModals();
        } catch (err) {
            console.error("Erro ao deletar produto:", err);
            setError(err.message || 'Erro ao deletar produto');
        }
    };
    const handleSettingsSubmit = (e) => { e.preventDefault(); handleCloseModals(); };
    

    if (loading) {
        return (
            <div className="perfil-container">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Carregando perfil...</p>
                </div>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="perfil-container">
                <div className="error-container">
                    <p className="error-message">Erro: {error}</p>
                    <button className="retry-button" onClick={() => window.location.reload()}>
                        Tentar Novamente
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="perfil-container">
            <header className="perfil-header">
                <div className="perfil-info">
                    <div className="perfil-texto">
                        <h1 className="perfil-nome">{user.name}</h1>
                        <p className="perfil-email">{user.email}</p>
                    </div>
                    <span className="perfil-badge">Colaborador</span>
                </div>
                <div className="perfil-actions">
                    <button className="action-button primary" onClick={handleOpenAddModal}>
                        <FaPlus /> Adicionar Produto
                    </button>
                    <button className="action-button secondary" onClick={handleOpenSettingsModal}>
                        <FaCog /> Configurações
                    </button>
                </div>
            </header>

            <main className="perfil-main-content">
                <div className="section-header">
                    <h2>Meus Produtos</h2>
                    <span className="product-count">{products.length} {products.length === 1 ? 'produto' : 'produtos'}</span>
                </div>
                
                {products.length > 0 ? (
                    <div className="products-grid">
                        {products.map(product => (
                            <ProfileProductCard
                                key={product.id}
                                product={product}
                                onEdit={handleOpenEditModal}
                                onDelete={handleOpenDeleteModal}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <div className="empty-icon">
                            <FaPlus />
                        </div>
                        <h3>Nenhum produto cadastrado</h3>
                        <p>Comece adicionando seu primeiro produto!</p>
                        <button className="action-button primary" onClick={handleOpenAddModal}>
                            <FaPlus /> Adicionar Primeiro Produto
                        </button>
                    </div>
                )}
            </main>

            {/* --- SEÇÃO DE MODAIS COM SUAS CLASSES CSS --- */}

            {(isAddEditModalOpen || isSettingsModalOpen || isDeleteModalOpen) && (
                <div className="modal-overlay-perfil" onClick={handleCloseModals}>
                    
                    {/* MODAL 1: Adicionar/Editar Produto */}
                    {isAddEditModalOpen && (
                        <div className="modal-detalhes" onClick={(e) => e.stopPropagation()}>
                            <h2>{isEditing ? 'Editar Produto' : 'Publicar Produto'}</h2>
                            <ProductForm
                                product={selectedProduct}
                                isEditing={isEditing}
                                onSubmit={handleProductSubmit}
                                onCancel={handleCloseModals}
                            />
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