import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken } from "../../store/TokenSlice";
import { data, Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:8000/api/login", formData);
      toast.success(response.data.message)
      const jsondata = JSON.stringify(response.data);
      dispatch(setToken(JSON.stringify(response.data.token)));
      
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

      setEmail("");
      setPassword("");
    } catch (err) {
      console.log(err.response.data.message)
        if(err.response.data.message == "Internal Server Error"){
          toast.error('Invalid Email or password');
        }
        else{
          toast.error(err.response.data.message)
        }
        
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-container">
       <Toaster 
       position="top-right"
       reverseOrder={false}
       
       />
      <div className="left-side">
        <img src="/teeth.png" alt="Logo" className="logo" />
      </div>

      <div className="right-side">
        <form onSubmit={handleSubmit} className="login-form">
          <div className="btn-group">
            <h3>Powered by</h3>
            <img
              src="logo.png"
              alt="Digitace Logo"
              className="img-fluid"
            />
          </div>
          <h5 className="primary-color">Admin Login</h5>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Enter Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required={true}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required={true}
          />
      <div className="d-flex justify-content-start">
      <Link className="nav-link text-primary"  to="/">
        <p className="">Forget Password</p>
        </Link>
      </div>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
