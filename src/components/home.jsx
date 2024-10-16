import React, { useState, useEffect } from "react";
import { useNavigate , Link } from "react-router-dom";
import Loader from "./loader";
import axios from './axios.js';
import Graph from "./chart.jsx";
export default function Home() {
  const [loading, setLoading] = useState(true); 
  const [userData, setUserData] = useState(null);
 
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
   <>
   <div className="w-[100%]  flex flex-col  ml-[12%] md:h-auto h-screen bg-gray-100">
   
   <div className="w-full flex  md:[100vh]">
   
    <div className="bg-gray-100 w-[100%]  h-full rounded-lg p-2">
      <div className="text-2xl font-semibold">Welcome {userData.username} !</div>
      <div className="w-full h-full mx-5 mt-5 bg-gray-100 rounded-xl p-5 ">
        <div className="flex justify-between md:h-2/3">
        {/* <div className="bg-gradient-to-r from-purple-500 to-indigo-500 w-[30%] h-2/3 p-6 text-lg rounded-xl shadow-lg flex flex-col justify-center text-white">
  <p className="p-3 font-semibold">Username: <span className="font-normal">{userData.username}</span></p>
  <p className="p-3 font-semibold">UserID: <span className="font-normal">{userData.id}</span></p>
  <p className="p-3 font-semibold">Balance: <span className="font-normal">{availableBalance}</span></p>
</div> */}

<div className="flex justify-between flex-col bg-gradient-to-r from-orange-400 via-orange-200 to-orange-200 w-[100%] md:h-44  p-6 text-lg rounded-xl shadow-xl  mr-10">
  <p className="text-sm font-medium text-gray-800">ID {userData.id}</p>
  <p className="text-center font-extrabold text-6xl tracking-tight text-gray-900">Payfree</p>
  <i className="text-right font-semibold text-gray-700">VISA</i>
</div>
</div>
        {/*    Recent Transacctions*/}
        <div className="flex justify-between flex-col md:h-1/3 h-auto
          bg-gradient-to-r from-gray-100 via-orange-50 to-white w-[100%]  p-2 text-lg rounded-xl mr-3">
            <p className="text-xl font-semibold p-2">Recent Transactions</p>
            <Graph />
        </div>
      </div>
      
    </div>
   </div>
   </div>
   </>
  );
}
