import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage'
import BuyTicketPage from './pages/BuyTicketPage'
import MoviePage from './pages/MoviePage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import PaymentDetailPage from './pages/PaymentDetailPage'
import SeatPage from './pages/SeatPage'
import TicketResultPage from './pages/TicketResultPage'
import ProfilePage from './pages/ProfilePage'
import DashboardPage from './pages/DashboardPage'
import ListMovieAdminPage from './pages/ListMovieAdminPage'
import AddNewMoviePage from './pages/AddNewMoviePage'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import ProfileLayout from './components/ProfileLayout'
import HistoryTransactionPage from './pages/HistoryTransactionPage'
import EditMoviePage from './pages/EditMoviePage'

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
    path: '/buy-ticket/:id/ticket-result',
    element: (
      <>
        <TicketResultPage/>
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
  }, {
    path: '/profile',
    element: <ProfileLayout/>,
    children: [
      {
        path: '/profile/edit-profile',
        element: <ProfilePage/>
      }, {
        path: '/profile/history-transaction',
        element: <HistoryTransactionPage/>
      }
    ]
  }, {
    path: '/dashboard',
    element: (
      <>
        <DashboardPage/>
      </>
    )
  }, {
    path: '/list-movie',
    element: (
      <>
        <ListMovieAdminPage/>
      </>
    )
  }, {
    path: '/add-movie',
    element: (
      <>
        <AddNewMoviePage/>
      </>
    )
  }, {
    path: '/dashboard-admin',
    element: (
      <>
        <DashboardPage/>
      </>
    )
  }, {
    path: '/edit-movie/:id',
    element: (
      <>
        <EditMoviePage/>
      </>
    )
  }
])

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router}/>
      </PersistGate>
    </Provider>
  )
}

export default App