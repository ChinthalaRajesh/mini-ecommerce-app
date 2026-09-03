import React from 'react'
import logo from '../assets/logo.png'

function Navbar({ cartCount, search, onSearch, onCartOpen, onAdminOpen, currentUser, onLogout }) {
  return (
    <div className="navbar">

      <div className="navbar-logo">
        <img src={logo} alt="logo" className="logo-img" />
      </div>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />

      <span className="nav-user">👤 {currentUser}</span>

      <button onClick={onCartOpen}>
        Cart ({cartCount})
      </button>

      <button onClick={onAdminOpen}>
        Admin Panel
      </button>

      <button className="logout-btn" onClick={onLogout}>
        Logout
      </button>

    </div>
  )
}

export default Navbar