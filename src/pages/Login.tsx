import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SignIn from '../assets/login.svg'
import { Link, useNavigate } from 'react-router'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { AuthApi } from '../features/api/api/AuthApi'
import { toast, Toaster } from 'sonner'
import { setCredentials } from '../features/slice/AuthSlice'
import { useDispatch } from 'react-redux'

type LoginFormValues = {
    email: string
    password: string
}

const Login: React.FC = () => {
    const [loginUser, { isLoading }] = AuthApi.useLoginMutation()
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLoginForm: SubmitHandler<LoginFormValues> = async (data) => {
        try {
            const response = await loginUser(data).unwrap()

            dispatch(
                setCredentials({
                    token: response.token,
                    user: response.userInfo
                })
            )

            toast.success("Login successful!")
            navigate('/')
        } catch (error: unknown) {
            const err = error as { data: { error: string } }
            toast.error(err.data.error || "Login failed. Try again.")
        }
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Toaster position="top-right" richColors />
            <Navbar />

            {/* PAGE CONTENT */}
            <div className="min-h-screen bg-amber-50 flex items-center justify-center py-10 px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white rounded-3xl overflow-hidden w-full max-w-6xl shadow-2xl">

                    {/* Image */}
                    <div className="flex items-center justify-center bg-orange-100 p-4">
                        <img src={SignIn} alt="Login" className="w-full max-w-96 rounded-2xl h-auto" />
                    </div>

                    {/* Form */}
                    <div className="flex items-center justify-center p-8">
                        <div className="w-full max-w-96 bg-white rounded-2xl p-8">
                            <div className="text-center mb-6">
                                <h2 className="text-3xl font-bold text-amber-800 mb-2">Welcome Back</h2>
                                <p className="text-gray-500 text-base">Sign in to your Taste of Kenya account</p>
                            </div>

                            <form className="flex flex-col gap-5" onSubmit={handleSubmit(handleLoginForm)}>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                                    <input
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                                        })}
                                        type="email"
                                        placeholder="Enter your email address"
                                        className="w-full px-3 py-3 border border-amber-300 rounded-lg bg-transparent text-black transition-all duration-300 outline-none focus:border-amber-800 focus:ring-2 focus:ring-amber-100"
                                    />
                                    {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                                    <input
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: { value: 6, message: "Minimum 6 characters" }
                                        })}
                                        type="password"
                                        placeholder="Enter your password"
                                        className="w-full px-3 py-3 border border-amber-300 rounded-lg bg-transparent text-black transition-all duration-300 outline-none focus:border-amber-800 focus:ring-2 focus:ring-amber-100"
                                    />
                                    {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
                                </div>

                                {/* Forgot password */}
                                <div className="text-right">
                                    <Link to="#" className="text-amber-600 text-sm hover:text-amber-700">Forgot your password?</Link>
                                </div>

                                {/* Button */}
                                <button
                                    type="submit"
                                    className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-4 rounded-lg text-base font-semibold transition-all duration-300 mt-2 shadow-md hover:shadow-lg w-full"
                                >
                                    {isLoading ? <span className="loading loading-spinner"></span> : "Sign In"}
                                </button>

                                {/* Links */}
                                <div className="flex flex-col gap-2 text-center mt-4">
                                    <Link to="/" className="text-amber-800 flex items-center justify-center gap-1 text-sm hover:text-amber-900">
                                        🏡 Go to Homepage
                                    </Link>
                                    <Link to="/register" className="text-amber-600 flex items-center justify-center gap-1 text-sm hover:text-amber-700">
                                        Don't have an account? Register
                                    </Link>
                                </div>

                            </form>
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Login
