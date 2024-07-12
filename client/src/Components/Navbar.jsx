import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css'
import { MdCodeOff,MdDashboard } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { AiOutlineLogout } from "react-icons/ai";
import { FaCode } from "react-icons/fa";
import { ImFire } from "react-icons/im";


const Navbar = () => {
    const navigate=useNavigate();

    const handleLogout=()=>{
        localStorage.removeItem('userId');
        localStorage.removeItem('savedCode');
        navigate('/');
    }
    return (
        <nav className='navbar-container'>
            <div className='left-logo'>
              <MdCodeOff  className='logo' onClick={()=>navigate('/')}/>
            </div>
            <div className='navbar-btns'>
             <button onClick={()=>{ navigate('/')}} className='btn-nav' >
                <IoMdHome className='icon'/><span className='btn-name'>HOME</span>
                </button>

             <button onClick={()=>{ navigate('/compiler')}} className='btn-nav'><ImFire className='icon'/>
             <span className='btn-name'>COMPILER</span>
             </button>
             <button onClick={()=>{ navigate('/codes')}} className='btn-nav'>
                 <FaCode className='icon'/>
                 <span className='btn-name'>CODES</span>
                 </button>
             <button onClick={()=>{ navigate('/dashboard')}} className='btn-nav' >  
             <MdDashboard className='icon'/> 
             <span className='btn-name'>DASHBOARD</span>
               </button>
             <button onClick={()=>handleLogout()} className='btn-nav'>
                <AiOutlineLogout className='icon'/>
                <span className='btn-name'>LOGOUT</span>
                </button>
            
            </div>
        </nav>
    );
}

export default Navbar;
