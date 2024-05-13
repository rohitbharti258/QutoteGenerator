import React from "react";
import "./App.css"; 
import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom';
import Quote from "./components/Quote";
import Addquote from "./pages/Addquote";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
    <Navbar/>
        <Switch>
          <Route path="/" element={<Quote/>} />
          <Route path="/add" element={<Addquote/>} />
        </Switch>
    </Router> 
  );
};
export default App;
