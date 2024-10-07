import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./loader";

export default function Landing(){
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const navi = ()=>{
        setLoading(true);
        setTimeout(()=>{
        setLoading(false);
        navigate("/signin"); 
        },1500)
        
    }
    return(
        <>
      {loading?<Loader />: <div className="w-screen h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex">
        <div className="w-1/2 h-[80vh] bg-transparent flex flex-col justify-center items-center">
        <div className="text-9xl font-bold tracking-tighter text-white ">PAYFREE</div>
        <div className="mt-3 ">
            <button onClick={navi} className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500
                                px-4 py-2 rounded-lg w-full text-5xl font-semibold text-white">JOIN</button>
        </div>
        </div>
        <div className="w-1/2 h-screen flex justify-center items-center">
        <div className="max-w-xl mx-auto p-6 bg-gray-100 border-l-4 border-blue-500 rounded-md shadow-md">
        <p className="font-bold">Welcome to Payfree – Your Seamless Payment Solution!</p>
      <p className="text-lg italic text-gray-700 mb-4">
      

Experience fast, secure, and hassle-free transactions with Payfree. Whether you're sending or receiving payments, we’ve got you covered with our user-friendly platform designed for everyone. Manage your payments with confidence and ease, all in one place.</p>
<p className="font-semibold">
Get started today and take control of your financial transactions!</p>
      <p className="text-right text-gray-500 font-semibold">Created by MD SHAMI</p>
    </div>
        </div>
       </div>}
        </>
    );
}