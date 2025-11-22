import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SignUp from '../assets/sign-up.svg';
import { Link, useNavigate } from 'react-router';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { AuthApi } from '../features/api/api/AuthApi';
import { Toaster, toast } from 'sonner';


type RegisterFormValues = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
};

const Register: React.FC = () => {
  const [registerUser, { isLoading }] = AuthApi.useRegisterMutation();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>();
  const navigate = useNavigate();

  const handleRegister: SubmitHandler<RegisterFormValues> = async (data) => {
    try {
      const response = await registerUser(data).unwrap();
      console.log('Registration successful:', response);
    //   toast.success(response.message || 'Registration successful');
      navigate('/login');
    } catch (error: any) {// eslint-disable-line @typescript-eslint/no-explicit-any
      console.error('Registration failed:', error);
      toast.error(error.data.error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-right" richColors />
      <Navbar />
      <div className="min-h-screen bg-amber-50 flex items-center justify-center py-4 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white rounded-3xl overflow-hidden w-full max-w-6xl shadow-2xl">
          {/* Form Section */}
          <div className="flex items-center justify-center p-8">
            <div className="w-full max-w-96 bg-white rounded-2xl p-8">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-amber-800 mb-1">Create Account</h2>
                <p className="text-gray-500 text-base">Join Taste of Kenya today</p>
              </div>

              <form onSubmit={handleSubmit(handleRegister)} className="flex flex-col gap-5">
                {/* First & Last Name */}
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="first_name">
                      First Name
                    </label>
                    <input
                      {...register('first_name', { required: 'First name required', minLength: { value: 3, message: 'First name should be at least 3 characters' } })}
                      type="text"
                      id="first_name"
                      placeholder="First name"
                      className="w-full px-3 py-3 border border-amber-300 rounded-lg text-black bg-transparent transition-all duration-300 outline-none focus:border-amber-800 focus:ring-2 focus:ring-amber-100"
                    />
                    {errors.first_name && <p className="text-red-700">{errors.first_name.message}</p>}
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="last_name">
                      Last Name
                    </label>
                    <input
                      {...register('last_name', { required: 'Last name required', minLength: { value: 3, message: 'Last name should be at least 3 characters' } })}
                      type="text"
                      id="last_name"
                      placeholder="Last name"
                      className="w-full px-3 py-3 border border-amber-300 rounded-lg text-black bg-transparent transition-all duration-300 outline-none focus:border-amber-800 focus:ring-2 focus:ring-amber-100"
                    />
                    {errors.last_name && <p className="text-red-700">{errors.last_name.message}</p>}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="email">
                    Email
                  </label>
                  <input
                    {...register('email', { required: 'Email required', pattern: { value: /^\S+@\S+$/i, message: 'Please enter a valid email' } })}
                    type="email"
                    id="email"
                    placeholder="Email address"
                    className="w-full px-3 py-3 border border-amber-300 rounded-lg text-black bg-transparent transition-all duration-300 outline-none focus:border-amber-800 focus:ring-2 focus:ring-amber-100"
                  />
                  {errors.email && <p className="text-red-700">{errors.email.message}</p>}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="phone_number">
                    Phone Number
                  </label>
                  <input
                    {...register('phone_number', { required: 'Phone number is required', minLength: { value: 10, message: 'Phone number should be at least 10 characters' } })}
                    type="tel"
                    id="phone_number"
                    placeholder="+254 ..."
                    className="w-full px-3 py-3 border border-amber-300 rounded-lg text-black bg-transparent transition-all duration-300 outline-none focus:border-amber-800 focus:ring-2 focus:ring-amber-100"
                  />
                  {errors.phone_number && <p className="text-red-700">{errors.phone_number.message}</p>}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="password">
                    Password
                  </label>
                  <input
                    {...register('password', { required: 'Enter password', minLength: { value: 6, message: 'Password should be at least 6 characters' } })}
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    className="w-full px-3 py-3 border border-amber-300 rounded-lg text-black bg-transparent transition-all duration-300 outline-none focus:border-amber-800 focus:ring-2 focus:ring-amber-100"
                  />
                  {errors.password && <p className="text-red-700">{errors.password.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-4 border-none rounded-lg text-base font-semibold cursor-pointer transition-all duration-300 mt-2 shadow-md hover:shadow-lg w-full"
                >
                  {isLoading ? <span className="loading loading-spinner text-warning"></span> : 'Create Account'}
                </button>

                {/* Links */}
                <div className="flex flex-col gap-2 text-center mt-4">
                  <Link to="/" className="text-amber-800 hover:text-amber-900 text-sm flex items-center justify-center gap-1">
                    🏡 Go to Homepage
                  </Link>
                  <Link to="/login" className="text-amber-600 hover:text-amber-700 text-sm flex items-center justify-center gap-1">
                    Already have an account? Sign In
                  </Link>
                </div>
              </form>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex items-center justify-center bg-orange-100 p-8">
            <img src={SignUp} alt="Register" className="w-full max-w-96 rounded-2xl h-auto" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Register;
