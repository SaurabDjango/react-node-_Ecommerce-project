import React, { useEffect, useState } from 'react';
import axios from "axios";
import Nav from '../components/Nav';
import { Tab, Nav as TabNav, Tabs } from "react-bootstrap";
import EditProfile from './EditeProfile';
import PasswordReser from './PasswordReser';

const Profile = () => {
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/userData', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'multipart/form-data'
                    },
                });

                console.log(response.data);
                if (response.data) {
                    setProfiles(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);

    return (

        <>
            <Nav />
            <main id="main" className="main" style={{ marginRight: '15%', marginTop: '-1%' }}>
                <div className="pagetitle">
                    <h1>Profile</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                            <li className="breadcrumb-item">Users</li>
                            <li className="breadcrumb-item active">Profile</li>
                        </ol>
                    </nav>
                </div>
                {/* End Page Title */}
                <section className="section profile">
                    <div className="row">
                        <div className="col-xl-4">
                            <div className="card">
                                <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                                    {Array.isArray(profiles) && profiles.length > 0 && (
                                        <img src={`http://localhost:8080/${profiles[0].imageUrl}`} alt="Profile" className="rounded-circle" />
                                    )}
                                    <h2>Kevin Anderson</h2>
                                    <h3>Web Designer</h3>
                                    <div className="social-links mt-2">
                                        <a href="#" className="twitter"><i className="bi bi-twitter"></i></a>
                                        <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
                                        <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
                                        <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-8">
                            <div className="card">
                                <div className="card-body pt-3">
                                    <Tabs defaultActiveKey="profile-overview" id="profile-tabs">
                                        <Tab eventKey="profile-overview" title="Overview">

                                            <div className="tab-pane fade show active profile-overview" id="profile-overview">
                                                <h5 className="card-title">Profile Details</h5>

                                                <div className="row">
                                                    <div className="col-lg-3 col-md-4 label">Full Name</div>
                                                    <div className="col-lg-9 col-md-8">{profiles.Name}</div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-lg-3 col-md-4 label">LastName</div>
                                                    <div className="col-lg-9 col-md-8">{profiles.LastName}</div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-lg-3 col-md-4 label">Email</div>
                                                    <div className="col-lg-9 col-md-8">{profiles.Email}</div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-lg-3 col-md-4 label">State</div>
                                                    <div className="col-lg-9 col-md-8">{profiles.State}</div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-lg-3 col-md-4 label">Address</div>
                                                    <div className="col-lg-9 col-md-8">{profiles.Address}</div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-lg-3 col-md-4 label">Zip</div>
                                                    <div className="col-lg-9 col-md-8">{profiles.Zip}</div>
                                                </div>

                                            </div>
                                        </Tab>

                                        <Tab eventKey="profile-edit" title="Edit Profile">
                                            <EditProfile />
                                        </Tab>
                                        {/* <Tab eventKey="profile-settings" title="Settings">
                                        </Tab> */}
                                        <Tab eventKey="profile-change-password" title="Change Password">
                                            <PasswordReser />
                                        </Tab>

                                    </Tabs>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default Profile;
