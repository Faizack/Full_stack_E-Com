import { FaPlus } from "react-icons/fa";

type ProductType = {
  id: number;
  photo: string;
  name: string;
  price: number;
  stock: number;
};

const Productcard = ({  photo, name, price }: ProductType) => {
  return (
    <div  className="product-card">
      <img src={photo} alt={name} />
      <p>{name}</p>
      <span> {price}</span>
      

      <div>
        <button>
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default Productcard;
