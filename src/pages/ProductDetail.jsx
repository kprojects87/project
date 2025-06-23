import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${id}`)
            .then(res => {
                setProduct(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching product:', err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p className="loading-text">Loading product...</p>;
    if (!product) return <p className="error-text">Product not found.</p>;

    return (
        <div className="product-detail-page">
            <Link to="/" className="back-link">← Back to products</Link>

            <div className="product-detail-container">
                <div className="product-image">
                    <img src={product.image} alt={product.title} />
                </div>

                <div className="product-info">
                    <h2 className="product-title">{product.title}</h2>
                    <p className="product-category">{product.category}</p>
                    <p className="product-description">{product.description}</p>
                    <p className="product-price">${product.price.toFixed(2)}</p>
                    <button className="buy-button">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
