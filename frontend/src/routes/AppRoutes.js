import React from 'react'
import { Routes, Route, Router } from 'react-router-dom'
import Login from '../components/login/Login'
import Register from '../components/register/Register'
import Users from '../components/ManageUsers/Users'
import PrivateRoutes from './PrivateRoutes'

const AppRoutes = () => {
    // * backend trả đường link link url [/users/show , /users/update] sử dụng vòng lặp

const Project = () =>{
    return <span>Project</span>
} 
  return (
    <>
    <Routes>
        <Route path='/' exact element={<h1>Home</h1>}/>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

         <Route
          path="/users"
          element={
            <PrivateRoutes>
            <Users />
            </PrivateRoutes>
          }
        />
         <Route
          path="/project"
          element={
            <PrivateRoutes>
            <Project />
            </PrivateRoutes>
          }
        />


        <Route path='/about'/>
        <Route path='*' element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  )
}

export default AppRoutes