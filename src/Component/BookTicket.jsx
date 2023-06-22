import { React, useState } from 'react'
import Tickets from './Tickets';


const BookTicket = (props) => {

    const [fname, setfname] = useState("");
    const [lname, setlname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [state, setState] = useState("");
    const [monument, setMonument] = useState("");
    const [numberOfTicket, setNumberOfTicket] = useState("");
    const [dateOfVisit, setDateOfVisit] = useState("");


    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const host = "https://ticketbook-demr.onrender.com";
            // const host = "http://localhost:5000"
            const res = await fetch(`${host}/api/ticket/bookticket`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({
                    fname: fname,
                    lname: lname,
                    email: email,
                    phone: phone,
                    state: state,
                    monument: monument,
                    numberOfTicket: numberOfTicket,
                    dateOfVisit: dateOfVisit
                }),
            });
            props.setProgress(30);
            let resJson = await res.json();

            props.setProgress(100);
            if (res.status === 200) {
                setfname("");
                setlname("");
                setEmail("");
                setPhone("");
                setState("");
                setMonument("");
                setNumberOfTicket("");
                setDateOfVisit("");
            } else {
                console.log(resJson.error);
            }
        } catch (err) {
            console.log(err);
        }
        props.showAlert("Ticket booked successfully!", "bg-green-200", "text-green-600", "Success")
    };



    var minDate = new Date();
    minDate.setDate(minDate.getDate() + 1);
    var maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 365);
    var dd = minDate.getDate();
    var mm = minDate.getMonth() + 1;
    var yyyy = minDate.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    minDate = yyyy + '-' + mm + '-' + dd;
    dd = maxDate.getDate();
    mm = maxDate.getMonth() + 1;
    yyyy = maxDate.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    maxDate = yyyy + '-' + mm + '-' + dd;

    return (
        <>
            <div className=" flex justify-center items-center mt-8">
                <div className=" mx-4 w-full max-w-xl m-auto">
                    <div className={`${props.mode==='dark'? 'text-white' : 'text-black'} text-center text-4xl font-bold mb-4 `}>Book Tickets</div>
                    <form className={`${props.mode==='dark'? 'bg-[#322F3D] text-white' : 'bg-white text-gray-700'} shadow-md rounded p-3 md:p-6 mb-4`}  onSubmit={handleSubmit} autoComplete="on">
                        <div className="flex justify-between flex-wrap">
                            <div className="w-2/5 mb-5  space-y-2">
                                <label className="details">First Name</label>
                                <input type="text" className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder="First name" name="fname" required value={fname} onChange={(e) => setfname(e.target.value)} />
                            </div>
                            <div className="w-2/5 mb-5  space-y-2">
                                <label className="details">Last Name</label>
                                <input type="text" className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder="Last name" name="lname" required value={lname} onChange={(e) => setlname(e.target.value)} />
                            </div>
                            <div className="w-2/5 mb-5 space-y-2">
                                <label value="state" className="details">Phone number</label>
                                <input type="text" className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id="state" placeholder='Enter phone number' name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>
                            <div className="w-2/5 mb-5 space-y-2">
                                <label value="state" className="details">Email</label>
                                <input type="text" className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id="state" placeholder='Enter email' name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="w-2/5 mb-5 space-y-2">
                                <label className="details">Date of visit</label>
                                <input type="date" className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id="date" name="dateOfVisit" required min={minDate} max={maxDate} value={dateOfVisit} onChange={(e) => setDateOfVisit(e.target.value)} />
                            </div>

                            <div className="w-2/5 mb-5 space-y-2">
                                <label value="state" className="details">State</label>
                                <input type="text" className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id="state" placeholder='state of visit' name="state" value={state} onChange={(e) => setState(e.target.value)} />
                            </div>
                            <div className="w-2/5 mb-5 space-y-2">
                                <label value="monument" className="details">Monuments</label>
                                <input type="text" className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id="monument" name="monument" placeholder='Monument' value={monument} onChange={(e) => setMonument(e.target.value)} />
                            </div>
                            <div className="w-2/5 mb-5 space-y-2">
                                <label value="Tickets" className="details">Number of Tickets</label>
                                <input placeholder='1' min={1} className='w-full shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="number" id="tickets" name="numberOfTicket" value={numberOfTicket} required onChange={(e) => setNumberOfTicket(e.target.value)} />
                            </div>
                        </div>
                        <div className="button">
                            <input disabled={state.length < 3 || fname.length < 3 ||lname.length < 3  || email.length < 10 || phone.length < 10 || monument.length < 3} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-60 disabled:cursor-not-allowed" type="submit" value="Book now" />
                        </div>
                    </form>
                </div>
            </div>
                <Tickets mode={props.mode} setProgress={props.setProgress}  showAlert={props.showAlert}/>
        </>

    )
}

export default BookTicket