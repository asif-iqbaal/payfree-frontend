import React, { useEffect, useState } from "react";
import axios from "./axios.js";
import Loader from "./loader.jsx";
import { useNavigate } from "react-router-dom";

export default function History() {
  const token = localStorage.getItem("token");
  const senderId = localStorage.getItem("userId");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <>
      <div className="bg-white h-auto w-screen flex flex-col items-center overflow-y-scroll">
        {loading ? (
          <Loader />
        ) : (
          transactions
            .filter(
              (data) => data.sender === senderId || data.receiver === senderId
            )
            .map((data) => (
              <div
                key={data.id} // Ensure this is in the parent div to avoid duplicate keys
                className="w-1/2 h-[80px] bg-blue-950 m-2 flex items-center justify-evenly rounded-md "
              >
                {data.sender === senderId ? (
                  <div className="text-xl text-white">
                    Sent to: {data.receiver} {/* Show receiver information */}
                  </div>
                ) : (
                  <div className="text-xl text-white">
                    Received from: {data.sender} {/* Show sender information */}
                  </div>
                )}
                <div
                  className={
                    data.sender === senderId
                      ? "text-red-500 text-xl font-semibold" // Red if the user is the sender
                      : "text-green-500 text-xl font-semibold" // Green if the user is the receiver
                  }
                >
                  {data.amount} {/* Display the transaction amount */}
                </div>
              </div>
            ))
        )}
      </div>
    </>
  );
}
