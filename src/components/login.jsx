import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Loader from "./loader.jsx";
import Image from './payfree.jpg'
import axios from './axios.js';
export default function  Login(){

    const [formData,setFormData] = useState({username: "" , password : ""});
    const [loading,setLoading] = useState(false);
    const {username,password} = formData;
    const onChange = (e) => setFormData({...formData,[e.target.name]:e.target.value});
    const navigate = useNavigate();
    const handleSubmit = async(e) =>{
      e.preventDefault();
      try {
        const res = await axios.post("user/signin",formData);
        console.log(res);
        console.log(res.data.token);
        const token = res.data.token;
        localStorage.setItem("token",token);
        toast.success("User logined successfully");
        setLoading(true);
        setTimeout(()=>{
        setLoading(false);
        navigate('/home'); 
        },1500)
        
      } catch (error) {
        toast.error(error);
      }
    
    }

    return(
        <>
       {loading? <Loader /> :
        <div className="w-screen h-screen flex">
          <div className="w-1/3 h-screen bg-[#0e559b] flex justify-center shadow-lg ">
            <div className="w-4/5 h-1/2 flex flex-col justify-center items-center  text-white rounded-md ">
              <h2 className="font-bold text-3xl p-2">SIGN IN</h2>
              <form onSubmit={handleSubmit} className="flex flex-col  w-3/4">
                <label htmlFor="username" 
                className="text-2xl p-1"
                >Username</label>
                <input 
                type="text"
                name="username"
                value={username} 
                className="text-xl w-full p-1 rounded-sm text-black "
                onChange={onChange}
                required/>
                 <label htmlFor="username" 
                className="text-2xl p-1"
                >Password</label>
                <input 
                type="text"
                name="password"
                value={password} 
                className="text-xl p-1 rounded-sm text-black"
                onChange={onChange}
                required/>
                <button className="bg-blue-900 p-2 mt-3 text-lg rounded-full hover:bg-blue-950">
                  Sign in
                </button>
              </form>
              <p className="p-1 m-1 font-sans">connect with our network and make transfer money easy</p>
              <p className="font-sans">Not have an account? create now <Link to="/signup" className="text-orange-200 hover:bg-blue-950">Signup</Link></p>
            </div>
          </div>

          <div className="w-2/3 overflow-hidden">
          <img src={Image} alt="image" className="w-full" />
          </div>
        </div>}
        </>
    )
}