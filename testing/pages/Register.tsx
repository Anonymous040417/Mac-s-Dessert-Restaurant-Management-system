import React from 'react'
import {useForm,type SubmitHandler} from 'react-hook-form'
import NavBar from './compontents/NavBar';
import { AuthApi } from '../features/apis/Authapi';
import { useNavigate } from 'react-router';

interface Register{
  first_name:string;
  last_name:string;
  email:string;
  phone_number:string;
  password:string
}

const Register = () => {


  const {register,handleSubmit,formState:{errors}}=useForm<Register>();
  //from RTK query
  const[registerUser,{isLoading}]=AuthApi.useRegisterMutation();
  const Navigate=useNavigate();
  const handleRegister:SubmitHandler<Register>=async(data)=>{
    try {
      const info= registerUser(data).unwrap 
      console.log('Registered successfully',info)
      Navigate('/Login');
      
    } catch (error:any) {// eslint-disable-line @typescript-eslint/no-explicit-any
      console.error('Registration Failed',error)
      
    }

  }

  return (
    <div>
    <NavBar/>
    
     <div className="min-h-screen flex flex-col">
    <div className="min-h-screen bg-amber-50 flex items-center justify-center py-4 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white rounded-3xl overflow-hidden w-full max-w-6xl shadow-2xl">
         <div className="flex items-center justify-center p-8">
            <div className="w-full max-w-96 bg-white rounded-2xl p-8">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-red-600 mb-1">Create Account</h2>
                <p className="text-gray-500 text-base">Join Us today</p>
              </div>
    
    <form  onSubmit={handleSubmit(handleRegister)}>
        <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="last_name">
          Fistname
        </label>
      <input 
      {...register('first_name',{required:'Firstname is required',minLength:{value:2,message:'First name should be atleast 2 characters '}})}
      type="text" 
      placeholder='Firstname' 
       className="w-full px-3 py-3 border border-red-300 rounded-lg text-black bg-transparent transition-all duration-300 outline-none focus:border-amber-800 focus:ring-2 focus:ring-amber-100"
      />
      {errors.first_name &&(
        <p className='text-red-700 mg-6 onclick-enable'>{errors.first_name.message}</p>
      )}
      </div>
       <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="last_name">
          Lastname
        </label>
      <input 
      {...register('last_name',{required:'Lastname is required',minLength:{value:2,message:'Lastname should contain atleast 2 characters'}})}
      type="text" 
      placeholder='Lastname'
       className="w-full px-3 py-3 border border-red-300 rounded-lg text-black bg-transparent transition-all duration-300 outline-none focus:border-amber-800 focus:ring-2 focus:ring-amber-100"
      />
      {errors.last_name && (
        <p className='text-red-700 mg-7'>{errors.last_name.message}</p>
      )}
      </div>
       <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="last_name">
          Email
        </label>
      <input 
      {...register('email',{required:'Email required',pattern:{value:/^\S+@\S+$/i ,message:'Please insert Email'}})}
      type="text" 
      placeholder='Email' 
       className="w-full px-3 py-3 border border-red-300 rounded-lg text-black bg-transparent transition-all duration-300 outline-none focus:border-amber-800 focus:ring-2 focus:ring-amber-100"
      />
      {errors.email && (
        <p className='text-red-700 mg-7'>{errors.email.message}</p>
      )}
      </div>
       <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="last_name">
          PhoneNumber
        </label>
      <input 
      {...register('phone_number',{required:'phone Number required',minLength:{value:10,message:'Please enter Phone number'}})}
      type="text" 
      placeholder='📱' 
       className="w-full px-3 py-3 border border-red-300 rounded-lg text-black bg-transparent transition-all duration-300 outline-none focus:border-amber-800 focus:ring-2 focus:ring-amber-100"
      />
      {errors.phone_number&&(
        <p className='text-red-700 mg-7'>{errors.phone_number.message}</p>
      )}
      </div>
       <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="last_name">
        Password
        </label>
      <input 
      {...register('password',{required:'Password required',minLength:{value:8,message:'Password should be atleast 8 characters '}})}
      type="password" 
      placeholder='Password' 
       className="w-full px-3 py-3 border border-red-300 rounded-lg text-black bg-transparent transition-all duration-300 outline-none focus:border-amber-800 focus:ring-2 focus:ring-amber-100"
      />
      {errors.password && (
        <p className='text-red-700 mg-7'>{errors.password.message}</p>
      )}
      </div>
       <button
        type="submit"
        className="bg-yellow-600 hover:bg-red-700 text-white px-4 py-4 border-none rounded-lg text-base font-semibold cursor-pointer transition-all duration-300 mt-5 shadow-md hover:shadow-lg w-full"
      >{isLoading?'Loading...⏳':'Create and account'}</button>
  
    </form>
    </div>
    </div>
  </div>
  </div>
   </div>
   </div>

   

    

  )
}

export default Register;