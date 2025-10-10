// Arquivo: /src/responsiveGrid/ResponsiveGrid.js

import * as React from 'react';
import Box from '@mui/material/Box';
import MultiActionAreaCard from '../components/multiActionAreaCard/MultiActionAreaCard'; // Verifique o caminho do import

export default function ResponsiveGrid({ productList, onProductSelect }) {

    return (
        <Box sx={{
            // Estilos base            
            width: '100%',
            backgroundColor: '#292927ff',
            padding: 3,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '24px',
            flexGrow: 1,
        }}>
            {productList.map((product) => (
                <MultiActionAreaCard
                    key={product.id}
                    product={product}
                    onProductSelect={onProductSelect}
                />
            ))}
        </Box>
    );
}