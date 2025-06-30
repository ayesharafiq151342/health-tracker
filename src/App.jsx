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
import MealTracker from './pages/meals';
import {TopHeader} from './components/topheader';
import {SidebarComponent} from './components/sidebar'
import Exercise from './pages/exercise';
import MedicalRecords from './pages/mealrecord';
import Suggestions from './pages/suggestions';
import Reminder from './pages/reminder';
import Editexercise from './pages/Editexercise';
import EditMeals from './pages/editMeals';
import EditMedicalRecord from './pages/editMedicalRecord';
import Goal from './pages/goal'
import Dashboard from './pages/admin/dashboard';
import { SidebarComponentbyadmin } from './pages/admin/sidebar_admin';
import { TopHeaderbyadmin } from './pages/admin/topHeaderby-admin';



const App = () => { 
  return (
    <div>
      <Routes>
        
          <Route path='/' element={<Home></Home>} />
          <Route path='/goal' element={<Goal></Goal>} />

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
          <Route path='/meals' element={<MealTracker></MealTracker>} />

          <Route path='/exercise' element={<Exercise></Exercise>} />
          <Route path='/MedicalRecords' element={<MedicalRecords></MedicalRecords>} />
          <Route path='/suggestions' element={<Suggestions></Suggestions>} />
          <Route path='/reminder' element={<Reminder></Reminder>} />
          <Route path='/editexercise/:eid' element={<Editexercise></Editexercise>}></Route>
          <Route path='/editMeals/:id' element={<EditMeals></EditMeals>}></Route>
          <Route path='/editMedicalRecord/:id' element={<EditMedicalRecord></EditMedicalRecord>}></Route>

          <Route path='/admin/dashboard' element={ <Dashboard> </Dashboard> }>  </Route>
          <Route path='/admin/sidebar_admin' element={<SidebarComponentbyadmin> </SidebarComponentbyadmin> }>  </Route>
          <Route path='/admin/topHeaderby-admin' element={<TopHeaderbyadmin> </TopHeaderbyadmin> }>  </Route>




     

      </Routes>
      
      <ToastProvider></ToastProvider>
    </div>
  )
}

export default App
