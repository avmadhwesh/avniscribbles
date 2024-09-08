import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PostDetail.css';  
import profileImage from './images/pfp2.jpg';  // pfp authors notes
import TAGS from '../tags';  // import tags const

const PostDetail = () => {
    const { id } = useParams();  // Fetch post ID
    const [post, setPost] = useState(null);
    const [showNotes, setShowNotes] = useState(false);  // Toggle for authors notes

    useEffect(() => {
        fetch(`http://localhost:5000/api/posts/post/${id}`)
            .then(response => response.json())
            .then(data => setPost(data))
            .catch(error => console.error('Error fetching post:', error));
    }, [id]);

    if (!post) {
        return <div>Loading...</div>;  
    }

    //render contents
    const renderContent = (post) => {

        // Handling field fcontent (formatted content type object array)
        if (Array.isArray(post.fcontent)) {
            return post.fcontent.map((block, index) => {
                if (block.type === 'paragraph') {
                    const paragraphs = block.text.split('\n\n'); //test
                    return paragraphs.map((paragraphs, i) => (
                        <p key={`${index}-${i}`}>{paragraphs}</p>  // para render
                    ));
                }
                if (block.type === 'image' && getImage(block.url)) {
                    return (
                        <div key={index} className="post-image-container">
                            <img src={getImage(block.url)} alt="Post Visual" className="post-image" />
                            <p className="image-caption">{block.caption}</p>
                        </div>
                    );
                }
                return null;  // Skip unsupported block types
            });
        }

        // DEFAULT: handle field "content" (type string)
        if (typeof post.content === 'string') {
            const paragraphs = post.content.split('\n\n');
            return paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>  //print in paragraph form
            ));
        }

        return null;  // in case no "content" nor "fcontent"
    };

    const getImage = (imageName) => {
        try {
            return require(`./images/${imageName}`);
        } catch (err) {
            console.error(`Image not found: ${imageName}`);
            return null;
        }
    };


    const authorNotes = post.notes ? post.notes.split('\n\n') : [];  // author's notes splitter
    const firstLineOfNotes = authorNotes.length > 0 ? authorNotes[0] : '';
    const RANDOM_COLORS = ['#5C573E','#A5B452','#C8D96F','#C4F7A1','#9BA7C0','#545F66','#829399','#D0F4EA','#36453B','#596869','#C2C1A5','#A7B0CA','#E8C0917','#CB754B','#97B09B','#E9D4AC'];



           // tag cleaning utility function; imported from postlist
           const processTags = (tags) => { 
            if (!Array.isArray(tags)) return [];  
            const uniqueTags = [...new Set(tags.filter(tag => tag && tag.trim() !== ''))];  //remove dupes
            return uniqueTags; 
        };
    
        
            const getRandomColor = () => {
                return RANDOM_COLORS[Math.floor(Math.random() * RANDOM_COLORS.length)]; 
            };
    

    return (
        <div className="post-detail-container">
            <h1>{post.title}</h1>
            <p className="post-meta">Published on {new Date(post.createdAt).toLocaleDateString()}</p>

            <div className="post-content">
                {renderContent(post)}  {/* content rendering */}
            </div>

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


            {/* Author's Notes */}
            {post.notes && (
                <div className="author-notes-section">
                    <div className="author-notes-header">
                        <img src={profileImage} alt="Avni's Profile" className="icon" />  {/* author pfp */}
                        <h3>Author's Notes</h3>
                    </div>

                    <div className="notes-content">
                        {showNotes ? (
                            <>
                                {authorNotes.map((note, index) => (
                                    <p key={index}>{note}</p>  // Render full authors notes
                                ))}
                                <span className="close-notes" onClick={() => setShowNotes(false)}> (close)</span>
                            </>
                        ) : (
                            <p>
                                {firstLineOfNotes}
                                {authorNotes.length > 1 && (
                                    <span className="read-more" onClick={() => setShowNotes(true)}> ...</span>
                                )}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostDetail;
