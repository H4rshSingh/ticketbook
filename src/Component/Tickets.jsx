import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import OneTicket from './OneTicket';
import { Close } from '@mui/icons-material';
import QRCode from "react-qr-code";
import Spinner from './Spinner';

const Tickets = (props) => {
    const [loading, setLoading] = useState(true)
    const [ticket, setTicket] = useState([]);


    const host = "https://ticketbook-server-production.up.railway.app"
    const getTicket = async () => {
        const response = await fetch(`${host}/api/ticket/fetchalltickets`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setTicket(json);
        setLoading(false);
    }

    let navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setInterval(() => {
                getTicket();
            }, 1000);
        }
        else {
            navigate('/login');
        }
        // eslint-disable-next-line
    }, [])

    const [showModalQR, setShowModalQR] = useState(false);
    const [showModalDel, setShowModalDel] = useState(false);
    const handleCancel = (e) => {
        setShowModalQR(false);
        setShowModalDel(false);
    }

    const [qr, setQr] = useState([]);

    const viewQR = (e) => {

        setShowModalQR(true);
        console.log(e);

        setQr(`${host}/admin/verifyticket/${e}`);
    }

    const cancelTicket = async (e) => {
        props.setProgress(30);
        const response = await fetch(`${host}/api/ticket/deleteticket/${e}`, {
            method: 'DELETE',
        });
        props.setProgress(70);
        const json = await response.json();
        props.setProgress(100);
        props.showAlert(`Ticket Cancelled!`, "bg-green-100", "text-green-600", 'success')
        console.log(json);
    }

    const [delTicketId, setDelTicketId] = useState([]);

    const handleDelete = (e) => {
        setShowModalDel(true);
        setDelTicketId(e);
    }

    const confirmDelete = () => {
        cancelTicket(delTicketId);
        setShowModalDel(false);
    }


    const download = () => {
        const svg = document.getElementById("QRCode");
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const pngFile = canvas.toDataURL("image/png");
            const downloadLink = document.createElement("a");
            downloadLink.download = "QRCode";
            downloadLink.href = `${pngFile}`;
            downloadLink.click();
        };
        img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
        props.showAlert("Downloaded successfully!", "bg-green-200", "text-green-600", "Success")
        handleCancel();
    };


    return (
        <div>
            <h1 className={`${props.mode === 'dark' ? ' text-white' : ' text-gray-700'} text-2xl font-semibold pb-2 md:text-4xl text-center mt-6`}>Your Tickets</h1>
            <div className={showModalQR || showModalDel ? `bg-gray-500/95 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-30 outline-none focus:outline-none ` : 'hidden'}>
                <div className={`relative ${props.mode === 'dark' ? 'bg-[#322F3D] text-white' : 'bg-white text-gray-700'} shadow-md rounded p-3 md:p-6 mb-4 mx-2 w-full max-w-sm`}>
                    <span className='absolute top-0 right-0' onClick={handleCancel}><Close /></span>
                    {
                        showModalDel ?
                            <div>
                                <h1 className='text-2xl mt-4 mb-4 text-center'>Do You want to cancel this ticket?</h1>
                                <div className="flex items-center justify-between mt-4">
                                    <button className="bg-red-500 hover:bg-red-700 px-4 py-2 mr-2 rounded-md text-sm w-20 text-white font-semibold" onClick={handleCancel}>Close</button>
                                    <button className="bg-green-500 hover:bg-green-700 px-4 py-2 mr-2 rounded-md text-sm w-20 text-white font-semibold" onClick={confirmDelete}>Confirm</button>
                                </div>

                            </div>
                            :
                            <div>
                                <h1 className='text-2xl mb-4 text-center'>QR Code</h1>
                                <QRCode value={qr} id='QRCode' size={256} style={{ height: "auto", maxWidth: "100%", width: "100%" }} />
                                <div className="flex items-center justify-between mt-4">
                                    <button className="bg-red-500 hover:bg-red-700 px-4 py-2 mr-2 rounded-md text-sm w-20 text-white font-semibold" onClick={handleCancel}>Close</button>
                                    <input className='bg-indigo-500 hover:bg-indigo-700 py-2 rounded-md text-sm w-20 text-white font-semibold' type="button" onClick={download} value="Download" />
                                </div>
                            </div>
                    }

                </div>
            </div>
            {loading && <Spinner />}
            <div className='flex flex-wrap justify-center mt-4 break-words'>
                <div className='text-gray-600'>{ticket.length === 0 ? 'You have not booked any ticket yet' : ''}</div>

                {ticket.slice(0).reverse().map((ticket) => {
                    return <OneTicket key={ticket._id} showAlert={props.showAlert} handleDelete={handleDelete} viewQR={viewQR} mode={props.mode} ticket={ticket} />;
                })}
            </div>


        </div>
    )
}


export default Tickets
