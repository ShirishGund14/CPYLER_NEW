import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar';
import './home.css'
import { MdCodeOff } from "react-icons/md";

const Home = () => {
    const navigate = useNavigate();
    return (
        <>
            <Navbar />
            <div className='home-page'>
                
                <div >
                 <MdCodeOff className='circle-1'/>
                </div>
                <div className='home-container'>
                    <div className='top'>
                        <h1 ><span className='cpyler'>CPYLER</span>: Online code compiler</h1>
                        <h3>Build by <span className='myname'>Shirish Gund</span></h3>
                        <p>
                        CPYLER is a online code compiler which can run C,C++ and Python codes ,it is full stack project which is made by using techstack ReactJs for the frontend and Material UI and Nodejs and expressJs for the backend and MongoDb for the database
                        </p>

                    </div>

                    <div className='bottom'>


                        <button onClick={() => navigate('/register')} >Sign up</button>
                        <button onClick={() => navigate('/login')} >Sign in </button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Home
