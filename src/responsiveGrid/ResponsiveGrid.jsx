// Arquivo: /src/responsiveGrid/ResponsiveGrid.js

import * as React from 'react';
import MultiActionAreaCard from '../components/multiActionAreaCard/MultiActionAreaCard';
import './ResponsiveGrid.css';

export default function ResponsiveGrid({ productList, onProductSelect, title }) {

    return (
        <div className="responsive-grid-container">
            {title && (
                <h1 className="responsive-grid-title">
                    {title}
                </h1>
            )}
            <div className="responsive-grid">
                {productList.map((product) => (
                    <MultiActionAreaCard
                        key={product.id}
                        product={product}
                        onProductSelect={onProductSelect}
                    />
                ))}
            </div>
        </div>
    );
}