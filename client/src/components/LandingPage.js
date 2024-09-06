import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; 

const LandingPage = () => {
    return (
        <div className="landing-container">
            {/* <nav className="navbar navbar-expand-lg navbar-light bg-light"> */}
            {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">avniscribbles</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/blogs">Blogs</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/essays">Essays</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/creative">Creative Writing</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav> */}

            {/* Main content: Only the centered 'avniscribbles' text with typewriter effect */}
            <div className="main-content">
                
                <h1 className="typewriter">avniscribbles </h1>

                <li className="nav-item">
                                <Link className="nav-link" to="/aboutme">about me</Link>
                            </li>
            </div>
        </div>
    );
};

export default LandingPage;
