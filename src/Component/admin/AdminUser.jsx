import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Delete } from '@mui/icons-material';
import Spinner from '../Spinner';


const host = "https://ticketbook-demr.onrender.com";
// const host = "http://localhost:5000"

const AdminUser = (props) => {
    const [loading, setLoading] = useState(true)

    const [user, setUser] = useState([]);
    const getAllUser = async () => {
        const response = await fetch(`${host}/admin/getallusers`, {
            method: 'GET',
        });
        const json = await response.json();
        setUser(json);
        setLoading(false);
    }

    let navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('admin-token')) {
            setInterval(() => {
                getAllUser();
            }, 1000);

        }
        else {
            navigate('/adminlogin');
        }
        //eslint-disable-next-line
    }, [])

    const deleteUser = async (e) => {
        props.setProgress(30);
        const response = await fetch(`${host}/admin/deleteuser/${e}`, {
            method: 'DELETE',
        });
        props.setProgress(70);
        const json = await response.json();
        console.log(json);
        props.setProgress(1000);
        props.showAlert("User deleted successfully!", "bg-green-200", "text-green-600", "Success")
    }

    return (
        <div className='mt-8'>
            <h1 className={`${props.mode === 'dark' ? 'text-white' : 'text-black'} text-center text-2xl md:text-4xl font-serif mb-4`}>User Details</h1>
            <div className="relative overflow-x-auto mx-2">
                <table className={`${props.mode === 'dark' ? 'text-gray-400' : "text-gray-500"} w-full text-xs md:text-sm text-center `}>
                    <thead className={`${props.mode === 'dark' ? 'text-gray-400 bg-gray-700' : "text-gray-700  bg-gray-200"} uppercase md:text-sm text-xs `}>
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                S NO.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                User ID
                            </th>
                            {/* <th scope="col" className="px-6 py-3">
                                View Tickets
                            </th> */}
                            <th scope="col" className="px-6 py-3">
                                Delete User
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.map((user, index) => {
                            return (
                                <tr key={user._id} className={`${props.mode === 'dark' ? 'border-gray-700 bg-gray-800' : "bg-white"} border-b`}>
                                    <td  className="px-6 py-4">
                                        {index + 1}
                                    </td>
                                    <th scope="row" className={`${props.mode === 'dark' ? 'text-white ' : "text-gray-900"} px-6 py-4 font-medium whitespace-nowrap`}>
                                        {user.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user._id}
                                    </td >
                                    <td className="px-6 py-4">
                                        <button className="bg-red-500 hover:bg-red-700 mx-auto text-white text-center py-2 px-2 rounded flex items-center" onClick={() => deleteUser(user._id)} >
                                            <span>Delete</span>  <Delete fontSize='small' />
                                        </button>
                                    </td >
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                {loading && <Spinner/>}
            </div>
        </div>
    )
}

export default AdminUser
