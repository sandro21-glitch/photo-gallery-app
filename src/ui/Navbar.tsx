import { Link } from "react-router-dom";
import logo from "/assets/images/logo-no-background.svg";
import "./Navbar.css";
const Navbar = () => {
  return (
    <header>
      <nav className="navbar section-center">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/">მთავარი</Link>
          </li>
          <li>
            <Link to="/history">ისტორია</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
