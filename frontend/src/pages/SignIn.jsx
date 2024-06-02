import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signInStart,signInFailure,signInSuccess } from '../redux/user/userSlice';

function SignIn() {
  const [formData, setFormData] = useState({});
  const {loading,error}=useSelector((state)=>state.user)
  const navigate = useNavigate();
  const disptach = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    disptach(signInStart());
    try {
      const respone = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await respone.json()
      console.log(data)
      if (data.success === false) {
        disptach(signInFailure(data.message))
        return;
      }
      disptach(signInSuccess(data));
      navigate('/');
    } catch (error) {
      disptach(signInFailure(error.message))
    }

  };


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className='p-3 max-w-sm md:max-w-lg mx-auto'>
      <h1 className=' text-3xl font-semibold text-center my-7'>SignIn</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='email' placeholder='email' className='border  p-3 rounded-lg' id='email' onChange={handleChange} />
        <input type='password' placeholder='password' className='border  p-3 rounded-lg' id='password' onChange={handleChange} />
        <button className=' bg-slate-700 p-3  text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80' >{loading ? 'Loading...' : 'Sign In'}</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont Have an account?</p>
        <Link to='/signup'>
          <span className=' text-blue-700'>signup</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

export default SignIn