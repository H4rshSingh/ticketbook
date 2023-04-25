import React from 'react'
import QrCode2Icon from '@mui/icons-material/QrCode2';

const OneTicket = (props) => {
  return (
    <div>
      <div className={`${props.mode==='dark'? 'bg-[#322F3D] text-white' : 'bg-white text-gray-700'} box-border relative mx-2 my-4 p-2 max-w-sm rounded overflow-hidden shadow-md`}>
        <div className='px-2 md:px-6 text-sm md:text-base py-4'>
          <h1 className='text-center'>Ticket</h1>
          <p>Name : {props.ticket.fname}  {props.ticket.lname} </p>
          <p>Email : {props.ticket.email}</p>
          <p>Phone : {props.ticket.phone}</p>
          <p>State : {props.ticket.state}</p>
          <p>Monument : {props.ticket.monument}</p>
          <p>Number of Ticket : {props.ticket.numberOfTicket}</p>
          <p>Ticket Id : {props.ticket._id}</p>
        </div>

        <div className=' flex justify-end gap-2'>
          <button className="bg-red-500 hover:bg-red-700  text-white text-center p-2 rounded  text-xs" onClick={() => props.handleDelete(props.ticket._id)} >
            <span>Cancel</span>
          </button>
          <button className="bg-green-500 hover:bg-green-700  text-white text-center py-2 px-3  rounded " onClick={() => props.viewQR(props.ticket._id)} >
            <QrCode2Icon fontSize='medium' />
          </button>

          {/* <span className=' cursor-pointer p-2 hover:bg-slate-200' onClick={() => ( props.viewQR(props.ticket._id))}></span> */}
        </div>
      </div>
    </div>
  )
}

export default OneTicket