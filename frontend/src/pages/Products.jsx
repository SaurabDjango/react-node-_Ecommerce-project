// Products.js

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, setCart } from '../redux/cartSlice';
import axios from 'axios';
import Nav from '../components/Nav';
import '../css/product.css';
import { AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Products() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart || []); // Initialize cart as an empty array
  const cartItemCount = useSelector((state) => state.cart.cartItemCount);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
        const response = await axios.get('http://localhost:8080/getProducts', {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          });
          setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [navigate]);

  useEffect(() => {
    // Load cart data from local storage
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        dispatch(setCart(JSON.parse(storedCart)));
      } catch (error) {
        console.error(error);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    // Save cart data to local storage
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  //toast messages

  function showToast() {
    return {
      productAdded: () => {
        toast.success("Product added to the cart",{position: toast.POSITION.TOP_LEFT});
      },
      haveProduct: () => {
        toast.info("Product already added in cart", {position: toast.POSITION.TOP_LEFT})
      }
    };
  }
  const handleAddToCart = (productId) => {
    const selectedProduct = products.find((product) => product._id === productId);
  
    // Check if the selected product is already in the cart
    const isAlreadyAdded = cart.some((item) => item._id === productId);
    let messages = showToast();
    if (isAlreadyAdded) {
      messages.haveProduct();      
    } else {
      dispatch(addToCart(selectedProduct));
      messages.productAdded();
    }
  };

  return (
    <>
      <div>
        <Nav cartItemCount={cartItemCount} />
      </div>
    
      <main id="main" className="main">
      <ToastContainer />
        <div className="pagetitle">
          <h1>Home Page</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to={'/'}>Home</Link>
              </li>
            </ol>
          </nav>
        </div>
        {/* End Page Title */}
        <section className="section">
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
            crossOrigin="anonymous"
          />
          <div className="container bg-white">
            <div className="row">
              {products.map((product) => (
                <div
                  className="col-lg-3 col-sm-6 d-flex flex-column align-items-center justify-content-center product-item my-3"
                  key={product._id}
                >
                  <div className="product">
                    <img src={`http://localhost:8080/${product.ImageUrl}`} alt="" />
                    <ul className="d-flex align-items-center justify-content-center list-unstyled icons">
                      <li className="icon mx-3">
                        <AiOutlineHeart />
                      </li>
                      <li className="icon mx-3">
                        <span className="fas fa-shopping-bag" />
                        <AiOutlineShoppingCart onClick={() => handleAddToCart(product._id)} />
                      </li>
                    </ul>
                  </div>
                  {/* <div className="tag bg-red">sale</div> */}
                  <div className="title pt-4 pb-1">{product.Name}</div>
                  <div className="price">{product.Price}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Products;
