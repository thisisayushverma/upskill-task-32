import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      <h1>Main file</h1>
      <Outlet/>
    </>
  )
}

export default App
