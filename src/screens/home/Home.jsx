import React, { useState, useEffect, useCallback } from 'react';
import ResponsiveGrid from '../../responsiveGrid/ResponsiveGrid';
import { api } from '../../services/api';
import { FaFilter } from 'react-icons/fa';
import './Home.css';

const CATEGORIES = [
    { value: 'all', label: 'Todos' },
    { value: 'ELECTRONICS', label: 'Eletrônicos' },
    { value: 'BOOKS', label: 'Livros' },
    { value: 'CLOTHING', label: 'Roupas' },
    { value: 'HOME_APPLIANCES', label: 'Eletrodomésticos' },
    { value: 'TOYS', label: 'Brinquedos' },
    { value: 'SPORTS', label: 'Esportes' },
    { value: 'BEAUTY', label: 'Beleza' },
    { value: 'AUTOMOTIVE', label: 'Automotivo' }
];

function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');

    const loadProducts = useCallback(async (category = 'all') => {
        try {
            setLoading(true);
            setError(null);
            
            let endpoint = '/api/products';
            if (category !== 'all') {
                endpoint = `/api/products/category/${category}`;
            }
            
            const data = await api.get(endpoint);
            setProducts(data || []);
        } catch (err) {
            setError(err.message || 'Erro ao carregar produtos');
            console.error("Erro ao buscar produtos:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadProducts(selectedCategory);
    }, [selectedCategory, loadProducts]);

    function handleProductSelect(product) {
        alert(`Clicou no produto: ${product.title}`);
    }

    return (
        <div className="home-container">
            {loading ? (
                <div className="products-wrapper-home">
                    <div className="loading-container-home">
                        <div className="loading-spinner-home"></div>
                        <p>Carregando produtos...</p>
                    </div>
                </div>
            ) : error ? (
                <div className="products-wrapper-home">
                    <div className="error-container-home">
                        <p className="error-message-home">Erro: {error}</p>
                        <button 
                            className="retry-button-home" 
                            onClick={() => loadProducts(selectedCategory)}
                        >
                            Tentar Novamente
                        </button>
                    </div>
                </div>
            ) : (
                <div className="products-wrapper-home">
                    {/* Filtros de Categoria */}
                    <div className="filters-container-home">
                        <div className="filters-header-home">
                            <FaFilter /> <span>Filtrar por Categoria</span>
                        </div>
                        <div className="filters-buttons-home">
                            {CATEGORIES.map(category => (
                                <button
                                    key={category.value}
                                    className={`filter-btn-home ${selectedCategory === category.value ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(category.value)}
                                    disabled={loading}
                                >
                                    {category.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {products.length > 0 ? (
                        <ResponsiveGrid
                            productList={products}
                            onProductSelect={handleProductSelect}
                            title="Nossos Produtos"
                        />
                    ) : (
                        <div className="empty-state-home">
                            <div className="empty-icon-home">
                                <FaFilter />
                            </div>
                            <h3>Nenhum produto encontrado</h3>
                            <p>
                                {selectedCategory === 'all' 
                                    ? 'Não há produtos disponíveis no momento.' 
                                    : `Não há produtos na categoria "${CATEGORIES.find(c => c.value === selectedCategory)?.label}".`}
                            </p>
                            {selectedCategory !== 'all' && (
                                <button 
                                    className="btn-clear-filter-home" 
                                    onClick={() => setSelectedCategory('all')}
                                >
                                    Ver Todos os Produtos
                                </button>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Home;