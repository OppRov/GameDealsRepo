import React from 'react'
import SearchPage from "./Pages/SearchPage"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


function App() {


  const appRoutes = [
    {
      path: '/',
      element: <SearchPage />
    },
  ]

  const router = createBrowserRouter(appRoutes)

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
