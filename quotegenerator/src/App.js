import React, { useEffect, useState } from "react";
import axios from "axios";
import {FaQuoteLeft,FaQuoteRight} from 'react-icons/fa';
import "./App.css";
import Spinner from "./Spinner"

const App = () => {
  const day = new Date().getDay();
  const days =["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  // console.log(day)
  const [Advice,setAdvice]= useState(null);
  const [isLoading,setLoading] =useState(true) 
  useEffect(()=>{
   
  fetchAdvice();
},[]);
const fetchAdvice = async ()=>{
  setLoading(true);
  try{
        const res  = await axios.get("https://api.adviceslip.com/advice");
        // const res  = await axios.get("http://localhost:3000/api/data");

        setAdvice(res.data.slip.advice);
        setLoading(false);
        // console.log(Advice);  
  }catch(err){
    console.log(err);
  }
  
}
  return (
    <div className="app">
      {isLoading?<div className="card"><Spinner/></div>:
      <div className="card">
        <FaQuoteLeft className="iconleft"/>
        <h2 className="day">Quote of the {days[day]}</h2>
        <h1 className="heading">{Advice}</h1>
        <FaQuoteRight className="iconright"/>
        <button className="button" onClick={fetchAdvice}disabled={isLoading} >
        <span>Generate quote</span>
        </button>
      </div>
      }
    </div>
  );
};

// class App extends React.Component {
//   state = {
//     advice: '',
//   }

//   componentDidMount() {
//     this.fetchAdvice();
//   }

//   fetchAdvice = () => {
//     axios.get('https://api.adviceslip.com/advice')
//       .then((response) => {
//         const { advice } = response.data.slip;
//      console.log(response.data);
//         this.setState({ advice });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   render() {
//     return (
//       <div className="app">
//         <div className="card">
//           <h1 className="heading">{this.state.advice}</h1>
//           <button className="button" onClick={this.fetchAdvice}>
//             <span>GIVE ME ADVICE!</span>
//           </button>
//         </div>
//       </div>
//     );
//   }
// }

export default App;
