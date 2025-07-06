import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Main from './components/Main/Main.jsx'
import Login from './components/Login/Login.jsx'
import Signup from './components/Signup/Signup.jsx'
import Read from './components/Read/Read.jsx'
import Upload from './components/Upload/Upload.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<Main/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='signup' element={<Signup/>}/>
      <Route path='read' element={<Read/>}/>
      <Route path='upload' element={<Upload/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
)
