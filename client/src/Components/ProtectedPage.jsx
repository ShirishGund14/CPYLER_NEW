import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const ProtectedPage = ({children}) => {

  const navigate=useNavigate();
  

    useEffect(() => {
        if (!localStorage.getItem('userId')) {
            navigate('/login')
        }
    }, [])

  return (
    <div>
      {children}
    </div>
  )
}

export default ProtectedPage
