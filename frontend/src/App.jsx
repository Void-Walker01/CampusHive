import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Feed from './pages/Feed';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
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
            {/* Add other protected routes here */}
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;