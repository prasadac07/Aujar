import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './pages/Home.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Add from './pages/Add.jsx'
import Get from './pages/Get.jsx'
import Login from './pages/auth/Login.jsx'
import SignIn from './pages/auth/SignIn.jsx'
import Book from './pages/Book.jsx'

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'element={<Layout/>}>
      <Route path='home' element={<Home/>}></Route>
      <Route path='dashboard' element={<Dashboard/>}></Route>
      <Route path='add' element={<Add/>}></Route>
      <Route path='get' element={<Get/>}>
     
        </Route>      
      <Route path='login' element={<Login/>}></Route>
      <Route path='signin' element={<SignIn/>}></Route>
      <Route path='book' element={<Book/>}>
        
        </Route>  


    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
