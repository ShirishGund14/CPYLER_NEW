import React from 'react'
import { MdCodeOff } from "react-icons/md";
import'./loader.css'
const Loader = () => {
  return (
    <div className='loader-page'>
      <MdCodeOff className='loader-logo'/>
      <MdCodeOff className='loader-logo2'/>
    </div>
  )
}

export default Loader
