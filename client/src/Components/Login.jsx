import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { MdCodeOff } from "react-icons/md";
import './register.css'
import Navbar from './Navbar';
import toast from "react-hot-toast";



const Login = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });


  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/user/login", {
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        localStorage.setItem("userId", data?.user._id);
        toast.success("User Register Successfully");
        navigate("/compiler");
      } else {
        toast.error(`${data.message}`)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-content">
        <div className="box">
        <div className="form-top">
          <MdCodeOff style={{ fontSize: '3em', color: '#eb5e28' }} />  
          <h2>LOGIN</h2>
        </div>




          <input
            placeholder="email"
            value={inputs.email}
            name="email"
            type="email"
            required
            onChange={handleChange}
          />
          <input
            placeholder="password"
            value={inputs.password}
            name="password"
            type="password"
            required
            onChange={handleChange}
          />


          <div className="form-footer">
          <button type="submit" className="submit-button">
            LOGIN
          </button>

          <div style={{color:'#eb5e28',fontWeight:'500'}}>
          Don't have account ? Please 
          <Link to={'/register'} className='link-tag'> REGISTER</Link>
          </div>
          </div>

        </div>
        </div>
      </form>
    </>
  );
}

export default Login
