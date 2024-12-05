import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(()  => {
    // Fetch product data from an API or local JSON file
    const fetchProducts = async () => {
      const response = await fetch('https://api.example.com/products');
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      {products.map((prod) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={card.id}>
          <ProductCard product={prod}/>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;