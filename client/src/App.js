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
// import ReadingList from './components/ReadingList';
import ReadingList from './components/ReadingList2'

function App() {
    return (
        <Router>
          <Navbar />
            <Routes>
                {/* Landing page */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/home" element={<LandingPage />} />

                {/* indiv page routes*/}
                <Route path="/blogs" element={<PostList type="blog" />} />
                <Route path="/essays" element={<PostList type="essay" />} />
                <Route path="/creative" element={<PostList type="creative" />} />
                <Route path="/scribbles" element={<PostList type="scribbles" />} />

                {/*other routes*/}
                <Route path="/posts/:id" element={<PostDetail />} />
                <Route path="/aboutme" element={<AboutMe/>} />
                <Route path="/post-unavailable" element={<PostUnavailable />} />
                <Route path="/reading-list" element={<ReadingList />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;