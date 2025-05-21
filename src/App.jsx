import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage'
import BuyTicketPage from './pages/BuyTicketPage'
import MoviePage from './pages/MoviePage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import PaymentDetailPage from './pages/PaymentDetailPage'
import SeatPage from './pages/SeatPage'

const router = createBrowserRouter ([
  {
    path: '/',
    element: (
      <>
        <HomePage/>
      </>
    )
  }, {
    path: '/movie',
    element: (
      <>
        <MoviePage/>
      </>
    )
  }, {
    path: '/buy-ticket/:id',
    element: (
      <>
        <BuyTicketPage/>
      </>
    )
  }, {
    path: '/buy-ticket/:id/payment',
    element: (
      <>
        <PaymentDetailPage/>
      </>
    )
  }, {
    path: '/buy-ticket/:id/seat',
    element: (
      <>
        <SeatPage/>
      </>
    )
  }, {
    path: '/register',
    element: (
      <>
        <RegisterPage/>
      </>
    )
  }, {
    path: '/login',
    element: (
      <>
        <LoginPage/>
      </>
    )
  }
])

function App() {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App