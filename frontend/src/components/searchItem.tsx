
type CartItemProps = {
  cartItem: any;
};
const SearchItem = ({ cartItem }: CartItemProps) => {
  const { name, photo, price } = cartItem;

  return (
    <div className="cart-item">
      <img src={photo} alt={name} />
      <article>
        <p>{name}</p>

        <span>
          <b> {price}</b>
        </span>
      </article>
      
    </div>

  );
};

export default SearchItem;
