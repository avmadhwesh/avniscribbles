import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './PostList.css';  
import TAGS from '../tags';  

// FETCHING DEPLOYED ENVIRONMENT VAR
const DEPLOYED = process.env.REACT_APP_DEPLOYED === 'true'; 

const PostList = ({ type }) => {
    const [posts, setPosts] = useState([]);


    const getTitleAndBlurb = () => {
        switch (type) {
            case 'essay':
                return { title: 'Essays and Analytical Writings', blurb: 'topics i found excessively interesting' };
            case 'blog':
                return { title: 'Blogs and Memos', blurb: 'freeform brain dumps, thoughts, announcements.' };
            case 'creative':
                return { title: 'Creative Works', blurb: 'short stories, poems, etc.' };
            default:
                return { title: '', blurb: '' };
        }
    };

    const { title, blurb } = getTitleAndBlurb();

    useEffect(() => {
        fetch(`http://localhost:5000/api/posts/${type}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }
                return response.json();
            })
            .then((data) => {
                // If DEPLOYED is true, filter out posts marked as DEV
                const filteredPosts = DEPLOYED ? data.filter(post => !post.dev) : data;
                setPosts(filteredPosts);
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);
            });
    }, [type]);




    // Scroll fade
    useEffect(() => {
        const postEntries = document.querySelectorAll('.post-entry');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');  
                }
            });
        });

        postEntries.forEach(post => observer.observe(post));

        return () => {
            postEntries.forEach(post => observer.unobserve(post));  
        };
    }, [posts]);

    return (
        <div className="post-list-page">
           


            <div className="left-panel">
                <h2>{title}</h2>
                <p className="section-blurb">{blurb}</p>
            </div>

            
            

            <div className="post-list-container">
                <div className="post-list">
                    {posts.map(post => (
                        <div className="post-entry" key={post._id}>
                            <h3>{post.title}</h3>
                            <p>{post.content.slice(0, 150)}...</p>

                            
                            <div className="tags">
                                {post.tags && post.tags.map((tag, index) => (
                                    <span 
                                        className="tag" 
                                        key={index} 
                                        style={{ backgroundColor: TAGS[tag]?.color || '#000000' }} 
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <Link to={`/posts/${post._id}`} className="read-more">Read more</Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PostList;
