import React from "react";
import "./navigation.css";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <div>
      <div className="row">
        <nav className="nav__container">
          <Link to="/" className="text__purple logo">
            Binge Trailers
          </Link>
          <ul className="nav__items">
            <li className="nav__item text__purple">
              <Link to="/" className="nav__link text__purple home">
                Home
              </Link>
            </li>
            <li className="nav__item ">
              <Link to="/findYourTrailer" className="nav__link">
                Find your trailer
              </Link>
            </li>
            <li className="nav__item">
              <a
                href="mailto:spelltomato@gmail.com"
                className="nav__link contact__btn"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Navigation;
