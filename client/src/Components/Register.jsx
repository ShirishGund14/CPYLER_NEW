import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { MdCodeOff } from "react-icons/md";
import './register.css'
import Navbar from './Navbar';
import toast from "react-hot-toast";


const Register = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
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
      const { data } = await axios.post("/api/v1/user/register", {
        username: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        toast.success("User Register Successfully");
        navigate("/login");
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
          <h2>REGISTER</h2>
        </div>


          <input
            placeholder="name"
            value={inputs.name}
            onChange={handleChange}
            name="name"
            type="text"
            required
          />
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
            Register
          </button>

          <div style={{color:'#eb5e28',fontWeight:'500'}}>
          Already Registered? Please 
          <Link to={'/login'} className='link-tag'> LOGIN </Link>
          </div>
          </div>

        </div>
        </div>
      </form>
    </>
  );
}

export default Register
