import axios from 'axios'
import React, { useState } from 'react'
import { toast, Slide } from 'react-toastify'

const API = "http://localhost:8080/api"

function Login({ onLoginSuccess, onGoToRegister }) {

  let [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })

  const saveData = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      let response = await axios.post(`${API}/users/login`, loginData)
      let { data } = response

      if (data === "Login successful!") {
        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 2500,
          transition: Slide
        })
        onLoginSuccess(loginData.email)
      } else {
        toast.error(data, {
          position: "top-right",
          autoClose: 2500,
          transition: Slide
        })
      }
    } catch {
      toast.error("Something went wrong!", {
        position: "top-right",
        autoClose: 2500,
        transition: Slide
      })
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-box">

        <h2>Welcome Back 👋</h2>
        <p className="auth-subtitle">Login to your account</p>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={loginData.email}
              onChange={saveData}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={loginData.password}
              onChange={saveData}
              required
            />
          </div>

          <button type="submit" className="auth-btn">Login</button>
        </form>

        <p className="auth-switch">
          Don't have an account?{" "}
          <span onClick={onGoToRegister}>Register here</span>
        </p>

      </div>
    </div>
  )
}

export default Login