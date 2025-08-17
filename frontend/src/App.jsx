import React,{useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Feed from './pages/Feed';
import ProtectedRoute from './components/ProtectedRoute';
import apiClient from './api/axios';
import UserProfile from './pages/UserProfile';

function App() {

  useEffect(()=>{
    const wakeUpServer=async ()=>{
      try{
        console.log('pinging backend to wake it up');
        await apiClient.get('/health');
      }catch(e){
        console.log('finished pinging backend');
      }
    };
    wakeUpServer();
  },[]);
  
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Header />
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile/:id" element={<UserProfile/>}/>
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;