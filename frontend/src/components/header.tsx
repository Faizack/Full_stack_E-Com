import { FaHome, FaSearch, FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { RiAdminLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const userData = {
  id: "1",
  role: "admin",
};
const Header = () => {
  return (
    <nav className="header">
      <Link to="/">
        <FaHome />
      </Link>
      <Link to="/search">
        <FaSearch />
      </Link>
      <Link to="/cart">
        <FaCartShopping />
      </Link>
      {userData.role === "user" ? (
        <Link to="/User">
          <FaUser />
        </Link>
      ) : (
        <Link to="/admin/dashboard">
          <RiAdminLine />
        </Link>
      )}
    </nav>
  );
};

export default Header;
