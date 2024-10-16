import React, { useState, useEffect } from "react";
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from './axios.js';

export default function SearchUser() {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  const handleClick = (userDetails) => {
    navigate(`/transaction`, { state: { ...userDetails } });
  }

  useEffect(() => {
    const searchUsers = async () => {
      const res = await axios.get("user/users");
      setUsers(res.data.user);
    }

    searchUsers();
  }, [navigate]);

  const search = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("user/searchUser", { username });
      if (res.data && res.data.msg) {
        toast.error(res.data.msg);
      }
      if (res.data && res.data.data) {
        setUserDetails(res.data.data);
        toast.success("User found!");
      }
    } catch (error) {
      toast.error("Couldn't find the user.");
      console.log(error);
    }
  }

  return (
    <>
      <div className="ml-[12%] md:pl-5 md:pt-4 w-full text-4xl font-semibold text-gray-700 bg-white tracking-tight rounded-t-xl  shadow-md">
        Payment
      </div>
      <div className="w-full ml-[12%] h-[90vh] bg-white flex justify-center items-center">
        <div className="md:w-1/2 w-full md:h-[90%] h-full bg-white md:rounded-lg  flex flex-col items-center justify-between md:p-6 space-y-4">
          <div className="w-full flex md:justify-center pr-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Search user by username"
              className="p-2 w-64 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <button
              onClick={search}
              className="ml-4 bg-blue-600 text-white md:px-6 px-3 md:py-2 py-1 rounded-lg hover:bg-blue-700 transition-all"
            >
              Search
            </button>
          </div>

          {/* Display selected user details */}
          {userDetails && (
            <div
              className="flex w-full justify-between bg-blue-600 p-3 rounded-md cursor-pointer items-center shadow-lg transition-transform transform hover:scale-105"
              onClick={() => handleClick(userDetails)}
            >
              <FaUserCircle size={50} className="text-white" />
              <p className="md:text-xl text-sm font-semibold text-white">{userDetails.username}</p>
              <button className="bg-white text-blue-600 px-4 py-1 rounded-lg shadow-md hover:bg-gray-200">
                Send
              </button>
            </div>
          )}

          {/* Display all users */}
          <div className="w-full h-72 bg-white flex flex-col justify-center items-center overflow-y-auto space-y-2 ">
            {users.map((user) => (
              <div
                key={user._id}
                className="flex w-3/4 justify-between bg-gray-600 px-3 rounded-md cursor-pointer items-center shadow-md hover:bg-gray-500 transition-colors transform hover:scale-105"
                onClick={() => handleClick(user)}
              >
                <FaUserCircle size={50} className="text-white" />
                <p className="md:text-xl text-sm font-semibold text-white">{user.username}</p>
                <button className="bg-white text-gray-600 px-4 py-1 rounded-lg shadow-md hover:bg-gray-200">
                  Send
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
