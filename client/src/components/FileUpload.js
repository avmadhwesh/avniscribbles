import React, { useState } from 'react';
import axios from 'axios';
import './FileUpload.css';

function FileUpload() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setError(null);

        if (!selectedFile) return;

        if (!selectedFile.name.endsWith('.doc') && !selectedFile.name.endsWith('.docx')) {
            setError('Please upload a .doc or .docx file');
            return;
        }

        // Get preview
        const formData = new FormData();
        formData.append('document', selectedFile);

        try {
            setLoading(true);
            const response = await axios.post('/api/preview', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setPreview(response.data);
        } catch (err) {
            setError('Preview failed: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a file');
            return;
        }

        const formData = new FormData();
        formData.append('document', file);

        setLoading(true);
        try {
            const response = await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Upload successful:', response.data);
            setFile(null);
            setPreview(null);
        } catch (err) {
            setError('Upload failed: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const renderPreviewContent = (content) => {
        if (!content) return null;

        return content.fcontent.map((item, index) => {
            switch (item.type) {
                case 'header':
                    const HeaderTag = `h${item.level}`;
                    return <HeaderTag key={index}>{item.text}</HeaderTag>;
                
                case 'paragraph':
                    if (item.content) {
                        return (
                            <p key={index}>
                                {item.content.map((contentItem, contentIndex) => {
                                    if (contentItem.type === 'ftext') {
                                        return (
                                            <span 
                                                key={contentIndex}
                                                style={{
                                                    fontStyle: contentItem.style === 'italic' ? 'italic' : 'normal',
                                                    fontWeight: contentItem.style === 'bold' ? 'bold' : 'normal'
                                                }}
                                            >
                                                {contentItem.text}
                                            </span>
                                        );
                                    }
                                    return <span key={contentIndex}>{contentItem.text}</span>;
                                })}
                            </p>
                        );
                    }
                    return <p key={index}>{item.text}</p>;

                case 'list':
                    const ListTag = item.listType === 'bullet' ? 'ul' : 'ol';
                    return (
                        <ListTag key={index}>
                            {item.items.map((listItem, itemIndex) => (
                                <li key={itemIndex}>{listItem}</li>
                            ))}
                        </ListTag>
                    );

                case 'image':
                    return (
                        <figure key={index}>
                            <img src={item.src} alt={item.alt} />
                            {item.caption && <figcaption>{item.caption}</figcaption>}
                        </figure>
                    );

                default:
                    return <p key={index}>{item.text}</p>;
            }
        });
    };

    return (
        <div className="upload-container">
            <h2>Upload Document</h2>
            <form onSubmit={handleUpload}>
                <input 
                    type="file" 
                    accept=".doc,.docx" 
                    onChange={handleFileChange}
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Processing...' : 'Upload'}
                </button>
            </form>
            {error && <p className="error">{error}</p>}
            
            {preview && (
                <div className="preview-container">
                    <h3>Preview</h3>
                    <div className="preview-content">
                        {renderPreviewContent(preview)}
                    </div>
                </div>
            )}
        </div>
    );
}

export default FileUpload; 