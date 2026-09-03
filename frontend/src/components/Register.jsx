import axios from 'axios'
import React, { useState } from 'react'
import { toast, Slide } from 'react-toastify'

const API = "http://localhost:8080/api"

function Register({ onRegisterSuccess, onGoToLogin }) {

  let [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const saveData = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value })
  }

  const handleRegister = async (e) => {
    e.preventDefault()

    // Check passwords match
    if (registerData.password !== registerData.confirmPassword) {
      toast.error("Passwords do not match!", {
        position: "top-right",
        autoClose: 2500,
        transition: Slide
      })
      return
    }

    try {
      let response = await axios.post(`${API}/users/register`, {
        name: registerData.name,
        email: registerData.email,
        password: registerData.password
      })
      let { data } = response

      if (data === "User registered successfully!") {
        toast.success("Registered successfully! Please login.", {
          position: "top-right",
          autoClose: 2500,
          transition: Slide
        })
        onRegisterSuccess()
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

        <h2>Create Account 🛒</h2>
        <p className="auth-subtitle">Register to start shopping</p>

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={registerData.name}
              onChange={saveData}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={registerData.email}
              onChange={saveData}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={registerData.password}
              onChange={saveData}
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={registerData.confirmPassword}
              onChange={saveData}
              required
            />
          </div>

          <button type="submit" className="auth-btn">Register</button>
        </form>

        <p className="auth-switch">
          Already have an account?{" "}
          <span onClick={onGoToLogin}>Login here</span>
        </p>

      </div>
    </div>
  )
}

export default Register