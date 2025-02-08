import React from 'react'
import MainLayOut from './assets/Pages/MainLayOut/MainLayOut'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './assets/Pages/Home/Home'
import Register from './assets/Pages/register/Register'
import Login from './assets/Pages/Login/Login'
import Cart from './assets/Pages/Cart/Cart'
import Products from './assets/Pages/Product/Product'
import Categories from './assets/Pages/Categorie/Categorie'
import Brandes from './assets/Pages/Brand/Brand'
export default function App() {
  const routes=createBrowserRouter(
    [{path:"",element:<MainLayOut/>,children:[
      {index : true , element: <Home/>},
      {path: "register" , element:<Register/>},
      {path: "login" , element:<Login/>},
      {path: "cart" , element:<Cart/>},
      {path: "products" , element:<Products/>},
      {path: "categories" , element:<Categories/>},
      {path: "brands" , element:<Brandes/>},
    ]
    }]
  )
 
 
  return (
    <>
    
    
    <RouterProvider router={routes}></RouterProvider>
    </>
  )
}
