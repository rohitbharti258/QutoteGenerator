import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const Addquote = () => {
    const [quote, setQuote] = useState('');
    const navigate = useNavigate();
    const handleInputChange = (event) => {
        setQuote(event.target.value);
    };

    const handleAddQuote = async () => {
        const sendData ={
            "data":quote
        }
        fetch("http://localhost:5000/addquote", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sendData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                alert("Quote added SuccesFully, redirectinng to home Page in a sec")
                setTimeout(()=>{
                    navigate('/');
                },2000)
                
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };
    return (
        <>
            <div className="add-quote-container">
                <div className="add-quote-title">Add Quote</div>
                <div className="add-quote-input-container">
                    <input
                        type="text"
                        placeholder="Enter your quote"
                        value={quote}
                        onChange={handleInputChange}
                        className="add-quote-input"
                    />

                </div>
                <div className='buttondiv'>
                    <button onClick={handleAddQuote} className="add-quote-button">Add Quote</button>
                </div>
            </div>
        </>
    )
}

export default Addquote;