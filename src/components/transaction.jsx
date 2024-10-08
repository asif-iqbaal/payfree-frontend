import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from "./loader.jsx";
import axios from './axios.js';

export default function Transaction() {
    const [formData, setFormData] = useState({ receiverUsername: "", amount: "", description: "" });
    const [loading,setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const { username, userId } = state || {};
    const token = localStorage.getItem("token");
    let balance = parseFloat(localStorage.getItem("balance")) || 0;
    
    useEffect(() => {
        if (username) {
            setFormData(prevState => ({
                ...prevState,
                receiverUsername: username
            }));
        } else {
            toast.error("Receiver information is missing.");
            navigate("/search"); // Redirect to a safe route
        }
    }, [username, navigate]);

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const transaction = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setLoading(true);
        const transactionAmount = parseFloat(formData.amount);
        const currentBalance = balance;

        if (isNaN(transactionAmount) || transactionAmount <= 0) {
            toast.error("Please enter a valid amount.");
            setIsSubmitting(false);
            return;
        }

        if (transactionAmount > currentBalance) {
            toast.error("Insufficient balance");
            setIsSubmitting(false);
            return;
        }

        try {
            const res = await axios.post("user/transactions", formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res && res.data) {
               
                console.log(res.data);
                toast.success("Transaction complete");
                // Update balance
                balance -= transactionAmount;
                localStorage.setItem("balance", balance);
                setLoading(false);
                navigate("/home");
            } else {
                toast.error("Transaction incomplete");
            }
        } catch (error) {
            toast.error("Transaction cancelled");
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if(loading){
        return <Loader />
    }

    return (
        <div className="bg-white flex justify-center items-center h-screen w-screen">
            <div className="md:w-1/3 md:h-2/3 h-full w-full bg-blue-950 flex items-center flex-col">
                <h2 className="text-white text-3xl   font-semibold p-3">Transaction</h2>
                <form onSubmit={transaction} className="flex flex-col w-4/5">
                    <label htmlFor="receiverUsername" className="md:text-2xl m-3 text-white">Receiver Name</label>
                    <input
                        id="receiverUsername"
                        className="md:p-4 px-2 text-lg"
                        name="receiverUsername"
                        type="text"
                        required
                        value={formData.receiverUsername}
                        onChange={onChange}
                        readOnly // Optional: Make it read-only if receiver is predefined
                    />

                    <label htmlFor="amount" className="md:text-2xl m-3 text-white">Amount</label>
                    <input
                        id="amount"
                        className="md:p-4  px-2 text-lg"
                        name="amount"
                        type="number"
                        required
                        value={formData.amount}
                        onChange={onChange}
                        placeholder="Amount"
                        min="1"
                        step="0.01"
                    />

                    <label htmlFor="description" className="md:text-2xl m-3 text-white">Description</label>
                    <textarea
                        id="description"
                        className="h-28 p-4 md:text-lg resize-none overflow-y-auto"
                        name="description"
                        required
                        value={formData.description}
                        onChange={onChange}
                        placeholder="Description"
                    />

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`bg-blue-500 md:w-1/3 md:p-4 p-1 m-2 rounded-lg text-2xl text-white font-semibold ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        {isSubmitting ? 'Sending...' : 'Send'}
                    </button>
                </form>
            </div>
        </div>
        
    );
}
