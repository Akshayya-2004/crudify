import React, { useState } from "react";
import "./ProductList.css";

const ProductList = ({ products, updateProduct, deleteProduct }) => {
  const [editingProductId, setEditingProductId] = useState(null); // Track which product is being edited
  const [editDetails, setEditDetails] = useState({
    name: "",
    price: "",
    quantity: "",
  });

  // Start editing a product
  const handleEditClick = (product) => {
    setEditingProductId(product._id); // Set the product being edited
    setEditDetails({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    });
  };

  // Handle input changes during editing
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditDetails({ ...editDetails, [name]: value });
  };

  // Handle save/update of the product
  const handleUpdateClick = () => {
    updateProduct(editingProductId, editDetails); // Call updateProduct with edited details
    setEditingProductId(null); // Exit edit mode
  };

  return (
    <div>
      <h2>All Products</h2>
      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              {editingProductId === product._id ? (
                // Edit form for the product being updated
                <>
                  <input
                    type="text"
                    name="name"
                    value={editDetails.name}
                    onChange={handleInputChange}
                    placeholder="Product Name"
                  />
                  <input
                    type="number"
                    name="price"
                    value={editDetails.price}
                    onChange={handleInputChange}
                    placeholder="Price"
                  />
                  <input
                    type="number"
                    name="quantity"
                    value={editDetails.quantity}
                    onChange={handleInputChange}
                    placeholder="Quantity"
                  />
                  <button onClick={handleUpdateClick}>Save</button>
                  <button onClick={() => setEditingProductId(null)}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  {product.name} - ${product.price} (Quantity:{" "}
                  {product.quantity})
                  <button onClick={() => handleEditClick(product)}>
                    Update
                  </button>
                  <button onClick={() => deleteProduct(product._id)}>
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
