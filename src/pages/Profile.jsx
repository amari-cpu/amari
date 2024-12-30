// import { useState, useEffect } from 'react';
// import { UserCircle, Mail, Phone, MapPin, Building, Edit2, Save, X } from 'lucide-react';
// import { URL } from '../url';
// import axios from 'axios';
// import Navbar from '../components/Navbar';
// import { useAuth } from '../context/AuthContext';

// const locations = [
//   {
//     id: 1,
//     location:"Ikorodu"
//   },
//   { 
//     id: 2,
//     location:"Surulere"
//   },
//   {
//     id: 3,
//     location:"Magodo"
//   },
//   {
//     id: 4,
//     location:"Lekki"
//   },
//   {
//     id: 5,
//     location:"Ikeja"
//   }
// ]




// export default function Profile() {
//   const {user} = useAuth()
//   const [isEditing, setIsEditing] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [profile, setProfile] = useState([]);
//   const [editForm, setEditForm] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     lga: '',
//     address: ''
//   });



//   const userId = user?.id


// const fetchUser = async () => {
//   const res = await axios.get(`${URL}/api/users/${userId}`)
//   console.log('see users',res.data)
//   setProfile(res.data)

// }

// useEffect(() => {
//   fetchUser()
// }, [userId])

// const handleInputChange = (e) => {
//   const { name, value } = e.target;
//   setEditForm(prev => ({
//     ...prev,
//     [name]: value
//   }));
// };


// const handleEditProfile = async (e) => {
//   e.preventDefault();
//   setIsLoading(true);
//   try {
//     const updateData = {
//       firstName: editForm.firstName,
//       lastName: editForm.lastName,
//       phone: editForm.phone,
//       lga: editForm.lga,
//       address: editForm.address
//     };

//     const res = await axios.put(`${URL}/api/users/${userId}`, updateData);
    
//     if (res.status === 200) {
//       setProfile(res.data);
//       setIsEditing(false);
//     }
//   } catch (error) {
//     console.error('Error updating profile:', error);
//   } finally {
//     setIsLoading(false);
//   }
// };

//   // const handleCancel = () => {
//   //   setEditForm(user);
//   //   setIsEditing(false);
//   // };

//   const handleCancel = () => {
//     if (JSON.stringify(editForm) !== JSON.stringify(profile)) {
//       if (window.confirm('Are you sure? Your changes will be lost.')) {
//         setEditForm(profile);
//         setIsEditing(false);
//       }
//     } else {
//       setIsEditing(false);
//     }
//   };

//   return (
//     <>
//     <Navbar />
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-2xl mx-auto">
//         <div className="bg-white rounded-2xl shadow-lg p-8">
//           {/* Profile Header */}
//           <div className="flex items-center justify-between mb-8">
//             <div className="flex items-center space-x-4">
//               <UserCircle className="w-16 h-16 text-gray-400" />
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">
//                   {profile.firstName} {profile.lastName}
//                 </h1>
//                 <p className="text-gray-500">Your Profile</p>
//               </div>
//             </div>
//             {!isEditing && (
//               <button
//                 onClick={() => setIsEditing(true)}
//                 className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
//               >
//                 <Edit2 className="w-4 h-4" />
//                 <span>Edit Profile</span>
//               </button>
//             )}
//           </div>

//           {/* Profile Content */}
//           {isEditing ? (
//             <form onSubmit={handleEditProfile} className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     First Name
//                   </label>
//                   <input
//                     type="text"
//                     name="firstName"
//                     value={profile.firstName}
//                     // onChange={handleInputChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Last Name
//                   </label>
//                   <input
//                     type="text"
//                     name="lastName"
//                     value={profile.lastName}
//                     // onChange={handleInputChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   value={profile.email}
//                   disabled
//                   className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Phone Number
//                 </label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={profile.phone}
//                   // onChange={handleInputChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Local Government Area
//                 </label>
//                 <select
//                     name="lga"
//                     value={editForm.lga || ''}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   >
//                     <option value="">Select LGA</option>
//                     {locations.map((item) => (
//                       <option key={item.id} value={item.location}>
//                         {item.location}
//                       </option>
//                     ))}
//                   </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Address
//                 </label>
//                 <textarea
//                   name="address"
//                   value={profile.address}
//                   // onChange={handleInputChange}
//                   rows="3"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>

//               <div className="flex space-x-4">
//                 <button
//                   type="submit"
//                   className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                 >
//                   <Save className="w-4 h-4" />
//                   <span>Save Changes</span>
//                 </button>
//                 <button
//                   type="button"
//                   onClick={handleCancel}
//                   className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
//                 >
//                   <X className="w-4 h-4" />
//                   <span>Cancel</span>
//                 </button>
//               </div>
//             </form>
//           ) : (
//             <div className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="flex items-center space-x-3">
//                   <UserCircle className="w-5 h-5 text-gray-400" />
//                   <div>
//                     <p className="text-sm text-gray-500">First Name</p>
//                     <p className="text-gray-900">{profile.firstName}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <UserCircle className="w-5 h-5 text-gray-400" />
//                   <div>
//                     <p className="text-sm text-gray-500">Last Name</p>
//                     <p className="text-gray-900">{profile.lastName}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex items-center space-x-3">
//                 <Mail className="w-5 h-5 text-gray-400" />
//                 <div>
//                   <p className="text-sm text-gray-500">Email</p>
//                   <p className="text-gray-900">{profile.email}</p>
//                 </div>
//               </div>

//               <div className="flex items-center space-x-3">
//                 <Phone className="w-5 h-5 text-gray-400" />
//                 <div>
//                   <p className="text-sm text-gray-500">Phone</p>
//                   <p className="text-gray-900">{profile.phone}</p>
//                 </div>
//               </div>

//               <div className="flex items-center space-x-3">
//                 <Building className="w-5 h-5 text-gray-400" />
//                 <div>
//                   <p className="text-sm text-gray-500">Local Government Area</p>
//                   <p className="text-gray-900">{profile.lga}</p>
//                 </div>
//               </div>

//               <div className="flex items-center space-x-3">
//                 <MapPin className="w-5 h-5 text-gray-400" />
//                 <div>
//                   <p className="text-sm text-gray-500">Address</p>
//                   <p className="text-gray-900">{profile.address}</p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//     </>
//   );
// }

import { useState, useEffect } from 'react';
import { UserCircle, Mail, Phone, MapPin, Building, Edit2, Save, X } from 'lucide-react';
import { URL } from '../url';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const locations = [
  {
    id: 1,
    location: "Ikorodu"
  },
  { 
    id: 2,
    location: "Surulere"
  },
  {
    id: 3,
    location: "Magodo"
  },
  {
    id: 4,
    location: "Lekki"
  },
  {
    id: 5,
    location: "Ikeja"
  }
];

export default function Profile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState({});
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    lga: '',
    address: ''
  });

  const userId = user?.id;

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${URL}/api/users/${userId}`);
      setProfile(res.data);
      setEditForm(res.data); // Initialize edit form with current data
    } catch (error) {
      console.error('Error fetching user:', error);
      // Add error handling (toast notification, etc.)
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const updateData = {
        firstName: editForm.firstName,
        lastName: editForm.lastName,
        phone: editForm.phone,
        lga: editForm.lga,
        address: editForm.address
      };

      const res = await axios.put(`${URL}/api/users/${userId}`, updateData);
      
      if (res.status === 200) {
        setProfile(res.data);
        setIsEditing(false);
        // Add success notification here
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      // Add error notification here
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditForm(profile); // Reset form to current profile data
    setIsEditing(false);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* Profile Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <UserCircle className="w-16 h-16 text-gray-400" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {profile.firstName} {profile.lastName}
                  </h1>
                  <p className="text-gray-500">Your Profile</p>
                </div>
              </div>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>

            {/* Profile Content */}
            {isEditing ? (
              <form onSubmit={handleEditProfile} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={editForm.firstName || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={editForm.lastName || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editForm.email || ''}
                    disabled
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={editForm.phone || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Local Government Area
                  </label>
                  <select
                    name="lga"
                    value={editForm.lga || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select LGA</option>
                    {locations.map((item) => (
                      <option key={item.id} value={item.location}>
                        {item.location}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={editForm.address || ''}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={isLoading}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              </form>
            ) : (
              // View mode remains the same
              <div className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <UserCircle className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">First Name</p>
                    <p className="text-gray-900">{profile.firstName}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <UserCircle className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Last Name</p>
                    <p className="text-gray-900">{profile.lastName}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-900">{profile.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-gray-900">{profile.phone}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Building className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Local Government Area</p>
                  <p className="text-gray-900">{profile.lga}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="text-gray-900">{profile.address}</p>
                </div>
              </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}