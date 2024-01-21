import React, { useState, useEffect } from "react";
import "../ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const validateInputs = () => {
    if (!productId.trim() || !productName.trim() || !productPrice.trim()) {
      setErrorMessage("All fields are required.");
      return false;
    }

    if (isNaN(parseFloat(productPrice)) || parseFloat(productPrice) <= 0) {
      setErrorMessage("Please enter a valid positive number for the price.");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  const addProduct = () => {
    if (validateInputs()) {
      const newProduct = {
        id: productId,
        name: productName,
        price: parseFloat(productPrice),
      };

      setProducts([...products, newProduct]);
      setProductId("");
      setProductName("");
      setProductPrice("");
    }
  };

  const deleteProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const totalAmount = products.reduce(
    (total, product) => total + product.price,
    0
  );

  return (
    <div className="product-list-container">
      <div className="input-container">
        <div>
          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            placeholder="Product ID"
          />
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Product Name"
          />
          <input
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            placeholder="Product Price"
          />
        </div>
        <div className="add-button">
          <button onClick={addProduct}>Add</button>
        </div>
      </div>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <div className="products-container">
        {products.map((product, index) => (
          <div className="product-item" key={index}>
            <span>{`ID: ${product.id}, Name: ${product.name}, Price: ${product.price}`}</span>
            <button onClick={() => deleteProduct(index)}>Delete</button>
          </div>
        ))}
      </div>

      <div className="total-amount">Total Amount: {totalAmount}</div>
    </div>
  );
};

export default ProductList;
