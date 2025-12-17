import './Productdetails.css';
function ProductDetails({ product }) {
    return (
        <div className="product-details-container">
            <div className="product-details">
                <div className="product-title">
                    <h2>{product.title}</h2>
                </div>
                <div className="product-price">
                    <h3>R$ {product.price}</h3>
                </div>
                <div className="product-description">
                    <p>{product.description}</p>
                </div>
            </div>
            <div className="product-image">
                <img src={product.imageUrl} alt={product.title} draggable="false" onDragStart={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} /> 
            </div>


        </div>
    );
}
export default ProductDetails;