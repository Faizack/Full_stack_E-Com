import { useState } from "react";
import SearchItem from "../components/searchItem";

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
const Search = () => {
  const [maxPrice, setMaxPrice] = useState(100);
  return (
    <div className="search">
      <aside>
        <h1>Filter</h1>
        <div>
          <h4>Sort Product</h4>
          <select>
            <option value="asc">Sort by asc</option>
            <option value="dsc">Sort by des</option>
          </select>
          <h4>Max Price : {maxPrice}</h4>
          <input
            type="range"
            min="0"
            max="100"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
          <h4>Catergory</h4>
          <select>
            <option value="asc">All</option>
            <option value="asc">Mobile</option>
            <option value="dsc">Laptop</option>
          </select>
        </div>
      </aside>
      <h1>Products</h1>
      <input
        type="text"
        placeholder="search by name"
        onChange={(e) => console.log(e.target.value)}
      />
      <main>
        {cartItem.length > 0 ? (
          cartItem.map((item, idx) => <SearchItem key={idx} cartItem={item} />)
        ) : (
          <p>No items in the cart</p>
        )}
      </main>
    </div>
  );
};

export default Search;
