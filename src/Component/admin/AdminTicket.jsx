import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from '@mui/icons-material';
import { Close } from '@mui/icons-material';
import Spinner from '../Spinner';

const AdminTicket = (props) => {
    const [ticket, setTicket] = useState([]);
    const [loading, setLoading] = useState(true)

    const host = 'https://ticketbook-server-production.up.railway.app'
    const getAllTicket = async () => {
        const response = await fetch(`${host}/admin/getalltickets`, {
            method: 'GET',
        });
        const json = await response.json();
        setTicket(json);
        setLoading(false);
    }

    let navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('admin-token')) {
            setInterval(() => {
                getAllTicket();
            }, 1000);

        }
        else {
            navigate('/adminlogin');
        }
        //eslint-disable-next-line
    }, [])

    const cancelTicket = async (e) => {
        props.setProgress(30);
        const response = await fetch(`${host}/admin/deleteticket/${e}`, {
            method: 'DELETE',
        });
        props.setProgress(70);
        const json = await response.json();
        console.log(json);
        props.setProgress(1000);
        props.showAlert("Ticket cancelled successfully!", "bg-green-200", "text-green-600", "Success")
    }

    return (
        <div>
            <h1 className={`${props.mode === 'dark' ? 'text-white' : 'text-black'} text-center text-2xl md:text-4xl font-serif mb-4`}>Tickets Details</h1>
            
            <div className="relative overflow-x-auto mx-2">
                <table className={`${props.mode === 'dark' ? 'text-gray-400' : "text-gray-500"} w-full text-xs md:text-sm text-center `}>
                    <thead className={`${props.mode === 'dark' ? 'text-gray-400 bg-gray-700' : "text-gray-700  bg-gray-200"} uppercase text-xs md:text-sm `}>
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
                                Phone
                            </th>
                            <th scope="col" className="px-6 py-3">
                                State
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Monument
                            </th>
                            <th scope="col" className="px-6 py-3">
                                No. of tickets
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date of visit
                            </th>
                            <th scope="col" className="px-6 py-3">
                                User ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Ticket ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Visited
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Cancel Ticket
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {ticket.map((ticket, index) => {
                            return (
                                <tr key={ticket._id} className={`${props.mode === 'dark' ? 'border-gray-700 bg-gray-800' : "bg-white"} border-b`} >
                                     <td className="px-6 py-4">
                                        {index+1}
                                    </td>
                                    <th scope="row" className={`${props.mode === 'dark' ? 'text-white ' : "text-gray-900"} px-6 py-4 font-medium whitespace-nowrap`}>
                                        {ticket.fname + " " + ticket.lname}
                                    </th>
                                    <td className="px-6 py-4">
                                        {ticket.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {ticket.phone}
                                    </td>
                                    <td className="px-6 py-4">
                                        {ticket.state}
                                    </td>
                                    <td className="px-6 py-4">
                                        {ticket.monument}
                                    </td>
                                    <td className="px-6 py-4">
                                        {ticket.numberOfTicket}
                                    </td>
                                    <td className="px-6 py-4">
                                        {ticket.dateOfVisit}
                                    </td>
                                    <td className="px-6 py-4">
                                        {ticket.user}
                                    </td>
                                    <td className={`${props.mode === 'dark' ? 'text-white ' : "text-gray-900"} px-6 py-4 font-medium whitespace-nowrap`}>
                                        {ticket._id}
                                    </td>
                                    <td className="px-6 py-4">
                                        {ticket.visited ? <Check className='text-green-500' /> : <Close className='text-red-300' />}
                                    </td>
                                    <td className="px-6 py-4">

                                        <button onClick={() => cancelTicket(ticket._id)} className="bg-red-500 hover:bg-red-700 text-white py-2 px-2 rounded text-xs">
                                            Cancel
                                        </button>
                                    </td>
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

export default AdminTicket
