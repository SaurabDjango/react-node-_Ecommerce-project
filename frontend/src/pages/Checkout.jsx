import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import Nav from '../components/Nav';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearCart } from '../redux/cartSlice';

function Checkout() {
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const cart = useSelector((state) => state.cart.cart);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sameAddress, setSameAddress] = useState(false);

  // for get existing address or update address
  const [userData, setUserData] = useState({
    Name: '',
    LastName: '',
    Email: '',
    State: '',
    City: '',
    Country: '',
    Address: '',
    Zip: '',
    BillingAddress: '',
    BillingCity: '',
    BillingState: '',
    BillingCountry: '',
    BillingZip: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/userData", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response.data);
        if (response.data) {
          setUserData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleInput = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const showToastMessage = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER
    });
  };

  //set Billing address 
  const handleCheckboxChange = (event) => {
    setSameAddress(event.target.checked);
    if (event.target.checked) {
      // Set billing address same as shipping address
      setUserData((prevUserData) => ({
        ...prevUserData,
        BillingAddress: prevUserData.Address,
        BillingCity: prevUserData.City,
        BillingState: prevUserData.State,
        BillingCountry: prevUserData.Country,
        BillingZip: prevUserData.Zip,
      }));
    } else {
      // Clear billing address fields
      setUserData((prevUserData) => ({
        ...prevUserData,
        BillingAddress: '',
        BillingCity: '',
        BillingState: '',
        BillingCountry: '',
        BillingZip: '',
      }));
    }
  };
  const handlePayment = async (event) => {
    event.preventDefault();
    const cardElement = elements.getElement(CardElement);
    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (result.error) {
      console.error(result.error.message);
      return;
    }

    const paymentMethodId = result.paymentMethod.id;

    try {
      const response = await axios.post('http://localhost:8080/charge', {
        paymentMethodId,
        amount: 200,
        currency: 'USD',
      });

      if (response.data.success) {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            navigate('/login');
            return;
          }
          const orderData = { cart, totalAmount };
          const orderResponse = await axios.post('http://localhost:8080/order', orderData, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          console.log('Order created successfully', orderResponse.data);
          showToastMessage('Order created successfully');
          setTimeout(() => { // Delay the navigation using setTimeout
            navigate('/');
          }, 1000);
        } catch (error) {
          console.error('Error occurred during order creation:', error);
          showToastMessage('Error occurred during order creation');
        }
      } else {
        alert('Payment failed');
        console.log('Payment failed');
        showToastMessage('Payment failed');
      }
    } catch (error) {
      console.error('Error occurred during payment:', error);
      showToastMessage('Error occurred during payment');
    }

    try {
      debugger;
      const data = {userData, totalAmount,paymentMethodId}
      const token = localStorage.getItem('token');
      const addressResponse = await axios.post('http://localhost:8080/billing', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      //console.log('Order created successfully', addressResponse.data);
    } catch (error) {
      console.error('Error occurred during order creation:', error);
    }
    dispatch(clearCart());
  };

  return (
    <>
      <Nav />
      <ToastContainer />
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Form Elements</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li className="breadcrumb-item">Forms</li>
              <li className="breadcrumb-item active">Elements</li>
            </ol>
          </nav>
        </div>
        {/* End Page Title */}
        <section className="section">
          <div className="row">
            <div className="col-lg-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Shipping Address</h5>
                  {/* General Form Elements */}
                  <form onSubmit={handlePayment}>
                    <div className="row mb-3">
                      <label htmlFor="inputText" className="col-sm-2 col-form-label">
                        Name
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          name="Name"
                          value={userData.Name}
                          onChange={handleInput}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="inputText" className="col-sm-2 col-form-label">
                        <h6>Sir Name</h6>
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          name="LastName"
                          value={userData.LastName}
                          onChange={handleInput}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="inputEmail" className="col-sm-2 col-form-label">
                        Email
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="email"
                          className="form-control"
                          name="Email"
                          value={userData.Email}
                          onChange={handleInput}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
                        <h6>Address</h6>
                      </label>
                      <div className="col-sm-10">
                        <textarea
                          className="form-control"
                          style={{ height: 100 }}
                          name="Address"
                          value={userData.Address}
                          onChange={handleInput}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="inputEmail" className="col-sm-2 col-form-label">
                        City
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          name="City"
                          value={userData.City}
                          onChange={handleInput}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="inputEmail" className="col-sm-2 col-form-label">
                        <h6>State</h6>
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          name="Country"
                          value={userData.State}
                          onChange={handleInput}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="inputEmail" className="col-sm-2 col-form-label">
                        <h6>Country </h6>
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          name="Country"
                          value={userData.Country}
                          onChange={handleInput}
                        />
                      </div>
                    </div>
                  </form>
                  {/* End General Form Elements */}
                </div>

                {/* Billing address */}
                <div className="card-body">
                  <h5 className="card-title">Billing Address</h5>
                  <form onSubmit={handlePayment}>
                  <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                        onChange={handleCheckboxChange}
                      />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        Same as Above
                      </label>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="inputText" className="col-sm-2 col-form-label">
                        <h6>Billing Address</h6>
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          name="BillingAddress"
                          value={sameAddress ? userData.Address : userData.BillingAddress}
                          onChange={handleInput}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="inputText" className="col-sm-2 col-form-label">
                        <h6>Billing City</h6>
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          name="BillingCity"
                          value={sameAddress ? userData.City : userData.BillingCity}
                          onChange={handleInput}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="inputText" className="col-sm-2 col-form-label">
                        <h6>Billing State</h6>
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          name="BillingState"
                          value={sameAddress ? userData.State : userData.BillingState}
                          onChange={handleInput}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="inputText" className="col-sm-2 col-form-label">
                        <h6>Billing Country</h6>
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          name="BillingCountry"
                          value={sameAddress ? userData.Country : userData.BillingCountry}
                          onChange={handleInput}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="inputText" className="col-sm-2 col-form-label">
                        <h6>Billing ZIP</h6>
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          name="BillingZip"
                          value={sameAddress ? userData.Zip : userData.BillingZip}
                          onChange={handleInput}
                        />
                      </div>
                    </div>
                  </form>
                </div>
                {/* End Billing address */}
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Initiate Payment</h5>
                  <div style={{ marginBottom: '2%' }}>
                    <h1>$ <span>{totalAmount}</span></h1>
                  </div>
                  {/* Advanced Form Elements */}
                  <form onSubmit={handlePayment}>
                    <div className="row mb-5">
                      <CardElement />
                    </div>

                    <div className="row mb-3">
                      <div className="col-sm-10">
                        <button type="submit" className="btn btn-primary">
                          Pay Now
                        </button>
                      </div>
                    </div>
                  </form>
                  {/* End General Form Elements */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Checkout;