import React from 'react'

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">

      {product.productImage ? (
        <img src={product.productImage} alt={product.productName} />
      ) : (
        <div className="no-image">No Image</div>
      )}

      <div className="product-info">
        <p className="product-name">{product.productName}</p>
        <p className="product-category">{product.productCategory}</p>
        <p className="product-price">₹{product.productPrice}</p>
        <button onClick={() => onAddToCart(product)}>Add to Cart</button>
      </div>

    </div>
  )
}

export default ProductCard