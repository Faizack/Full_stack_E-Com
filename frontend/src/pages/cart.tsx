import { useState } from "react";
import { MdError } from "react-icons/md";
import { TiTick } from "react-icons/ti";

import CartItem from "../components/cartItem";
import { Link } from "react-router-dom";

const cartItem = [
  {
    id: 1,
    photo:
      "https://m.media-amazon.com/images/I/31ilq3hPhEL._SY445_SX342_QL70_FMwebp_.jpg",
    name: "MacBook",
    price: 100,
    stock: 100,
  },
  {
    id: 2,

    photo:
      "https://m.media-amazon.com/images/I/71HzM0aj+9L._AC_UY327_FMwebp_QL65_.jpg",
    name: "Hp",
    price: 90,
    stock: 90,
  },
  {
    id: 3,
    photo: "https://m.media-amazon.com/images/I/61RJn0ofUsL._SX679_.jpg",
    name: "MacBook",
    price: 100,
    stock: 100,
  },
];
const subtotal = 5000;
const shippingCharge = 0;
const tax = 0.18 * subtotal;
const discount = 0;

const total = subtotal + shippingCharge + tax - discount;

const originCode = "12345";

const Cart = () => {
  const [coupenCode, setCoupenCode] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);

  function handleCode(code: string) {
    setCoupenCode(code);

    if (originCode == code) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }

  return (
    <div className="cart">
      <main>
        {cartItem.length > 0 ? (
          cartItem.map((item, idx) => <CartItem key={idx} cartItem={item} />)
        ) : (
          <p>No items in the cart</p>
        )}
      </main>

      <aside>
        <p>subtotal: {subtotal}</p>
        <p>shippingCharge: {shippingCharge}</p>
        <p>Tax: {tax}</p>
        <p className="red">discount: {discount}</p>
        <p>
          <b>Total: {total}</b>
        </p>

        <input
          type="text"
          value={coupenCode}
          onChange={(e) => handleCode(e.target.value)}
        />
        {coupenCode &&
          (isValid ? (
            <span className="green">
              <TiTick />
              <p>Code is valid</p>
            </span>
          ) : (
            <span className="red">
              <MdError />
              <p>Code is invalid</p>
            </span>
          ))}

        {cartItem.length > 0 && (
          <Link to="/checkout">
            <button className="checkout-btn">Checkout</button>
          </Link>
        )}
      </aside>
    </div>
  );
};

export default Cart;
