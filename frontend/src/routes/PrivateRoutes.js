import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const PrivateRoutes = (props) => {
    let navigate = useNavigate();
    useEffect(()=>{
    let session = sessionStorage.getItem('account');
    if (!session) {
      navigate("/login");
      window.location.reload();
    }
    },[])

  return (
     <>
      {props.children}
     </>
  )
}

export default PrivateRoutes