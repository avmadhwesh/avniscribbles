import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; 

const LandingPage = () => {
    return (
        <div className="landing-container">
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
