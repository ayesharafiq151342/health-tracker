import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import EmailVarify from './pages/EmailVarify'
import ForgotPassword from './pages/Forgetpassword';
import Login from './pages/Login'
import Signup from './pages/Signup';
import VerifyOTP from './pages/verify-auth';
import "./index.css"; 
import { Toaster } from "react-hot-toast";
import ToastProvider from './components/ToastProvider';
import Navbar from './components/navbar';
import Footer from './components/footer';
import DashboardLayout from "./pages/dashboard";

import {TopHeader} from './components/topheader';
import {SidebarComponent} from './components/sidebar'
const App = () => { 
  return (
    <div>
      <Routes>
          <Route path='/' element={<Home></Home>} />
          <Route path='/login' element={<Login></Login>} />
          <Route path='/VerifyEmail' element={<EmailVarify></EmailVarify>} />
          <Route path='/Forgetpassword' element={<ForgotPassword></ForgotPassword>} />
          <Route path='/Signup' element={<Signup></Signup>} />
          <Route path='/verify-auth' element={<VerifyOTP></VerifyOTP>} />
          <Route path='/navbar' element={<Navbar></Navbar>} />
          <Route path='/footer' element={<Footer></Footer>} />
          <Route path='/dashboard' element={<DashboardLayout></DashboardLayout>} />

          <Route path='/topheader' element={<TopHeader></TopHeader>} />

          <Route path='/sidebar' element={<SidebarComponent></SidebarComponent>} />



     

      </Routes>
      
      <ToastProvider></ToastProvider>
    </div>
  )
}

export default App
