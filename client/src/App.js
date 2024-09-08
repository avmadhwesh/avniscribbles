import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import PostList from './components/PostList';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 
import PostDetail from './components/PostDetail';
import AboutMe from './components/AboutMe';
import PostUnavailable from './components/PostUnavailable';

function App() {
    return (
        <Router>
          <Navbar />
            <Routes>
                {/* Landing page */}
                <Route path="/" element={<LandingPage />} />

                {/* indiv page routes*/}
                <Route path="/blogs" element={<PostList type="blog" />} />
                <Route path="/essays" element={<PostList type="essay" />} />
                <Route path="/creative" element={<PostList type="creative" />} />

                {/*other routes*/}
                <Route path="/posts/:id" element={<PostDetail />} />
                <Route path="/aboutme" element={<AboutMe/>} />
                <Route path="/post-unavailable" element={<PostUnavailable />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;