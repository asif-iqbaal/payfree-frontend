import { useEffect, useState } from 'react';
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom';
import SignUp from './components/signup';
import Landing from './components/landing';
import Notification from './components/notification';
import Login from './components/login';
import Home from './components/home';
import SearchUser from './components/searchUser';
import Transaction from './components/transaction';
import History from './components/history';
import Navigation from './components/navigation';

import './App.css';
function App() {
  const [user,setUser] = useState(null);
 
   useEffect(()=>{
    const user = localStorage.getItem("token");
    setUser(user);
  },[])
 
  return (
    <>
     <Router>
      <div className="app-container">
      { user && <Navigation />}
        <div className="content-container">
       
          <Routes>
          
            <Route path='/' element={<Landing />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/signin' element={<Login />} />
            <Route path='/home' element={<Home />} />
            <Route path='/search' element={<SearchUser />} />
            <Route path='/transaction' element={<Transaction />} />
            <Route path='/history' element={<History />} />
          </Routes>
          <Notification />
        </div>
      </div>
    </Router>

   
    </>
  )
}

export default App
