// import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Register from './pages/Register';
import Login from './pages/Login';
import CitySelector from './pages/city';
import Checkout from './pages/Checkout';
import EditProfile from './pages/EditeProfile';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import VerifyOtp from './pages/VerifyOtp';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
import withLoader from './components/Loader';
const stripePromise = loadStripe("pk_test_51NDPxlSJKAJpVQukggtPz9Eg15jzThs02b5ViLv8kjP683H7zIGmsqncfbfHB8Bu7c1CxzzII95qSyOETb5iM3ad007vGcSPKl");

function App() {
  return (
    <Provider store={store}>
      <>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/city" element={<CitySelector />} />
          <Route path="/Orders" element={<Orders />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/EditProfile" element={<EditProfile />} />
          <Route path="/VerifyOtp" element={<VerifyOtp />} />
          <Route path="/Checkout" element={
          <Elements stripe={stripePromise}>
            <Checkout />
          </Elements>
        } />
        
        </Routes>
      </>
    </Provider>
  );
}

export default withLoader(App);
