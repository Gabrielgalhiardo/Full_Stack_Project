// Arquivo: /src/screens/carrinho/Carrinho.jsx

import React, { useMemo } from 'react';
import { FaTrash, FaShoppingCart, FaPlus, FaMinus } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './Carrinho.css';
import { useCart } from '../../contexts/CartContext';
import { useOrder } from '../../contexts/OrderContext';

export default function Carrinho() {
    const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
    const { createOrder } = useOrder();
    const navigate = useNavigate();

    // Função para remover um item do carrinho
    const handleRemoveItem = (itemId) => {
        removeFromCart(itemId);
    };

    // Função para aumentar a quantidade
    const handleIncreaseQuantity = (itemId) => {
        const item = cartItems.find(i => i.id === itemId);
        if (item) {
            updateQuantity(itemId, item.quantity + 1);
        }
    };

    // Função para diminuir a quantidade
    const handleDecreaseQuantity = (itemId) => {
        const item = cartItems.find(i => i.id === itemId);
        if (item && item.quantity > 1) {
            updateQuantity(itemId, item.quantity - 1);
        }
    };

    // Calcula o total usando useMemo para otimização
    const total = useMemo(() => {
        return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }, [cartItems]);

    // Se o carrinho estiver vazio
    if (cartItems.length === 0) {
        return (
            <div className="carrinho-empty-container">
                <div className="carrinho-empty-content">
                    <FaShoppingCart className="carrinho-empty-icon" />
                    <h1 className="carrinho-empty-title">
                        Seu carrinho está vazio
                    </h1>
                    <p className="carrinho-empty-text">
                        Adicione produtos para vê-los aqui.
                    </p>
                    <Link to="/home" className="carrinho-empty-button">
                        Continuar Comprando
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="carrinho-container">
            <div className="carrinho-content">
                <h1 className="carrinho-title">
                    Meu Carrinho
                </h1>

                <div className="carrinho-grid">
                    {/* --- COLUNA ESQUERDA: ITENS DO CARRINHO --- */}
                    <div className="carrinho-items-column">
                        {cartItems.map((item) => (
                            <div key={item.id} className="carrinho-item">
                                <img 
                                    src={item.imageUrl} 
                                    alt={item.title} 
                                    className="carrinho-item-image"
                                    draggable="false"
                                    onDragStart={(e) => e.preventDefault()}
                                    onContextMenu={(e) => e.preventDefault()}
                                />
                                
                                <div className="carrinho-item-content">
                                    <h3 className="carrinho-item-title">
                                        {item.title}
                                    </h3>
                                    <div className="carrinho-item-quantity-control">
                                        <span className="carrinho-quantity-label">Quantidade:</span>
                                        <div className="carrinho-quantity-buttons">
                                            <button
                                                className="carrinho-quantity-btn"
                                                onClick={() => handleDecreaseQuantity(item.id)}
                                                disabled={item.quantity <= 1}
                                                title="Diminuir quantidade"
                                            >
                                                <FaMinus />
                                            </button>
                                            <span className="carrinho-quantity-value">{item.quantity}</span>
                                            <button
                                                className="carrinho-quantity-btn"
                                                onClick={() => handleIncreaseQuantity(item.id)}
                                                title="Aumentar quantidade"
                                            >
                                                <FaPlus />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="carrinho-item-actions">
                                    <div className="carrinho-item-prices">
                                        <span className="carrinho-item-price-unit">
                                            R$ {item.price.toFixed(2).replace('.', ',')} (unidade)
                                        </span>
                                        <span className="carrinho-item-price-total">
                                            R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                                        </span>
                                    </div>
                                    <button 
                                        onClick={() => handleRemoveItem(item.id)} 
                                        className="carrinho-item-remove-btn"
                                        title="Remover item"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* --- COLUNA DIREITA: RESUMO DO PEDIDO --- */}
                    <div className="carrinho-resumo-column">
                        <div className="carrinho-resumo">
                            <h2 className="carrinho-resumo-title">
                                Resumo do Pedido
                            </h2>
                            <div className="carrinho-resumo-divider"></div>
                            
                            <div className="carrinho-resumo-row">
                                <span className="carrinho-resumo-label">
                                    Subtotal ({cartItems.length} itens)
                                </span>
                                <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                            </div>
                            
                            <div className="carrinho-resumo-row">
                                <span className="carrinho-resumo-label">Frete</span>
                                <span className="carrinho-resumo-frete">GRÁTIS</span>
                            </div>

                            <div className="carrinho-resumo-divider"></div>

                            <div className="carrinho-resumo-total">
                                <span>Total</span>
                                <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                            </div>

                            <button 
                                className="carrinho-resumo-button"
                                onClick={() => {
                                    if (cartItems.length > 0) {
                                        createOrder(cartItems, total);
                                        clearCart();
                                        navigate('/pedidos');
                                    }
                                }}
                            >
                                Finalizar Compra
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}