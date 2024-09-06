import React from 'react';
import './Footer.css'; 

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <p className="footer-text">© {new Date().getFullYear()} avniscribbles. All rights reserved.</p>
                <ul className="footer-links">
                    <li><a href="https://yourwebsite.com/privacy">Privacy Policy</a></li>
                    <li><a href="https://yourwebsite.com/terms">Terms of Service</a></li>
                    <li><a href="https://yourwebsite.com/contact">Contact</a></li>
                    <li><a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                    <li><a href="https://facebook.com/yourpage" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                    <ul className="footer-links">
                </ul>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
