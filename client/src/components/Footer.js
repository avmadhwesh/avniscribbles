import React from 'react';
import './Footer.css'; 

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <p className="footer-text">© {new Date().getFullYear()} avniscribbles. All rights reserved.</p>
                <ul className="footer-links">
                    <li><a href="https://yourwebsite.com/privacy">Privacy Policy</a></li>
                    {/* <li><a href="https://yourwebsite.com/terms">Terms of Service</a></li> */}
                    <li><a href="https://github.com/avmadhwesh/avniscribbles">Source Code</a></li>
                    <li><a href="mailto:myemail@gmail.com" >Contact</a></li>
                    <li><a href="https://instagram.com/avniscribbles/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                    <li><a href="https://medium.com/@avniscribbles" target="_blank" rel="noopener noreferrer">Medium</a></li>
                    <ul className="footer-links">
                </ul>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
