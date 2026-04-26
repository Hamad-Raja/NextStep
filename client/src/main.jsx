import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import App from './App'
import Home from './pages/Home'
import Shop from './pages/Shop'
import About from './pages/About'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Register from './pages/Register'
import ProfileScreen from './pages/ProfileScreen'
import OrderDetail from './pages/OrderDetail'
import AdminDashboard from './pages/admin/AdminDashboard'
import ProductListScreen from './pages/admin/ProductListScreen'
import OrderListScreen from './pages/admin/OrderListScreen'
import ProductEditScreen from './pages/admin/ProductEditScreen'
import { PrivateRoute, AdminRoute } from './components/RouteGuards'
import './index.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Public Routes */}
      <Route index element={<Home />} />
      <Route path="shop" element={<Shop />} />
      <Route path="product/:id" element={<ProductDetail />} />
      <Route path="cart" element={<Cart />} />
      <Route path="about" element={<About/>} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      {/* Private Routes (must be logged in) */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="checkout" element={<Checkout />} />
        <Route path="profile" element={<ProfileScreen />} />
        <Route path="order/:id" element={<OrderDetail />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="productlist" element={<ProductListScreen />} />
        <Route path="orderlist" element={<OrderListScreen />} />
        <Route path="product/:id/edit" element={<ProductEditScreen />} />
      </Route>
    </Route>
  ),
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
