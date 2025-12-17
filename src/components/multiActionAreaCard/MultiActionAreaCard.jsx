import * as React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import './MultiActionAreaCard.css';
import { useCart } from '../../contexts/CartContext';

export default function MultiActionAreaCard(props) {
    const [openModalDetalhes, setOpenModalDetalhes] = React.useState(false);
    const [openModalCarrinho, setOpenModalCarrinho] = React.useState(false);
    const { addToCart } = useCart();

    const handleAbrirDetalhes = () => setOpenModalDetalhes(true);
    const handleAbrirCarrinho = () => {
        addToCart(props.product);
        setOpenModalCarrinho(true);
    };

    const handleFecharModais = () => {
        setOpenModalDetalhes(false);
        setOpenModalCarrinho(false);
    };
    
    return (
        <div className="product-card-wrapper">
            <div className="product-card">
                <div 
                    className="product-card-image-area"
                    onClick={handleAbrirDetalhes}
                >
                    <img 
                        src={props.product.imageUrl} 
                        alt={props.product.title} 
                        className="product-card-image"
                        draggable="false"
                        onDragStart={(e) => e.preventDefault()}
                        onContextMenu={(e) => e.preventDefault()}
                    />
                </div>
                <div className="product-card-content">
                    <h3 className="product-card-title" onClick={handleAbrirDetalhes}>
                        {props.product.title}
                    </h3>
                    <p className="product-card-description">
                        {props.product.description}
                    </p>
                </div>
                <div className="product-card-footer">
                    <span className="product-card-price">
                        R$ {props.product.price.toFixed(2).replace('.', ',')}
                    </span>
                    <button 
                        className="product-card-button"
                        onClick={handleAbrirCarrinho}
                    >
                        <FaShoppingCart /> Comprar
                    </button>
                </div>
            </div>

            {/* MODAL: Detalhes do Produto */}
            {openModalDetalhes && (
                <div className="modal-overlay-product" onClick={handleFecharModais}>
                    <div className="modal-content-product" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-product" onClick={handleFecharModais}>×</button>
                        <h2 className="modal-title-product">{props.product.title}</h2>
                        <img 
                            src={props.product.imageUrl} 
                            alt={props.product.title} 
                            className="modal-image-product"
                            draggable="false"
                            onDragStart={(e) => e.preventDefault()}
                            onContextMenu={(e) => e.preventDefault()}
                        />
                        <p className="modal-description-product">{props.product.description}</p>
                        
                        <div className="modal-details-product">
                            <div className="modal-detail-row">
                                <strong>Preço:</strong>
                                <span className="modal-price-product">R$ {props.product.price.toFixed(2).replace('.', ',')}</span>
                            </div>
                            
                            {props.product.collaboratorName && (
                                <div className="modal-detail-row">
                                    <strong>Vendedor:</strong>
                                    <span>{props.product.collaboratorName}</span>
                                </div>
                            )}
                            
                            {props.product.quantity !== undefined && (
                                <div className="modal-detail-row">
                                    <strong>Unidades disponíveis:</strong>
                                    <span>{props.product.quantity}</span>
                                </div>
                            )}
                        </div>
                        
                        <button className="modal-button-product" onClick={handleFecharModais}>Fechar</button>
                    </div>
                </div>
            )}

            {/* MODAL: Produto Adicionado ao Carrinho */}
            {openModalCarrinho && (
                <div className="modal-overlay-product" onClick={handleFecharModais}>
                    <div className="modal-content-product modal-cart-product" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-product" onClick={handleFecharModais}>×</button>
                        <h2 className="modal-title-product">Produto Adicionado!</h2>
                        <p className="modal-message-product">
                            Você adicionou "{props.product.title}" ao seu carrinho.
                        </p>
                        <button className="modal-button-product" onClick={handleFecharModais}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
}