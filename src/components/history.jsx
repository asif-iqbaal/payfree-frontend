import React, { useEffect, useState } from "react";
import axios from "./axios.js";
import Loader from "./loader.jsx";
import { useNavigate } from "react-router-dom";

export default function History() {
  const token = localStorage.getItem("token");
  const senderId = localStorage.getItem("userId");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await axios.get("user/history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTransactions(res.data.transaction);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [token]);

  const send = () =>{
    navigate('/home');
  }
  return (
    <>
     <div className="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen w-screen flex flex-col items-center overflow-y-auto px-8 pl-12 py-6 md:px-8 rounded-lg">
  <div className="w-full md:w-3/4 text-3xl font-bold tracking-tight text-gray-800 mb-6">
    Transactions History
  </div>
  {loading ? (
    <Loader />
  ) : (
    transactions
      .filter(
        (data) => data.sender === senderId || data.receiver === senderId
      )
      .map((data) => (
        <div
          key={data.id}
          className="w-full md:w-3/4 h-[100px] bg-white shadow-md rounded-lg flex items-center justify-between p-4 mb-4 transition-transform transform hover:scale-105 hover:shadow-lg"
        >
          {data.sender === senderId ? (
            <div className="text-sm md:text-xl text-gray-600">
              Sent to: <span className="font-medium text-gray-800">{data.receiver}</span>
            </div>
          ) : (
            <div className="text-sm md:text-xl text-gray-600">
              Received from: <span className="font-medium text-gray-800">{data.sender}</span>
            </div>
          )}
          <div
            className={
              data.sender === senderId
                ? "text-red-500 text-sm md:text-xl font-semibold"
                : "text-green-500 text-sm md:text-xl font-semibold"
            }
          >
            ₹{data.amount.toLocaleString()} {/* Formatting the amount */}
          </div>
        </div>
      ))
  )}
</div>

    </>
  );
}
