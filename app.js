import React, { useState } from "react";
import "./App.css";

function App() {
  const products = [
  {
    id: 1,
    name: "Oversized Hoodie",
    price: 1999,
    image: "https://img.freepik.com/premium-photo/man-woman-white-hoodies_1145069-522.jpg"
  },
  {
    id: 2,
    name: "Sneakers",
    price: 2999,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
  },
  {
    id: 3,
    name: "Cap",
    price: 799,
    image: "https://i.pinimg.com/originals/75/fe/c6/75fec61927c0f3da121884fafd791664.jpg"
  },
  {
    id: 4,
    name: "Cargo Pants",
    price: 2499,
    image: "https://i.pinimg.com/originals/56/b0/d1/56b0d19a4bb1695e7228833da523dc71.jpg"
  }
];


  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");

  // Add to cart (handle duplicate quantity)
  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Remove item completely
  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  // Increase quantity
  const increaseQty = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCart(updatedCart);
  };

  // Decrease quantity
  const decreaseQty = (id) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
  };

  // Search filter
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  // Total price
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Total items count
  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="container">
      <h1>GenZ Store 🛍️</h1>

      <input
        type="text"
        placeholder="Search product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search"
      />

     <h2>Products</h2>
<div className="products">
  {filteredProducts.map((product) => (
    <div key={product.id} className="card">

      <img src={product.image} alt={product.name} />

      <h3>{product.name}</h3>
      <p>₹{product.price}</p>

      <button onClick={() => addToCart(product)}>
        Add to Cart
      </button>

    </div>
  ))}
</div>


      <h2>Cart 🛒 ({totalItems})</h2>

      {cart.length === 0 ? (
        <p className="empty">Your cart is empty 😢</p>
      ) : (
        <div className="cart">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <span>
                {item.name} (x{item.quantity})
              </span>

              <div>
                <button onClick={() => decreaseQty(item.id)}>-</button>
                <button onClick={() => increaseQty(item.id)}>+</button>
                <button onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h3>Total: ₹{total}</h3>
        </div>
      )}
    </div>
  );
}

export default App;
