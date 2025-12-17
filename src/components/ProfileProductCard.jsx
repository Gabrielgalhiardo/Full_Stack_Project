import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import '../screens/perfil/Perfil.css';

function ProfileProductCard({ product, onEdit, onDelete }) {
    return (
        <div className="produto-card-perfil">
            <img src={product.imageUrl} alt={product.title} className="produto-imagem-perfil" draggable="false" onDragStart={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} />
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

export default ProfileProductCard;

