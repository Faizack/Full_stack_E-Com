import { Link } from "react-router-dom";
import Productcard from "../components/product-card";
import data from "../assets/data.js"



const Home = () => {
  return (
    <div className="home">
      <section></section>
      <h1>
        Latest Product
        <Link to="/search" className="more">More</Link>
      </h1>
      <main>

        {data.map((product) => (
          <Productcard
            key={product.id}
            id={product.id}
            photo={product.photo}
            name={product.name}
            price={product.price}
            stock={product.stock}
          />
        ))}
      </main>
    </div>
  );
};

export default Home;
