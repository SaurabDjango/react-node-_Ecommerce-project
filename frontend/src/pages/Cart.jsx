import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import '../css/product.css'
import { FcRefresh } from "react-icons/fc";
import { MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { removeCart, incrementQuantity, setTotalAmount } from '../redux/cartSlice'
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cart() {

    const cart = useSelector((state) => state.cart.cart); // to get entire cart
    const cartCount = useSelector((state) => state.cart.cartItemCount);
    const [getQnatity, setQuantity] = useState({ quantity: "" });
    const [getTotal, setTotal] = useState();
    const dispatch = useDispatch();
    useEffect(() => {
        //console.log("=====Cart Data", cart);
    }, [cart]);

    const removeCartData = (id) => {
        dispatch(removeCart(id));
        let me = showToast();
        me.productDeleted();
    };

    const changeQuantity = (event, id) => {
        const { value } = event.target;
        setQuantity((prevQuantity) => ({
            ...prevQuantity,
            [id]: parseInt(value)
        }));
    };

    const handleQuantity = (id) => {
        const qun = getQnatity[id] || 1;
        dispatch(incrementQuantity({ id, quantity: qun }));
    };
    var total = 0;
    useEffect(() => {
        const calculateAmount = () => {

            cart.forEach((item) => {
                total += item.Price * (getQnatity[item._id] || 1);
            });
            setTotal(total)
            dispatch(setTotalAmount(total));
        };
        calculateAmount();
    }, [cart, getQnatity, dispatch]);
    function showToast() {
        return {
            productDeleted: () => {
                toast.success("product successfully deleted from cart", { position: toast.POSITION.TOP_RIGHT })
            },
        }
    }
    return (
        <>
            <Nav />
            <main id="main" className="main">
                <ToastContainer />
                <div className="pagetitle">
                </div>
                {/* End Page Title */}
                <section className="section">
                    <section className="pt-5 pb-5">
                        <div className="container">
                            <div className="row w-100">
                                <div className="col-lg-12 col-md-12 col-12">
                                    <h3 className="display-5 mb-2 text-center">Shopping Cart</h3>
                                    <p className="mb-5 text-center">
                                        <i className="text-info font-weight-bold">{cartCount}</i> items in your cart
                                    </p>
                                    <table
                                        id="shoppingCart"
                                        className="table table-condensed table-responsive"
                                    >
                                        <thead>
                                            <tr>
                                                <th style={{ width: "60%" }}>Product</th>
                                                <th style={{ width: "12%" }}>Price</th>
                                                <th style={{ width: "10%" }}>Quantity</th>
                                                <th style={{ width: "16%" }} />
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cart.map((product) => (
                                                <tr key={product._id}>
                                                    <td data-th="Product">
                                                        <div className="row">
                                                            <div className="col-md-3 text-left">
                                                                <img
                                                                    src={`http://localhost:8080/${product.ImageUrl}`}
                                                                    alt=""
                                                                    className="img-fluid d-none d-md-block rounded mb-2 shadow "
                                                                />
                                                            </div>
                                                            <div className="col-md-9 text-left mt-sm-2">
                                                                <h4>{product.Name}</h4>
                                                                {/* <p className="font-weight-light">Brand &amp; Name</p> */}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td data-th="Price">{product.Price}</td>
                                                    <td data-th="Quantity">
                                                        <input
                                                            type="number"
                                                            className="form-control form-control-lg text-center"
                                                            defaultValue={1}
                                                            name="quantity"
                                                            value={handleQuantity.quantity}
                                                            onChange={(event) => changeQuantity(event, product._id)}
                                                        />
                                                    </td>
                                                    <td className="actions" data-th="">
                                                        <div className="text-right">
                                                            <button className="btn btn-white border-secondary bg-white btn-md mb-2" onClick={() => handleQuantity(product._id)}>
                                                                <FcRefresh />
                                                            </button>
                                                            <button className="btn btn-white border-secondary bg-white btn-md mb-2" onClick={() => removeCartData(product._id)}>
                                                                <MdDelete />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className="float-right text-right">
                                        <h4>Subtotal:</h4>
                                        <h1>{getTotal}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-4 d-flex align-items-center">
                                <div className="col-sm-6 order-md-2 text-right">
                                    <Link className="btn btn-primary mb-4 btn-lg pl-5 pr-5" to={'/Checkout'}>Checkout</Link>
                                </div>
                                <div className="col-sm-6 mb-3 mb-m-1 order-md-1 text-md-left">
                                    <Link className="fas fa-arrow-left mr-2" to={'/'}>Continue Shopping</Link>
                                </div>
                            </div>
                        </div>
                    </section>

                </section>
            </main>
        </>
    );
}
export default Cart;
