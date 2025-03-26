

import React, { useEffect, useState } from 'react';
import './ReadingList.css'; // Import for any styling

import toReadData from '../data/toRead.json';
import haveReadData from '../data/haveRead.json';
import currentlyReadingData from '../data/currentlyReading.json';

const ReadingList = () => {
    const [currentlyReading, setCurrentlyReading] = useState({ normal: [], scholarly: [] });
    const [haveRead, setHaveRead] = useState({ normal: [], scholarly: [] });
    const [toRead, setToRead] = useState({ normal: [], scholarly: [] });

    // useEffect(() => {
    //     // Fetch the data from your JSON files
    //     fetch('/data/currentlyReading.json')
    //         .then(response => response.json())
    //         .then(data => setCurrentlyReading(data))
    //         .catch(error => console.error('Error fetching Currently Reading list:', error));

    //     fetch('/data/haveRead.json')
    //         .then(response => response.json())
    //         .then(data => setHaveRead(data))
    //         .catch(error => console.error('Error fetching Have Read list:', error));

    //     fetch('/data/toRead.json')
    //         .then(response => response.json())
    //         .then(data => setToRead(data))
    //         .catch(error => console.error('Error fetching To Read list:', error));
    // }, []);
    useEffect(() => {
        // Set data directly from imported JSON files
        setToRead(toReadData);
        setHaveRead(haveReadData);
        setCurrentlyReading(currentlyReadingData);
    }, []);

    const renderList = (title, list) => (
        <div className="reading-section">
            <h2>{title}</h2>
            {/* Normal list */}
            {/* <h3>Normal</h3> */}
            {list.normal.length === 0 ? (
                <p>No entries yet!</p>
            ) : (
                <ul>
                    {list.normal.map((item, index) => (
                        <li key={index}>
                            <strong>{item.title}</strong> by {item.authors.join(', ')} ({item.year})
                            <p>{item.description}</p>
                        </li>
                    ))}
                </ul>
            )}
            {/* Scholarly sublist */}
            <h4>Scholarly</h4>
            {list.scholarly.length === 0 ? (
                <p>No scholarly entries yet!</p>
            ) : (
                <ul>
                    {list.scholarly.map((item, index) => (
                        <li key={index}>
                            <strong>{item.title}</strong> by {item.authors.join(', ')} ({item.year})
                            <p>{item.description}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );

    return (
        <div className="reading-list-container">
            <h1>My Reading List</h1>
            
            {renderList('Currently Reading', currentlyReading)}
            {renderList('Have Read', haveRead)}
            {renderList('To Read', toRead)}
        </div>
    );
};

export default ReadingList;
