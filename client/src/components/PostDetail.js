import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PostDetail.css';  

const PostDetail = () => {
    const { id } = useParams();  //data id fetch
    const [post, setPost] = useState(null);

    useEffect(() => {
        
        fetch(`http://localhost:5000/api/posts/post/${id}`)
            .then(response => response.json())
            .then(data => setPost(data))
            .catch(error => console.error('Error fetching post:', error));
    }, [id]);

    if (!post) {
        return <div>Loading...</div>;
    }

    const paragraphs = post.content.split('\n\n');

    return (
        <div className="post-detail-container">
            <h1>{post.title}</h1>
            <p className="post-meta">Published on {new Date(post.createdAt).toLocaleDateString()}</p>

            <div className="post-content">
                {paragraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>
        </div>
    );
};

export default PostDetail;