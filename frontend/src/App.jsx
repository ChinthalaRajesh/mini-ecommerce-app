import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import Navbar from './components/Navbar'
import ProductCard from './components/ProductCard'
import CartDrawer from './components/CartDrawer'
import AdminPanel from './components/AdminPanel'
import Login from './components/Login'
import Register from './components/Register'

const API = "http://localhost:8080/api"

function App() {

  let [products, setProducts] = useState([])
  let [cart, setCart] = useState([])
  let [search, setSearch] = useState("")
  let [cartOpen, setCartOpen] = useState(false)
  let [adminOpen, setAdminOpen] = useState(false)
  let [isLoggedIn, setIsLoggedIn] = useState(false)
  let [currentUser, setCurrentUser] = useState("")
  let [showRegister, setShowRegister] = useState(false)

  // ── Toast notifications ──────────────────────────
  const notify = () => toast.success("Product saved!", {
    position: "top-right",
    autoClose: 2500,
    transition: Slide
  })

  const deleteNotify = () => toast.info("Product deleted!", {
    position: "top-right",
    autoClose: 2500,
    transition: Slide
  })

  const cartNotify = (name) => toast.success(`${name} added to cart!`, {
    position: "top-right",
    autoClose: 2500,
    transition: Slide
  })

  const orderNotify = () => toast.success("Order placed successfully!", {
    position: "top-right",
    autoClose: 2500,
    transition: Slide
  })

  // ── Get all products ─────────────────────────────
  const getData = async () => {
    let response = await axios.get(`${API}/products`)
    let { data } = response
    setProducts(data)
  }

  useEffect(() => { getData() }, [])

  // ── Save product ─────────────────────────────────
  const saveProduct = async (productData) => {
    await axios.post(`${API}/products`, productData)
    getData()
    notify()
  }

  // ── Delete product ───────────────────────────────
  const deleteProduct = async (id) => {
    await axios.delete(`${API}/products/${id}`)
    getData()
    deleteNotify()
  }

  // ── Add to cart ──────────────────────────────────
  const addToCart = (product) => {
    let exists = cart.find(i => i.productId === product.productId)
    if (exists) {
      setCart(cart.map(i =>
        i.productId === product.productId ? { ...i, qty: i.qty + 1 } : i
      ))
    } else {
      setCart([...cart, { ...product, qty: 1 }])
      cartNotify(product.productName)
    }
  }

  // ── Remove from cart ─────────────────────────────
  const removeFromCart = (id) => {
    setCart(cart.filter(i => i.productId !== id))
  }

  // ── Increase quantity ────────────────────────────
  const increaseQty = (id) => {
    setCart(cart.map(i =>
      i.productId === id ? { ...i, qty: i.qty + 1 } : i
    ))
  }

  // ── Decrease quantity ────────────────────────────
  const decreaseQty = (id) => {
    setCart(cart.map(i =>
      i.productId === id && i.qty > 1 ? { ...i, qty: i.qty - 1 } : i
    ))
  }

  // ── Place order ──────────────────────────────────
  const placeOrder = () => {
    if (cart.length === 0) {
      toast.error("Cart is empty!")
      return
    }
    setCart([])
    setCartOpen(false)
    orderNotify()
  }

  // ── Auth functions ───────────────────────────────
  const handleLoginSuccess = (email) => {
    setIsLoggedIn(true)
    setCurrentUser(email)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentUser("")
    setCart([])
    setAdminOpen(false)
  }

  let cartCount = cart.reduce((sum, i) => sum + i.qty, 0)
  let filtered = products.filter(p =>
    p.productName.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>

      {/* ── Auth Pages ── */}
      {!isLoggedIn ? (
        showRegister ? (
          <Register
            onRegisterSuccess={() => setShowRegister(false)}
            onGoToLogin={() => setShowRegister(false)}
          />
        ) : (
          <Login
            onLoginSuccess={handleLoginSuccess}
            onGoToRegister={() => setShowRegister(true)}
          />
        )
      ) : (

        /* ── Main App ── */
        <>
          <Navbar
            cartCount={cartCount}
            search={search}
            onSearch={setSearch}
            onCartOpen={() => setCartOpen(true)}
            onAdminOpen={() => setAdminOpen(!adminOpen)}
            currentUser={currentUser}
            onLogout={handleLogout}
          />

          {adminOpen && (
            <AdminPanel
              products={products}
              onSave={saveProduct}
              onDelete={deleteProduct}
              onClose={() => setAdminOpen(false)}
            />
          )}

          <div className="products-section">
            <h2>Products ({products.length})</h2>
            <div className="products-grid">
              {filtered.length === 0 ? (
                <p>No products found</p>
              ) : (
                filtered.map((product, index) => (
                  <ProductCard
                    key={index}
                    product={product}
                    onAddToCart={addToCart}
                  />
                ))
              )}
            </div>
          </div>

          <CartDrawer
            cart={cart}
            open={cartOpen}
            onClose={() => setCartOpen(false)}
            onRemove={removeFromCart}
            onIncreaseQty={increaseQty}
            onDecreaseQty={decreaseQty}
            onPlaceOrder={placeOrder}
          />

          <ToastContainer />
        </>
      )}

    </div>
  )
}

export default App