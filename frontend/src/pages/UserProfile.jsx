import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../api/axios'


const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,setError]= useState(null);

  useEffect(()=>{
    const fetchUserProfile = async () => {
        try{
            const response= await apiClient.get(`/user/${id}`);
            if(response.data&&response.data.data){
                setUser(response.data.data);
            }
        }catch(e){
            setError('failed to load profile');
        }finally{
          setLoading(false);
        }
    };
    fetchUserProfile();
  },[id]);

  return (
  <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
    {loading ? (
      <div className="text-xl text-center pt-28">Loading Profile...</div>
    ) : error ? (
      <div className="text-xl text-red-500 text-center pt-28">{error}</div>
    ) : (
      <div className="max-w-3xl w-full bg-gray-800 rounded-xl shadow-2xl overflow-hidden mx-auto mt-28">
        <div className="h-40 bg-gradient-to-r from-cyan-600 to-blue-700"></div>

        <div className="px-8 pb-8 text-center">
          <img 
            src={user.profilePic || 'https://via.placeholder.com/150'} 
            alt={`${user.firstName}'s profile`} 
            className="w-40 h-40 rounded-full border-4 border-gray-800 mx-auto -mt-24 object-cover"
          />
          <div className="mt-4">
            <h1 className="text-4xl font-bold text-white">{`${user.firstName} ${user.lastName}`}</h1>
            <p className="text-md text-gray-400 mt-1">@{user.admNo}</p>
          </div>
        </div>

        <div className="p-8 pt-2 border-t border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Discipline</h3>
              <p className="text-lg text-gray-200 mt-1">{user.discipline}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Branch</h3>
              <p className="text-lg text-gray-200 mt-1">{user.branch}</p>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Email</h3>
              <p className="text-lg text-gray-200 mt-1">{user.email}</p>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Member Since</h3>
              <p className="text-lg text-gray-200 mt-1">{new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
);
};

export default UserProfile;