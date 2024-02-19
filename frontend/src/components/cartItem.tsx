import { useState } from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

type CartItemProps = {
  cartItem: any;
};

const CartItem = ({ cartItem }: CartItemProps) => {
  const [count, setCount] = useState<number>(0);
  const { name, photo, price, id } = cartItem;
  return (
    <div className="cart-item">
      <img src={photo} alt={name} />
      <article>
        <Link to={`/product/${id}`}>{name}</Link>

        <span>
          <b>Price : {price}</b>
        </span>
      </article>

      <div className="cart-qantity">
        <button className="plus" onClick={() => setCount(count + 1)}>
          <FaPlus />
        </button>
        <span>{count}</span>
        <button className="minus" onClick={() => setCount(count - 1)}>
          <FaMinus />
        </button>

        <button className="delete">
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
