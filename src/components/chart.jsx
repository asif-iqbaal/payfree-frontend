import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import axios from './axios.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Graph = () => {
  const [graph, setGraph] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const senderId = localStorage.getItem("userId");
  const token = localStorage.getItem("token"); 

  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        if (!token) {
          throw new Error("No token found. Please sign in.");
        }
        if (!senderId) {
          throw new Error("No user ID found.");
        }


        const res = await axios.get("user/history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

      

        const transactions = res.data.transaction;

       

        if (!transactions || !Array.isArray(transactions)) {
          throw new Error("Invalid transactions data structure.");
        }

        

        const filteredTransactions = transactions.filter((tx) => {
          return String(tx.sender) === String(senderId) || String(tx.receiver) === String(senderId);
        });

         

        const lastFourTransactions = filteredTransactions.slice(-5).reverse();



        setGraph(lastFourTransactions);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchGraphData();
  }, [senderId, token]);

 
  const labels = graph.map((tx) => {
   
    return tx.date ? new Date(tx.date).toLocaleDateString() : `Transaction ${tx.id || 'N/A'}`;
  });
  const dataValues = graph.map(tx => tx.amount);


  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Amount',
        data: dataValues,
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Transactions',
      },
    },
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading graph...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="p-4">
      {graph.length > 0 ? (
        <Line data={data} options={options}  height={75}  />
      ) : (
        <p className="text-center text-gray-500">No transactions available to display.</p>
      )}
    </div>
  );
};

export default Graph;
