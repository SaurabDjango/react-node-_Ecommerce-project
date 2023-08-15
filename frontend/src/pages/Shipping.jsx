import axios from "axios";
import Nav from "../components/Nav";
import { useEffect, useState } from "react";

function Shipping() {
  const [getData, setData] = useState({
    Name: "",
    LastName: "",
    Email: "",
    State: "",
    Address: "",
    Zip: "",
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
          setData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const handleInput = (event) => {
    setData({
      ...getData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8080/update", getData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Nav />
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
                  <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                      <label htmlFor="inputText" className="col-sm-2 col-form-label">
                        Name
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          name="Name"
                          value={getData.Name}
                          onChange={handleInput}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="inputText" className="col-sm-2 col-form-label">
                        Last Name
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          name="LastName"
                          value={getData.LastName}
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
                          value={getData.Email}
                          onChange={handleInput}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
                        Addr
                      </label>
                      <div className="col-sm-10">
                        <textarea
                          className="form-control"
                          style={{ height: 100 }}
                          name="Address"
                          value={getData.Address}
                          onChange={handleInput}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">Submit Button</label>
                      <div className="col-sm-10">
                        <button type="submit" className="btn btn-primary">
                          Submit Form
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

export default Shipping;
