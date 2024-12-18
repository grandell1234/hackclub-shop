import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";

const Shop = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    // printful api
    const fetchProducts = async () => {
      const response = await fetch("/api/printful/products");
      const data = await response.json();
      setProducts(data.result);
    };

    fetchProducts();
  }, []);

  const addToCart = (product: { id: number; name: string; price: number }) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const totalPrice = cart.reduce((total, product) => total + product.price, 0);

  return (
    <div className="bg-gray-100">
      <Navigation cartItemCount={cart.length} />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Shop Our Products</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded-lg shadow-lg bg-white"
            >
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-lg text-gray-700">${product.price}</p>
              <button
                className="bg-blue-600 text-white py-2 px-4 mt-4 rounded"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold">Shopping Cart</h2>
          <ul className="mt-4">
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between py-2">
                <span>{item.name}</span>
                <button
                  className="text-red-600"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="flex justify-between mt-4 font-semibold">
            <span>Total:</span>
            <span>${totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
