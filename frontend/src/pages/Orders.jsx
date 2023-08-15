import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';

function Orders() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
        }

        const response = await axios.get('http://localhost:8080/detail', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log("====", response.data);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {/* <h1>Orders</h1>
      <ul>
        {data.map((orderDetail, index) => (
          <li key={index}>
            <p>Product: {orderDetail.Name}</p>
            <p>Price: {orderDetail.Price}</p>
            <img src={`http://localhost:8080/${orderDetail.ImageUrl}`} />
          </li>
        ))}
      </ul> */}
      <Nav />
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Your Orders</h1>
        </div>
        <section className="section dashboard">
          <div className="row">
            <div className="col-lg-12">
              <div className="row">

                <div className="col-12">
                  <div className="card top-selling overflow-auto">
                    <div className="filter">
                      <a className="icon" href="#" data-bs-toggle="dropdown">
                        <i className="bi bi-three-dots" />
                      </a>
                      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li className="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Today
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            This Month
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            This Year
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="card-body pb-0">
                      <h5 className="card-title">
                        Top Selling <span>| Today</span>
                      </h5>
                      <table className="table table-borderless">
                        <thead>
                          <tr>
                            <th scope="col">Preview</th>
                            <th scope="col">Product</th>
                            <th scope="col">Date</th>
                            <th scope="col">Price</th>
                          </tr>
                        </thead>
                        <tbody>
                        {data.map((item,index) => (
                          <tr key={index}>
                            <th scope="row">
                            <img src={`http://localhost:8080/${item.ImageUrl}`} alt="" />
                            </th>
                            <td>
                              <p className="text-primary fw-bold">
                                {item.Name}
                              </p>
                            </td>
                            <td>{item.date}</td>
                            <td>$ {item.Price}</td>
                            {/* <td className="fw-bold">124</td>
                            <td>$5,828</td> */}
                          </tr>
                        ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Orders;
