import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);

  // Fetch all products from the API
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Add a new product to the API
  const addProduct = async (product) => {
    try {
      const response = await axios.post('http://localhost:3000/api/products', product);
      setProducts([...products, response.data]); // Update the product list
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

   // Update a product in the API
   const updateProduct = async (id, updatedProduct) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/products/${id}`, updatedProduct);
      setProducts(products.map(product => (product._id === id ? response.data : product))); // Update the product list
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  // Delete a product from the API
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${id}`);
      setProducts(products.filter((product) => product._id !== id)); // Update product list
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="App">
      <h1>Product Manager</h1>
      <ProductForm addProduct={addProduct} />
      <ProductList products={products} updateProduct={updateProduct} deleteProduct={deleteProduct} />
    </div>
  );
};

export default App;
