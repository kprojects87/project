import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(res => {
        setProducts(res.data);
        setFiltered(res.data);
      });
  }, []);

  useEffect(() => {
    let data = [...products];

    if (search) {
      data = data.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === 'asc') data.sort((a, b) => a.price - b.price);
    else if (sort === 'desc') data.sort((a, b) => b.price - a.price);

    setFiltered(data);
  }, [search, sort, products]);

  return (
    <div className="product-page">
      <h1 className="page-title">Explore Our Products</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select value={sort} onChange={e => setSort(e.target.value)}>
          <option value="">Sort by</option>
          <option value="asc">Price: Low ? High</option>
          <option value="desc">Price: High ? Low</option>
        </select>
      </div>

      <div className="product-grid">
        {filtered.map(product => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.title} />
            <h4 className="product-title">{product.title}</h4>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <Link className="view-btn" to={`/product/${product.id}`}>View</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;