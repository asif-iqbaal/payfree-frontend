import React,{useState,useEffect} from "react";
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from './axios.js';
export default function SearchUser(){
    const [username,setUsername] = useState("");
    const [users,setUsers] = useState([]);
    const [userDetails,setUserDetails] = useState(null);
    const navigate = useNavigate();

    const handleClick = (userDetails) => {
        navigate(`/transaction`, { state: { ...userDetails } });
    }

    useEffect(() => {
        const searchUsers = async() => {
                const res  = await axios.get("user/users");
                setUsers(res.data.user);
        }

        searchUsers();
    },[navigate]);

    const search = async(e) => {
        e.preventDefault();
        try {
            const res = await axios.post("user/searchUser",{username});
            //console.log(res);
            if(res.data && res.data.msg){
                toast.error(res.data.msg);
            }
           if(res.data && res.data.data){
            setUserDetails(res.data.data);
            toast.success("user present");
           }
        } catch (error) {
            toast.error("cant find the user");
            console.log(error);
        }
    }

    return(
        <>
        <div className="w-screen h-[100vh] bg-gray-300 flex justify-center items-center ">
            <div className="w-1/2 h-2/3 bg-blue-900 rounded-lg shadow-xl shadow-gray-400 flex flex-col items-center justify-evenly">
                <div  className="m-2 ">
                    <input type="text"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                    className="p-1 px-2 mx-2 rounded-md "
                 />
                 <button onClick={search}
                 className="bg-black text-white p-2 px-5 mx-2 rounded-lg ">Search</button>
                 </div>
                 {/*                                                   data                                        */}
               { userDetails && <div className="flex w-3/4 justify-between bg-blue-950 p-2 rounded-md cursor-pointer ">
                 <FaUserCircle size={50} className="text-white" />
                 <p 
                 className="text-xl font-semibold mt-2 text-white">{userDetails.username}</p>
                    <button 
                    onClick={()=>handleClick(userDetails)}
                    className="bg-black text-white p-0 px-4 mx-1 m-2 rounded-lg">Send</button>
                 </div>}

     
       <div className="w-full h-full bg-blue-900 mt-20 flex flex-col justify-center items-center overflow-y-scroll">
                    {
                        users.map((user)=>(
                <div className="flex w-3/4 justify-between bg-blue-950 p-2 rounded-md cursor-pointer m-1 ">
                 <FaUserCircle size={50} className="text-white" />
                 <p 
                 className="text-xl font-semibold mt-2 text-white">{user.username}</p>
                    <button 
                    onClick={()=>handleClick(user)}
                    className="bg-black text-white p-0 px-4 mx-1 m-2 rounded-lg">Send</button>
                 </div>
                        ))
                    }
                </div>
            </div>

           
        </div>
        </>
    );
}