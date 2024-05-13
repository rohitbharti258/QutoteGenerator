import React from 'react'
import "../App.css";
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from "axios";
import Spinner from "../Spinner";

import { useEffect, useState } from 'react'
const Quote = () => {
    const day = new Date().getDay();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const [Advice, setAdvice] = useState(null);
    const [Data, setData] = useState({});
    const [isLoading, setLoading] = useState(true);

    const fetchQuotes = async () => {
        setLoading(true);
        try {
            fetch("http://localhost:5000/getquote")
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    const arraySize = data.length;
                    const randomIndex = Math.floor(Math.random() * arraySize);
                    setAdvice(data[randomIndex].data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        }
        catch (err) {
            console.log(err);
        }
    }

    const fetchAdvice = async () => {
        try{

            const res = await axios.get("https://api.adviceslip.com/advice")
            
            const quoteData = res.data.slip.advice;
            console.log(quoteData);
            const temp = {
                "data": quoteData
            }
            console.log(temp.data);
            fetch("http://localhost:5000/addquote", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(temp)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
            }
            catch(error){
                console.error('There was a problem with the fetch operation:', error);
            }

    }
    useEffect(() => {
        fetchAdvice();
        fetchQuotes();
    }, []);
    return (
        <>
            <div className="app">
                {isLoading ? <div className="card"><Spinner /></div> :
                    <div className="card">
                        <FaQuoteLeft className="iconleft" />
                        <h2 className="day">Quote of the {days[day]}</h2>
                        <h1 className="heading">{Advice}</h1>
                        <FaQuoteRight className="iconright" />
                        <button className="button" onClick={fetchQuotes} disabled={isLoading} >
                            <span>Generate quote</span>
                        </button>
                    </div>
                }
                <div className='addButton'>
                    <button>
                        <Link to='/add'>Add Quote</Link>
                    </button>
                </div>
            </div>


        </>
    )
}

export default Quote;