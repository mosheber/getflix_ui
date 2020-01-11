import React from 'react';
import { Link } from 'react-router-dom';
import Banner from './images/5d5f66e114f39.png';
import './style.scss';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="header">
        <a href="https://twitter.com/flexdinesh">
          <img src={Banner} alt="getflix" width="50%"/>
        </a>
        <div className="nav-bar">
          <Link className="router-link" to="/browse">
            Browse Catalog
          </Link>
          <Link className="router-link" to="/movie">
            Movie
          </Link>
          <Link className="router-link" to="/">
            Home
          </Link>
          <Link className="router-link" to="/login">
            Login
          </Link>
          <Link className="router-link" to="/borrows">
            My Borrows
          </Link>
        </div>
      </div>
    );
  }
}

export default Header;
