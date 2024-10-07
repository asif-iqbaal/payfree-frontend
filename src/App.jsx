import { useState } from 'react';
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom';
import SignUp from './components/signup';
import Landing from './components/landing';
import Notification from './components/notification';
import Login from './components/login';
import Home from './components/home';
import SearchUser from './components/searchUser';
import Transaction from './components/transaction';
import History from './components/history';
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element= {<Landing/>}/>
        <Route path='/signup' element= {<SignUp/>}/>
        <Route path = '/signin' element = {<Login />} />
        <Route path='/home' element = {<Home />} />
        <Route path='/search' element = {<SearchUser />} />
        <Route path='/transaction' element ={<Transaction />} />
        <Route path='/history' element ={<History />} />

      </Routes>
      <Notification />
    </Router>

   
    </>
  )
}

export default App
