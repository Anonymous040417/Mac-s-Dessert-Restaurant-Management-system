import NavBar from './compontents/NavBar'
import {type SubmitHandler, useForm } from 'react-hook-form'
import { AuthApi } from '../features/apis/Authapi';
import { useDispatch } from 'react-redux';
import {setCredentials} from '../features/apis/slice/Authslice'



interface Login{
  email:string;
  password:string
}

const Login = () => {

  const [login,{isLoading}]=AuthApi.useLoginMutation();

  const {register,handleSubmit,formState:{errors}}=useForm<Login>();
  const dispatch=useDispatch();

  //function /handler
  const handleLogin:SubmitHandler<Login>= async (data)=>{
    try {
      const info=await login(data).unwrap()
      console.log(info)
        dispatch(
          setCredentials({
           token: info.token,
           user:  info.userInfo
            })
          )

      
      
    } catch (error:any) {// eslint-disable-line @typescript-eslint/no-explicit-any
      console.error('Errors',error)
    }
    console.log(data)

  }
  return (
    <>
    <NavBar/>
    
     <div className="flex items-center   justify-center p-8">
     
       <div className="w-full max-w-96 bg-white rounded-2xl p-8">
         <div className="text-center mb-6">
           <h2 className="text-3xl font-bold text-red-700 mb-2">Welcome Back</h2>
             <p className="text-gray-500 text-base">Sign in to your account</p>
          </div>

    <div>
      <form onClick={handleSubmit(handleLogin)}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5" >
            Email
          </label>
          <input 
          {...register ('email',{required:'Email is required',pattern:{value:/^\S+@\S+$/i ,message:'Please insert email'}})}
          id='Email'
          type="email" 
          placeholder='Enter Email '
           className="w-full px-3 py-3 border border-red-300 rounded-lg bg-transparent text-black transition-all duration-300 outline-none focus:border-amber-800 focus:ring-2 focus:ring-amber-100"
                                
          />
          {errors.email &&(
            <p className='text-red-400'>{errors.email.message}</p>
          )}
        </div>
         <div>
          <label htmlFor="Email">
            password
          </label>
          <input
          {...register('password',{required:'Password required',minLength:{value:8,message:'Password should be atleast 8 characters '}})}
          id='password'
          type="password" 
          placeholder='Enter password'
            className="w-full px-3 py-3 border border-red-300 rounded-lg bg-transparent text-black transition-all duration-300 outline-none focus:border-amber-800 focus:ring-2 focus:ring-amber-100"
          />
          {errors.password &&(
            <p className='text-red-400'>{errors.password.message}</p>
          )}
          <button type="submit"
             className="bg-amber-600 hover:bg-red-700 text-white px-4 py-4 rounded-lg text-base font-semibold transition-all duration-300 mt-2 shadow-md hover:shadow-lg w-full">
              {isLoading?'Loading...⚙':'Login'}
              </button>
        </div>
      </form>
    </div>
    </div>
    </div>
    </>
  )
}

export default Login