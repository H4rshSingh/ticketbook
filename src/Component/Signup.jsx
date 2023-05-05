import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import logo from './assets/logo.png'

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ email: '', password: '', cpassword: '' });
  let navigate = useNavigate();

  const host = "https://ticketbook-server-production.up.railway.app";
  const handleSignup = async (e) => {
    e.preventDefault();
    props.setProgress(30);
    const { name, email, password } = credentials;
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json();
    props.setProgress(70);
    if (json.success) {
      //save the auth token
      localStorage.setItem('token', json.authToken);
      navigate('/bookticket');
      props.showAlert("Account has been successfully created!", "bg-green-100", "text-green-600", 'success')
    }
    else {
      props.showAlert("Sorry a user with this email already exists", "bg-red-200", 'text-red-600', 'Warning')
    }
    props.setProgress(100);
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div className='flex items-center justify-center mt-8'>
      <div className="w-full mx-4 max-w-md m-auto">
        <div className={`${props.mode === 'dark' ? 'text-white' : 'text-black'} text-2xl mb-4 font-bold text-center flex justify-center items-center`}>
          <span className='pl-2 mr-3 text-xl md:text-2xl'>Create a</span>
          <img className='w-5 md:w-6' src={logo} alt="Ticketbook" />
          <span className='ml-1 text-xl md:text-2xl'>Ticketbook Account</span>
        </div>

        <form className={`${props.mode === 'dark' ? 'bg-[#322F3D] text-white' : 'bg-white text-gray-700'} shadow-md rounded p-3 md:p-6 mb-4`} onSubmit={handleSignup} autoComplete="on" >
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="email">Name</label>
            <input className={`${props.mode==='dark'? 'bg-green-100 text-black' : 'bg-white'} shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} id="email" type="text" placeholder="Enter your name" name='name' minLength={3} required onChange={onChange} />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input className={`${props.mode==='dark'? 'bg-green-100 text-black' : 'bg-white'} shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} id="email" type="email" placeholder="Enter your email" name='email' required onChange={onChange} />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="email">Password</label>
            <input className={`${props.mode==='dark'? 'bg-green-100 text-black' : 'bg-white'} shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} autoComplete='new-password' id="password" type="password" placeholder="Password" name='password' minLength={5} required onChange={onChange} />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="cpassword">Confirm Password</label>
            <input className={`${props.mode==='dark'? 'bg-green-100 text-black' : 'bg-white'} shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3`} id="cpassword" type="password" placeholder="Confirm Password" minLength={5} required name='cpassword' onChange={onChange} />
          </div>

          <button className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" >Create an account</button>
          <p className="text-sm mt-2 font-light ">Already have an account? <Link to="/login" className="font-medium text-blue-600 hover:underline">Login here</Link></p>
        </form>
        <p className="text-center text-gray-400 text-xs">
          &copy;2023 Ticketbook Corp. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Signup;
