import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useWindowSize } from 'react-use';
import payment from './payment.png';
import dashboard from './dashboard.png';
import transaction from './transaction.png';
import signout from './signout.png';
export default function Navigation() {
  const {width} = useWindowSize();
  const isLargeScreen = width>768;
  const navigate = useNavigate();
  const balance = localStorage.getItem("balance");
  const logout = () => {
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("balance");
      localStorage.removeItem("userId");
      location.reload();
      navigate("/signin");
    }, 1000);
  };

  return (
    <>
      {isLargeScreen?
      (<nav className="w-[10%] bg-transparent h-[100vh] fixed flex flex-col justify-between bg-white shadow-lg">
        <div className="w-[90%] h-[10vh] bg-transparent bg-black flex flex-col justify-between">
          <div className="text-black font-bold md:text-4xl text-3xl flex items-center pl-5">
            Payfree
          </div>
          <div className="p-5 text-xl font-semibold">
            Balance
          <div className="text-green-600 font-semibold md:text-sm text-lg flex items-center  ">
          ₹{balance}
          </div>
          </div>
          <ul className="flex flex-col items-center">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive
                  ? "m-3 text-white text-sm font-semibold border-2 bg-violet-600 p-4 rounded-lg"
                  : "m-3 text-gray-600 text-sm font-semibold border-2 border-white hover:border-violet-600 hover:text-violet-600 p-4 rounded-lg"
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/search"
              className={({ isActive }) =>
                isActive
                  ? "m-3 text-white text-sm font-semibold border-2 bg-violet-600 p-4 rounded-lg"
                  : "m-3 text-gray-600 text-sm font-semibold border-2 border-white hover:border-violet-600 hover:text-violet-600 p-4 rounded-lg"
              }
            >
              Payment
            </NavLink>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                isActive
                  ? "m-3 text-white text-sm font-semibold border-2 bg-violet-600 p-4 rounded-lg"
                  : "m-3 text-gray-600 text-sm font-semibold border-2 border-white hover:border-violet-600 hover:text-violet-600 p-4 rounded-lg"
              }
            >
              Transactions
            </NavLink>
          </ul>
        </div>

        <div className="">
          <p
            onClick={logout}
            className="m-3 text-gray-600 text-sm font-semibold hover:border-2 border-2 border-white hover:border-red-500 hover:text-red-500 p-2 rounded-lg cursor-pointer text-center"
          >
            Sign out
          </p>
        </div>
      </nav>):
      (
       <nav className="w-[10%] bg-transparent h-[100vh] fixed flex flex-col justify-between bg-white shadow-lg z-30">
       <div className="w-[90%] h-[10vh] bg-transparent bg-black flex flex-col justify-between">
         <div className="text-black font-bold text-4xl   flex items-center pl-1">
           P
         </div>
        
         <ul className="flex flex-col items-center">
           <NavLink
             to="/home"
             className={({ isActive }) =>
               isActive
                 ? "my-4 text-white text-sm font-semibold border-2 bg-violet-600  rounded-lg"
                 :"my-4"
             }
           >
             <img src={dashboard} alt="dashboard" className="h-full  w-full " />
           </NavLink>
           <NavLink
             to="/search"
             className={({ isActive }) =>
               isActive
                 ? "my-4 text-white text-sm font-semibold border-2 bg-violet-600  rounded-lg"
                 :"my-4"
             }
           >
             <img src={payment} alt="dashboard" className="h-full  w-full " />
           </NavLink>
           <NavLink
             to="/history"
             className={({ isActive }) =>
               isActive
                 ? "my-4 text-white text-sm font-semibold border-2 bg-violet-600  rounded-lg"
                 : "my-4"
             }
           >
             <img src={transaction} alt="dashboard" className="h-full  w-full " />
           </NavLink>
         </ul>
       </div>

       <div className="">
         <p
           onClick={logout}
           className="my-3 text-gray-600 text-sm font-semibold hover:border-2 border-2 border-white hover:border-red-500 hover:text-red-500 p-2 rounded-lg cursor-pointer text-center"
         >
           <img src={signout} alt="signout" />
         </p>
       </div>
     </nav>
      )}

    </>
  );
}
