import React, { useEffect } from 'react';
import './AboutMe.css';
import profileImage from './images/pfp2.jpg';

const AboutMe = () => {

    useEffect(() => {
        const elements = document.querySelectorAll('.top-panel, .bottom-panel');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');  // in view -> fade
                }
            });
        });

        elements.forEach(element => {
            observer.observe(element);  
        });

        return () => {
            elements.forEach(element => observer.unobserve(element));  
        };
    }, []);

    return (
        <div className="about-me-container">
            {/* Top panel */}
            <div className="top-panel">
                <div className="profile-picture-container">
                    <img src={profileImage} alt="Avni's Profile" className="profile-picture" />
                </div>
                <div className="greeting">
                    <h1>Hi, I'm Avni.</h1>
                </div>
            </div>

            {/* Bottom panel with blurb */}
            <div className="bottom-panel">
                <p>
                    I'm a passionate writer with a love for creative expression. Over the years, I've developed a deep 
                    interest in exploring different genres, including essays, blogs, and creative writing. 
                </p>
                <p>
                    Whether I'm writing analytical pieces that dive into the intricacies of life, or creating imaginative 
                    works that allow the mind to wander, my goal is to inspire and connect with readers from all walks of life.
                </p>
                <p>
                    Through my journey, I've come to understand the power of words in shaping perspectives and creating change, 
                    and I'm excited to share my thoughts and creations with you.
                </p>
            </div>
        </div>
    );
};

export default AboutMe;
