import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './PostList.css';  
import TAGS from '../tags';  // import tags const

const RANDOM_COLORS = ['#5C573E','#A5B452','#C8D96F','#C4F7A1','#9BA7C0','#545F66','#829399','#D0F4EA','#36453B','#596869','#C2C1A5','#A7B0CA','#E8C0917','#CB754B','#97B09B','#E9D4AC'];

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



    // TO CHANGE WHEN DEPLOYED!
    useEffect(() => {
        fetch(`http://localhost:5000/api/posts/${type}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }
                return response.json();
            })
            .then((data) => {
                // if DEPLOYED is true, filter out posts marked as DEV
                const filteredPosts = DEPLOYED ? data.filter(post => !post.dev) : data;

                setPosts(filteredPosts);
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);
            });
    }, [type]);



    // Scroll-triggered fade-in effect
    useEffect(() => {
        const postEntries = document.querySelectorAll('.post-entry');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');  // fades in when scrolled to
                }
            });
        });

        postEntries.forEach(post => observer.observe(post));

        return () => {
            postEntries.forEach(post => observer.unobserve(post)); 
        };
    }, [posts]);



       // tag cleaning utility function
       const processTags = (tags) => { 
        if (!Array.isArray(tags)) return [];  
        const uniqueTags = [...new Set(tags.filter(tag => tag && tag.trim() !== ''))];  //remove dupes
        return uniqueTags; 
    };

    
        const getRandomColor = () => {
            return RANDOM_COLORS[Math.floor(Math.random() * RANDOM_COLORS.length)]; 
        };


//output
    return (
        <div className="post-list-page">

            {/* Left panel */}
            <div className="left-panel">
                <h2>{title}</h2>
                <p className="section-blurb">{blurb}</p>
            </div>



            {/* Right side: posts list*/}
            <div className="post-list-container">
                <div className="post-list">
                {posts.length > 0 ? (  // Check if there are posts
                    // {posts.map(post => (
                    posts.map(post => (    
                        <div className="post-entry" key={post._id}>
                            <h3>{post.title || "Untitled"}</h3>


                                {/* originally type p not div */}
                                <div className="post-date">
                                    {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Unknown date'}
                                </div>



                            {/* TO REFACTOR! */}

                            {/* originally type p not div */}
                            <p>
                            {typeof post.content === 'string' && post.content.trim().length > 0
                                ? post.content.length > 150
                                ? post.content.slice(0, 150) + '...'
                                : post.content
                                : Array.isArray(post.fcontent) && post.fcontent.length > 0
                                ? (() => {
                                    const paragraphBlock = post.fcontent.find(block => block.type === 'paragraph');
                                    return paragraphBlock?.text.length > 150
                                    ? paragraphBlock.text.slice(0, 150) + '...'
                                    : paragraphBlock?.text || "No content available...";
                                })()
                                : "No content available..."}
                            </p>


                            {/* <p>
                            {typeof post.content === 'string' && post.content.trim().length > 0
                                ? post.content.slice(0, 150) + '...'
                                : Array.isArray(post.fcontent) && post.fcontent.length > 0
                                ? post.fcontent.find(block => block.type === 'paragraph')?.text.slice(0, 150) + '...'
                                : "No content available..."}
                            </p> */}

                            {/* display tags*/}
                            {Array.isArray(post.tags) && (
                                <div className="tags">
                                    {processTags(post.tags).map((tag, index) => ( 
                                    // {post.tags.map((tag, index) => (

                                        <span 
                                            className="tag" 
                                            key={index} 
                                            //style={{ backgroundColor: TAGS[tag]?.color || '#000000' }}  // default tag color assignment
                                            style={{ backgroundColor: TAGS[tag]?.color || getRandomColor() }}  // tag color assignment
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <Link to={`/posts/${post._id}`} className="read-more">Read more</Link>
                        </div>
                    )) //}
                ) : (
                    <p className="no-posts-message">Nothing to see here yet, sorry!</p>  //NEW
                )}
                </div>
            </div>
        </div>
    );
};

export default PostList;

