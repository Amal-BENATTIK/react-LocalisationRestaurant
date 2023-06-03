import React from "react";
import { NavLink } from "react-router-dom";
import { FaSearch } from 'react-icons/fa';


function Header({ userIsLoggedIn, handleLogout  }) {
  const handleLogoutClick = () => {
    handleLogout(); // Call the logout function from props
  };
  return (
    <header className="bgnav navbar navbar-expand-lg  mb-5">
      <nav className="container-fluid">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink   className="nav-link" to="/" activeClassName="active">
            <FaSearch style={{ marginRight: '0.5em' }} />Search
            </NavLink>
          </li>
          
          {userIsLoggedIn && (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Specialites" activeClassName="active">
                  Spécialites
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Restaurants">
                  Restaurants
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Series">
                  Series
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Zones">
                  Zones
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Villes">
                  Villes
                </NavLink>
              </li>
            </>
          )}
        </ul>
        {userIsLoggedIn && (
        <a className="btn btnc" onClick={handleLogoutClick}>
            Logged Out
          </a>
          )}
        {!userIsLoggedIn && (
          <a className="btn btnc" href="/Login">
            Login
          </a>
        )}
      </nav>
    </header>
  );
}

export default Header;





const Footer = () => {
  return (
    <footer className="bgnav  text-center text-lg-start">
      <p className="text-center p-3">© {new Date().getFullYear()} Restaurant Amal </p>
    </footer>
  );
};

export { Header, Footer };
