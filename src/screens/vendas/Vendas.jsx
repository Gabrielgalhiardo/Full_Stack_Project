import React, { useState, useEffect, useMemo } from 'react';
import { FaChartLine, FaDollarSign, FaShoppingBag, FaCalendarAlt, FaBox } from 'react-icons/fa';
import { api } from '../../services/api';
import { useOrder } from '../../contexts/OrderContext';
import './Vendas.css';

export default function Vendas() {
    const { getSalesByCollaborator, orders } = useOrder();
    const [myProducts, setMyProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [collaboratorId, setCollaboratorId] = useState(null);

    useEffect(() => {
        // Busca os produtos do colaborador para obter o ID
        api.get('/api/products/my-products')
            .then(data => {
                setMyProducts(data);
                // Tenta obter o collaboratorId do primeiro produto
                // Se não tiver, usa o ID do produto como fallback (para identificar produtos do colaborador)
                if (data && data.length > 0) {
                    const firstProduct = data[0];
                    // Tenta diferentes campos possíveis
                    const id = firstProduct.collaboratorId || 
                              firstProduct.collaborator?.id || 
                              firstProduct.id; // Fallback: usa o ID do produto
                    setCollaboratorId(id);
                }
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
                console.error("Erro ao buscar produtos:", err);
            });
    }, []);

    // Obtém as vendas do colaborador
    const sales = useMemo(() => {
        if (!collaboratorId || !myProducts.length) return [];
        
        // Obtém todos os IDs dos produtos do colaborador
        const myProductIds = myProducts.map(p => p.id);
        
        // Filtra vendas que contêm produtos do colaborador
        const allSales = getSalesByCollaborator(collaboratorId);
        
        // Se não houver vendas por collaboratorId, filtra por productId
        if (allSales.length === 0) {
            const salesByProduct = [];
            orders.forEach(order => {
                order.items.forEach(item => {
                    if (myProductIds.includes(item.id)) {
                        salesByProduct.push({
                            orderId: order.id,
                            orderDate: order.date,
                            orderStatus: order.status,
                            productId: item.id,
                            productTitle: item.title,
                            productImage: item.imageUrl,
                            quantity: item.quantity,
                            unitPrice: item.price,
                            totalPrice: item.price * item.quantity
                        });
                    }
                });
            });
            return salesByProduct;
        }
        
        return allSales;
    }, [collaboratorId, myProducts, getSalesByCollaborator]);

    // Calcula estatísticas
    const stats = useMemo(() => {
        const totalSales = sales.length;
        const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalPrice, 0);
        const totalItems = sales.reduce((sum, sale) => sum + sale.quantity, 0);
        
        return {
            totalSales,
            totalRevenue,
            totalItems
        };
    }, [sales]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatCurrency = (value) => {
        return `R$ ${value.toFixed(2).replace('.', ',')}`;
    };

    if (loading) {
        return (
            <div className="vendas-container">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Carregando vendas...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="vendas-container">
                <div className="error-container">
                    <p className="error-message">Erro: {error}</p>
                    <button className="retry-button" onClick={() => window.location.reload()}>
                        Tentar Novamente
                    </button>
                </div>
            </div>
        );
    }

    if (sales.length === 0) {
        return (
            <div className="vendas-empty-container">
                <div className="vendas-empty-content">
                    <FaChartLine className="vendas-empty-icon" />
                    <h1 className="vendas-empty-title">
                        Nenhuma venda encontrada
                    </h1>
                    <p className="vendas-empty-text">
                        Você ainda não teve nenhuma venda dos seus produtos.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="vendas-container">
            <div className="vendas-content">
                <div className="vendas-header">
                    <h1 className="vendas-title">
                        Minhas Vendas
                    </h1>
                </div>

                {/* Estatísticas */}
                <div className="vendas-stats">
                    <div className="stat-card">
                        <div className="stat-icon">
                            <FaShoppingBag />
                        </div>
                        <div className="stat-info">
                            <span className="stat-label">Total de Vendas</span>
                            <span className="stat-value">{stats.totalSales}</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">
                            <FaDollarSign />
                        </div>
                        <div className="stat-info">
                            <span className="stat-label">Receita Total</span>
                            <span className="stat-value">{formatCurrency(stats.totalRevenue)}</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">
                            <FaBox />
                        </div>
                        <div className="stat-info">
                            <span className="stat-label">Itens Vendidos</span>
                            <span className="stat-value">{stats.totalItems}</span>
                        </div>
                    </div>
                </div>

                {/* Lista de Vendas */}
                <div className="vendas-list">
                    <h2 className="vendas-list-title">Histórico de Vendas</h2>
                    {sales.map((sale, index) => (
                        <div key={`${sale.orderId}-${sale.productId}-${index}`} className="venda-card">
                            <div className="venda-header">
                                <div className="venda-product-info">
                                    <img 
                                        src={sale.productImage} 
                                        alt={sale.productTitle}
                                        className="venda-product-image"
                                        draggable="false"
                                        onDragStart={(e) => e.preventDefault()}
                                        onContextMenu={(e) => e.preventDefault()}
                                    />
                                    <div className="venda-product-details">
                                        <h3 className="venda-product-title">{sale.productTitle}</h3>
                                        <div className="venda-product-meta">
                                            <span className="venda-quantity">
                                                Quantidade: {sale.quantity}
                                            </span>
                                            <span className="venda-unit-price">
                                                Preço unitário: {formatCurrency(sale.unitPrice)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="venda-total">
                                    <span className="venda-total-label">Total</span>
                                    <span className="venda-total-value">
                                        {formatCurrency(sale.totalPrice)}
                                    </span>
                                </div>
                            </div>
                            <div className="venda-footer">
                                <div className="venda-order-info">
                                    <span className="venda-order-id">
                                        <FaShoppingBag /> Pedido #{sale.orderId.slice(-8)}
                                    </span>
                                    <span className="venda-order-date">
                                        <FaCalendarAlt /> {formatDate(sale.orderDate)}
                                    </span>
                                    <span className={`venda-order-status venda-status-${sale.orderStatus.toLowerCase()}`}>
                                        {sale.orderStatus}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

