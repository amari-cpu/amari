import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { URL } from '../url'
import Sidebar from '../components/Sidebar'


const TeamTable = () => {
  const [search, setSearch] = useState('');
  const [user, setUser] = useState([])

  
  const fetchUsers = async () => {
    const res = await axios.get(`${URL}/api/users`)
    console.log(res.data)
    setUser(res.data)
  }

  useEffect(() => {
    fetchUsers()
  },[])

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };



  const handleDelete = async(itemId)=>{
    try{
      const res = await axios.delete(`${URL}/api/users/${itemId}`)
      setUser((prevData) => prevData.filter(item => item.id !== itemId));
      console.log(res.data)
    }
    catch(err){
      console.log(err)
    }
  }

const filteredUser = user?.filter(u => u.role === 'admin');

  return (
    <div>
        <Sidebar />
        <div className='flex-1 ml-[300px]'>
        
        <div className='p-9'>
        <p className='font-bold text-3xl text-blue-700'>Team Members</p>
      <div className="mb-4 text-right">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleSearch}
          className="p-2 border border-blue-400 rounded"
        />
      
      </div>


      <table className="w-full bg-white border text-left border-gray-200 rounded-md">
        <thead className='bg-blue-200 text-blue-700  rounded-md'>
          <tr >
            <th scope="col" className="py-4 px-11 ">First Name</th>
            <th scope="col" className="py-4 px-11 ">Last Name</th>
            <th scope="col" className="py-4 px-11 ">Email</th>
            <th scope="col" className="py-4 px-11 ">Phone</th>
           
   
          </tr>
        </thead>
        <tbody>
          {filteredUser?.map((user, index) => (
            <tr key={index} className=' border-b border-gray-300'>
              <td className="py-4 px-11">{user.firstName}</td>
              <td className="py-4 px-11">{user.lastName}</td>
              <td className="py-4 px-11">{user.email}</td>
              <td className="py-4 px-11">{user?.phone ? user.phone : "not yet"}</td>
       
    
            </tr>
          ))}
        </tbody>
      </table>
    
    </div>
        </div>
    </div>
  )
}

export default TeamTable