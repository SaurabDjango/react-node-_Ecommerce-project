import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';

function Nav({ cartItemCount }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('amount');
    navigate('/login');
  };

  return (
    <>
      {/* ======= Header ======= */}
      <header id="header" className="header fixed-top d-flex align-items-center">
        <div className="d-flex align-items-center justify-content-between">
          <Link to="/" className="logo d-flex align-items-center">
            <img src="assets/img/logo.png" alt="" />
            <span className="d-none d-lg-block">NiceAdmin</span>
          </Link>
          <i className="bi bi-list toggle-sidebar-btn"></i>
        </div>
        {/* End Logo */}

        <div className="search-bar">
          <form className="search-form d-flex align-items-center" method="POST" action="#">
            <input
              type="text"
              name="query"
              placeholder="Search"
              title="Enter search keyword"
            />
            <button type="submit" title="Search">
              <i className="bi bi-search" />
            </button>
          </form>
        </div>

        {/* End Search Bar */}
        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <li className="nav-item d-block d-lg-none">
              <Link className="nav-link nav-icon search-bar-toggle" to="#">
                <i className="bi bi-search" />
              </Link>
            </li>
            {/* End Search Icon*/}

            <li className="nav-item dropdown">
              <Link className="nav-link nav-icon" to="/cart">
                Cart
                <AiOutlineShoppingCart />
                {cartItemCount > 0 && (
                  <span className="badge bg-primary badge-number">{cartItemCount}</span>
                )}
              </Link>

              {/* End cart menu */}
            </li>

            <li className="nav-item dropdown pe-3">
              <Link
                className="nav-link nav-profile d-flex align-items-center pe-0"
                to="#"
                data-bs-toggle="dropdown"
              >
                <img
                  src="assets/img/profile-img.jpg"
                  alt="Profile"
                  className="rounded-circle"
                />
                <span className="d-none d-md-block dropdown-toggle ps-2">
                  K. Anderson
                </span>
              </Link>
              {/* End Profile Image Icon */}
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                  <h6>Kevin Anderson</h6>
                  <span>Web Designer</span>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item d-flex align-items-center" to={'/Profile'}>
                    <i className="bi bi-person" />
                    <span>My Profile</span>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item d-flex align-items-center" to="#">
                    <i className="bi bi-gear" />
                    <span>Account Settings</span>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item d-flex align-items-center" to="#">
                    <i className="bi bi-question-circle" />
                    <span>Need Help?</span>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button
                    className="dropdown-item d-flex align-items-center"
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right" />
                    <span>Sign Out</span>
                  </button>
                </li>
              </ul>
              {/* End Profile Dropdown Items */}
            </li>
            {/* End Profile Nav */}
          </ul>
        </nav>
        {/* End Icons Navigation */}
      </header>
      {/* End Header */}

      {/* ======= Sidebar ======= */}
      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              <i className="bi bi-grid" />
              <span>Dashboard</span>
            </Link>
          </li>
          {/* End Dashboard Nav */}

          <li className="nav-item">
            <Link className="nav-link collapsed" to="/">
              <i className="bi bi-person" />
              Home
            </Link>
          </li>
          {/* End Profile Page Nav */}

          <li className="nav-item">
            <Link className="nav-link collapsed" to="/cart">
              <i className="bi bi-cart" />
              Cart
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link collapsed" to="/checkout">
              <i className="bi bi-basket" />
              Checkout
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link collapsed" to="/Orders">
              <i className="bi bi-archive" />
              My Orders
            </Link>
          </li>

        </ul>
      </aside>
      {/* End Sidebar*/}
    </>
  );
}

export default Nav;