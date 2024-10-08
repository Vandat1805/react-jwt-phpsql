import "./App.css"
import Nav from "./components/navigation/Nav";
import { Routes, Route, Router } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
function App() {
  const [account, setAccount] = useState({});

  useEffect(()=>{
    let session = sessionStorage.getItem('account');
    if (session) {
      setAccount(JSON.parse(session));
    }
  },[]);
  return (
    <>
    <div className="app-header">
      <Nav />
    </div>
    hello react app
    <div className="app-container">
    <AppRoutes />
              <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                />      
    </div>
    </>

  );
}

export default App;
