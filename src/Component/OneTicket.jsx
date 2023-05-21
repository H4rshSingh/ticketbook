import React from 'react'
import QrCode2Icon from '@mui/icons-material/QrCode2';
import { Check, Close } from '@mui/icons-material';


const OneTicket = (props) => {
  var dateBooking = new Date(Number(props.ticket.date));
  var dateVisited = new Date(Number(props.ticket.visitedOn));
  return (
    <div>
      <div className={`${props.mode === 'dark' ? 'bg-[#322F3D] text-white' : 'bg-white text-gray-700'} box-border relative mx-2 my-4 p-2 max-w-sm rounded overflow-hidden shadow-md`}>
        <div className='px-2 md:px-6 text-sm md:text-base py-4'>
          <h1 className='text-center font-bold'>Ticket {props.index + 1}</h1>
          <p>Name : {props.ticket.fname}  {props.ticket.lname} </p>
          <p>Email : {props.ticket.email}</p>
          <p>Phone : {props.ticket.phone}</p>
          <p>Date of visit : {props.ticket.dateOfVisit}</p>
          <p>State : {props.ticket.state}</p>
          <p>Monument : {props.ticket.monument}</p>
          <p>Number of Tiket : {props.ticket.numberOfTicket}</p>
          <code className={`${props.mode === 'dark' ? 'text-gray-200' : 'text-gray-500'} text-sm`}>Ticket Id : {props.ticket._id}</code>

          <small className='block'>Booked at : {dateBooking.toLocaleString()}</small>
          <div className='flex items-center gap-2 justify-between my-2'>
            <p>Visited : {props.ticket.visited ? <Check className='text-green-500' /> : <Close className='text-red-500' />}</p>
            {
              props.ticket.visited ? <p className={`${props.mode === 'dark' ? 'text-gray-200' : 'text-gray-500'} text-sm`}>Visited on {dateVisited.toLocaleString()}</p>
                :

                <div className=' flex justify-end gap-2'>
                  <button className="bg-red-500 hover:bg-red-700  text-white text-center py-1.5 rounded w-14 text-xs" onClick={() => props.handleDelete(props.ticket._id)} >
                    <span>Cancel Ticket</span>
                  </button>
                  <button className="bg-green-500 hover:bg-green-700  text-white text-center py-2 px-3 w-14 rounded " onClick={() => props.viewQR(props.ticket._id)} >
                    <QrCode2Icon fontSize='medium' />
                  </button>
                </div>
            }
          </div>
        </div>


      </div>
    </div>
  )
}

export default OneTicket