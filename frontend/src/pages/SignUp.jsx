import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function SignUp() {
  const [formData, setFormData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const respone = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    const data = await respone.json()
    console.log(data)
  };
  console.log(formData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className='p-3 max-w-sm md:max-w-lg mx-auto'>
      <h1 className=' text-3xl font-semibold text-center my-7'>SignUp</h1>
      <form  onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='text' placeholder='username' className='border  p-3 rounded-lg' id='username' onChange={handleChange} />
        <input type='email' placeholder='email' className='border  p-3 rounded-lg' id='email' onChange={handleChange} />
        <input type='password' placeholder='password' className='border  p-3 rounded-lg' id='password' onChange={handleChange} />
        <button className=' bg-slate-700 p-3  text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80' >SignUp</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to='/sigin'>
          <span className=' text-blue-700'>sigin</span>
        </Link>
      </div>
    </div>
  )
}

export default SignUp