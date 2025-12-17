import React from 'react';
import { FaShoppingBag, FaCalendarAlt, FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useOrder } from '../../contexts/OrderContext';
import './Pedidos.css';

export default function Pedidos() {
    const { orders } = useOrder();

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

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Concluído':
                return <FaCheckCircle className="status-icon status-completed" />;
            case 'Pendente':
                return <FaClock className="status-icon status-pending" />;
            case 'Cancelado':
                return <FaTimesCircle className="status-icon status-cancelled" />;
            default:
                return <FaClock className="status-icon status-pending" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Concluído':
                return '#4caf50';
            case 'Pendente':
                return '#f0e000';
            case 'Cancelado':
                return '#f44336';
            default:
                return '#f0e000';
        }
    };

    if (orders.length === 0) {
        return (
            <div className="pedidos-empty-container">
                <div className="pedidos-empty-content">
                    <FaShoppingBag className="pedidos-empty-icon" />
                    <h1 className="pedidos-empty-title">
                        Nenhum pedido encontrado
                    </h1>
                    <p className="pedidos-empty-text">
                        Você ainda não realizou nenhum pedido.
                    </p>
                    <Link to="/home" className="pedidos-empty-button">
                        Ver Produtos
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="pedidos-container">
            <div className="pedidos-content">
                <div className="pedidos-header">
                    <h1 className="pedidos-title">
                        Meus Pedidos
                    </h1>
                    <span className="pedidos-count">
                        {orders.length} {orders.length === 1 ? 'pedido' : 'pedidos'}
                    </span>
                </div>

                <div className="pedidos-list">
                    {orders.map((order) => (
                        <div key={order.id} className="pedido-card">
                            <div className="pedido-header">
                                <div className="pedido-info">
                                    <div className="pedido-id">
                                        <FaShoppingBag /> Pedido #{order.id.slice(-8)}
                                    </div>
                                    <div className="pedido-date">
                                        <FaCalendarAlt /> {formatDate(order.date)}
                                    </div>
                                </div>
                                <div className="pedido-status-badge" style={{ color: getStatusColor(order.status) }}>
                                    {getStatusIcon(order.status)}
                                    <span>{order.status}</span>
                                </div>
                            </div>

                            <div className="pedido-items">
                                <h3 className="pedido-items-title">Itens do Pedido:</h3>
                                <div className="pedido-items-list">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="pedido-item">
                                            <img 
                                                src={item.imageUrl} 
                                                alt={item.title}
                                                className="pedido-item-image"
                                                draggable="false"
                                                onDragStart={(e) => e.preventDefault()}
                                                onContextMenu={(e) => e.preventDefault()}
                                            />
                                            <div className="pedido-item-details">
                                                <h4 className="pedido-item-title">{item.title}</h4>
                                                <div className="pedido-item-info">
                                                    <span className="pedido-item-quantity">
                                                        Quantidade: {item.quantity}
                                                    </span>
                                                    <span className="pedido-item-price">
                                                        R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pedido-footer">
                                <div className="pedido-total">
                                    <span className="pedido-total-label">Total do Pedido:</span>
                                    <span className="pedido-total-value">
                                        R$ {order.total.toFixed(2).replace('.', ',')}
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

