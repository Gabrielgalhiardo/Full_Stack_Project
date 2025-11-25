import React, { useState, useEffect } from 'react';
import ResponsiveGrid from '../../responsiveGrid/ResponsiveGrid';
import { api } from '../../services/api';

function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.get('/api/products')
            .then(data => {
                setProducts(data);
            })
            .catch(error => {
                setError(error.message);
                console.error("Erro ao buscar dados da API:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    function handleProductSelect(product) {
        alert(`Clicou no produto: ${product.title}`);
    }

    if (loading) {
        return <p style={{ textAlign: 'center', marginTop: '50px' }}>Carregando produtos...</p>;
    }

    if (error) {
        return <p style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>Erro: {error}</p>;
    }

    // A MUDANÇA É APENAS NESTA LINHA 👇
    return (
        <div style={{ 
            display: 'flex', 
            width: '100dvw', 
            minHeight: '100dvh',
        }}>
            <ResponsiveGrid
                productList={products}
                onProductSelect={handleProductSelect}
            />
        </div>
    );
}

export default Home;