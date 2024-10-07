import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./loader";
import axios from './axios.js';
import Money from './money.jpg';

export default function Home() {
  const [loading, setLoading] = useState(true); // Show loader initially
  const [userData, setUserData] = useState(null); // To store user data
  const navigate = useNavigate();
  
  useEffect(() => {
    try {
      
      const token = localStorage.getItem("token");
      if (token) {
        const payloadBase64 = token.split(".")[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));
        
        // Extract username, id, and balance
        setUserData({
          username: decodedPayload.username,
          id: decodedPayload.id,
          balance: decodedPayload.balance,
        });
      } else {
        navigate("/signin");
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      navigate("/signin"); // Redirect if token is invalid
    }
  
  }, [navigate]);

  useEffect(() => {
    const searchUser = async () => {
      if (userData && userData.username) {
        try {
          const res = await axios.post("user/searchUser", { username: userData.username });
          localStorage.setItem("balance",res.data.data.balance);
          localStorage.setItem("userId",res.data.data.userId);
          setLoading(false);
        } catch (error) {
          console.error("Error searching user:", error);
        }
      }
    };

    searchUser();
  }, [userData]);

  const availableBalance = localStorage.getItem("balance");
 
  const send = () => {
    navigate("/search")
  }
  const history = () => {
    navigate("/history");
  }
  const logout = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("balance");
      setLoading(false);
      navigate("/signin");
    }, 1000);
  };

  if (loading || !userData) {
    return <Loader />;
  }

  return (
    <div>
      {/* Header */}
      <div className="w-screen h-[10vh] bg-black flex justify-between">
        <div className="text-white font-bold text-4xl flex items-center pl-5">Payfree</div>
        <div className="w-[200px] bg-black flex justify-center items-center">
          <button onClick={logout} className="text-white bg-red-500 p-4 m-2 w-1/2 rounded-full">
            Logout
          </button>
        </div>
      </div>

      {/* Dashboard */}
      <div className="w-screen h-[50vh] bg-black pl-10">
        <h2 className="text-white text-4xl font-semibold">Dashboard</h2>
        <div className="w-[500px] h-[300px] bg-blue-400 flex justify-center items-center rounded-xl shadow-inner shadow-gray-600">
          <div className="w-4/5 h-2/3">
            <h2 className="text-6xl font-bold">Amount</h2>
            <h2 className="text-5xl font-bold">Balance: {availableBalance}</h2>
          </div>
        </div>
      </div>

      {/* Image and Send Section */}
      <div className="h-[40vh] bg-black flex">
        <div className="h-2/3 w-1/4 flex flex-col justify-center items-center">
          <img src={Money}  alt="money" className="h-full w-1/2 rounded-full cursor-pointer" onClick={send} />
          <p className="text-white text-xl font-semibold cursor-pointer">Send</p>
        </div>
        <div className="h-2/3 w-1/4 flex flex-col justify-center items-center">
          <img src={Money}  alt="money" className="h-full w-1/2 rounded-full cursor-pointer" onClick={history} />
          <p className="text-white text-xl font-semibold cursor-pointer">History</p>
        </div>
      </div>
      
    </div>
  );
}
