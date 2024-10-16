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
        location.reload();
        },1500)
        
      } catch (error) {
        toast.error(error);
      }
    
    }

    return(
        <>
       {loading? <Loader /> :
        <div className="w-screen h-screen flex flex-col justify-center items-center bg-gradient-to-t from-orange-400 via-orange-100 to-white">
          <div className="w-screen h-[10vh] bg-transparent flex justify-between">
        <div className="text-black font-bold md:text-4xl text-3xl flex items-center pl-5">Payfree</div>
       </div>
          <div className="md:w-2/3 h-[90vh] bg-transparent flex justify-center items-center ">
            <div className="md:w-2/4  flex flex-col justify-center items-center  text-white rounded-md ">
              <h2 className="font-semibold md:text-4xl text-xl p-2 text-black">Sign in to your account</h2>
              <form onSubmit={handleSubmit} className="flex flex-col  w-3/4">
                <label htmlFor="username" 
                className="md:text-xl text-black p-1"
                >username</label>
                <input 
                type="text"
                name="username"
                value={username} 
                className="text-xl w-full md:p-2 text-black  border-4 rounded-xl focus:border-orange-400 focus:outline-none focus:ring-2"
                onChange={onChange}
                required/>
                 <label htmlFor="username" 
                className="md:text-xl text-black p-1"
                >password</label>
                <input 
                type="text"
                name="password"
                value={password} 
                className="text-xl w-full md:p-2 text-black focus:border-orange-400 border-4 rounded-xl focus:outline-none focus:ring-2"
                onChange={onChange}
                required/>
                <button className="bg-blue-900 md:p-2 p-1 mt-10 text-lg rounded-xl hover:bg-blue-950">
                  Sign in
                </button>
              </form>
              <p className="p-2 m-1 font-sans text-sm text-black">connect with our network and make transfer money easy</p>
              <p className="font-sans text-black text-sm md:text-lg">Not have an account? create now <Link to="/signup" className="text-orange-700 hover:bg-blue-950">Signup</Link></p>
            </div>
          </div>

          {/* <div className="md:w-2/3 w-0 overflow-hidden">
          <img src={Image} alt="image" className="w-full" />
          </div> */}
        </div>}
        </>
    )
}