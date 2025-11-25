import React, { useState, useEffect } from 'react';
import '../screens/perfil/Perfil.css';

function ProductForm({ product, isEditing, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        quantity: '',
        imageUrl: '',
        productStatus: 'AVAILABLE',
        productCategory: 'ELECTRONICS'
    });
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (product && isEditing) {
            // Formata o preço para exibição (converte ponto para vírgula)
            const formattedPrice = product.price 
                ? product.price.toString().replace('.', ',') 
                : '';
            
            // Se imageUrl for base64, não usa (apenas mostra preview se necessário)
            const imageUrl = product.imageUrl && !product.imageUrl.startsWith('data:image')
                ? product.imageUrl 
                : '';
            
            setFormData({
                title: product.title || '',
                description: product.description || '',
                price: formattedPrice,
                quantity: product.quantity || '',
                imageUrl: imageUrl,
                productStatus: product.productStatus || 'AVAILABLE',
                productCategory: product.productCategory || 'ELECTRONICS'
            });
            // Mostra preview apenas se for URL válida (não base64)
            setImagePreview(imageUrl || null);
        } else {
            resetForm();
        }
    }, [product, isEditing]);

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            price: '',
            quantity: '',
            imageUrl: '',
            productStatus: 'AVAILABLE',
            productCategory: 'ELECTRONICS'
        });
        setSelectedImage(null);
        setImagePreview(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePriceChange = (e) => {
        let value = e.target.value;
        
        // Remove tudo que não é número, vírgula ou ponto
        value = value.replace(/[^\d,.]/g, '');
        
        // Se vazio, permite
        if (value === '') {
            setFormData(prev => ({
                ...prev,
                price: ''
            }));
            return;
        }
        
        // Normaliza: aceita vírgula ou ponto, mas converte vírgula para ponto internamente
        value = value.replace(',', '.');
        
        // Permite apenas um separador decimal
        const parts = value.split('.');
        if (parts.length > 2) {
            value = parts[0] + '.' + parts.slice(1).join('');
        }
        
        // Limita a 2 casas decimais
        if (parts.length === 2 && parts[1].length > 2) {
            value = parts[0] + '.' + parts[1].substring(0, 2);
        }
        
        // Garante que não começa com ponto ou vírgula
        if (value.startsWith('.') || value.startsWith(',')) {
            value = '0' + value;
        }
        
        setFormData(prev => ({
            ...prev,
            price: value
        }));
    };

    const formatPriceForDisplay = (value) => {
        if (!value) return '';
        // Converte para formato brasileiro (vírgula para decimais)
        return value.toString().replace('.', ',');
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            
            // Criar preview da imagem (apenas para visualização, não salva base64)
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                // Não salva base64 no formData, apenas mostra preview
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setImagePreview(null);
        setSelectedImage(null);
        setFormData(prev => ({ ...prev, imageUrl: '' }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Garante que o preço está no formato correto (ponto para decimais)
        const formattedData = {
            ...formData,
            price: formData.price.toString().replace(',', '.')
        };
        
        onSubmit(formattedData);
    };

    return (
        <form onSubmit={handleSubmit} className='modal-form'>
            {/* SEÇÃO 1: Título do Produto */}
            <div className="form-section">
                <label className="form-label">Título do produto *</label>
                <input 
                    type="text" 
                    name="title"
                    placeholder="Ex: Camiseta 100% algodão, cores variadas" 
                    value={formData.title}
                    onChange={handleInputChange}
                    className="form-input-title"
                    required 
                    maxLength={100}
                />
                <div className="input-footer">
                    <span className="form-hint">Use palavras-chave que os compradores usariam para buscar seu produto</span>
                    <span className="char-count">{formData.title.length}/100</span>
                </div>
            </div>

            {/* SEÇÃO 2: Categoria */}
            <div className="form-section">
                <label className="form-label">Categoria *</label>
                <select 
                    name="productCategory"
                    value={formData.productCategory}
                    onChange={handleInputChange}
                    className="form-select"
                    required
                >
                    <option value="ELECTRONICS">Eletrônicos</option>
                    <option value="BOOKS">Livros</option>
                    <option value="CLOTHING">Roupas</option>
                    <option value="HOME_APPLIANCES">Eletrodomésticos</option>
                    <option value="TOYS">Brinquedos</option>
                    <option value="SPORTS">Esportes</option>
                    <option value="BEAUTY">Beleza</option>
                    <option value="AUTOMOTIVE">Automotivo</option>
                </select>
            </div>

            {/* SEÇÃO 3: Imagens */}
            <div className="form-section">
                <label className="form-label">URL da Imagem do produto *</label>
                <input 
                    type="text" 
                    name="imageUrl"
                    placeholder="https://exemplo.com/imagem.jpg" 
                    value={formData.imageUrl && !formData.imageUrl.startsWith('data:image') ? formData.imageUrl : ''}
                    onChange={handleInputChange}
                    className="form-input"
                    required 
                />
                <span className="form-hint">Cole a URL completa da imagem (não use base64, é muito grande para o banco)</span>
                
                <div className="image-upload-container" style={{ marginTop: '15px' }}>
                    <label htmlFor="image-upload" className="image-upload-label" style={{ padding: '20px' }}>
                        <span className="upload-icon">📷</span>
                        <span>Ou escolha uma imagem para preview (não será salva como base64)</span>
                    </label>
                    <input 
                        type="file" 
                        id="image-upload"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                setSelectedImage(file);
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    setImagePreview(reader.result);
                                    // Não salva base64, apenas mostra preview
                                };
                                reader.readAsDataURL(file);
                            }
                        }}
                        style={{ display: 'none' }}
                    />
                    {imagePreview && (
                        <div className="image-preview-wrapper">
                            <img src={imagePreview} alt="Preview" className="image-preview" />
                            <button 
                                type="button"
                                onClick={() => {
                                    setImagePreview(null);
                                    setSelectedImage(null);
                                }}
                                className="remove-image-btn"
                            >
                                ✕ Remover Preview
                            </button>
                            <span className="form-hint" style={{ marginTop: '10px', display: 'block' }}>
                                ⚠️ Este é apenas um preview. Insira a URL da imagem no campo acima.
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* SEÇÃO 4: Preço e Quantidade */}
            <div className="form-section form-row">
                <div className="form-group">
                    <label className="form-label">Preço *</label>
                    <div className="price-input-wrapper">
                        <span className="currency-symbol">R$</span>
                        <input 
                            type="text" 
                            name="price"
                            placeholder="0,00" 
                            value={formatPriceForDisplay(formData.price)}
                            onChange={handlePriceChange}
                            className="form-input-price"
                            required 
                            inputMode="decimal"
                            onKeyPress={(e) => {
                                // Permite apenas números, vírgula e ponto
                                const char = e.key;
                                if (!/[0-9,.]/.test(char) && char !== 'Backspace' && char !== 'Delete' && char !== 'Tab') {
                                    e.preventDefault();
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label">Quantidade disponível *</label>
                    <input 
                        type="number" 
                        name="quantity"
                        placeholder="0" 
                        value={formData.quantity}
                        onChange={handleInputChange}
                        min="0"
                        step="1"
                        className="form-input"
                        required 
                        onKeyPress={(e) => {
                            if (e.key === '-' || e.key === '+' || e.key === '.' || e.key === ',') {
                                e.preventDefault();
                            }
                        }}
                    />
                </div>
            </div>

            {/* SEÇÃO 5: Status */}
            <div className="form-section">
                <label className="form-label">Status do produto *</label>
                <select 
                    name="productStatus"
                    value={formData.productStatus}
                    onChange={handleInputChange}
                    className="form-select"
                    required
                >
                    <option value="AVAILABLE">Disponível para venda</option>
                    <option value="UNAVAILABLE">Indisponível</option>
                    <option value="OUT_OF_STOCK">Fora de Estoque</option>
                </select>
            </div>

            {/* SEÇÃO 6: Descrição */}
            <div className="form-section">
                <label className="form-label">Descrição do produto *</label>
                <textarea 
                    name="description"
                    placeholder="Descreva seu produto com detalhes. Inclua informações sobre características, benefícios e qualquer detalhe importante que ajude o comprador a tomar uma decisão." 
                    value={formData.description}
                    onChange={handleInputChange}
                    className="form-textarea"
                    rows="6"
                    required
                    maxLength={1000}
                ></textarea>
                <div className="input-footer">
                    <span className="form-hint">Quanto mais detalhes, melhor! Isso ajuda os compradores a entenderem seu produto</span>
                    <span className="char-count">{formData.description.length}/1000</span>
                </div>
            </div>

            <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={onCancel}>Cancelar</button>
                <button type="submit" className="btn-confirm">{isEditing ? 'Salvar alterações' : 'Publicar produto'}</button>
            </div>
        </form>
    );
}

export default ProductForm;

