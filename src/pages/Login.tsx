import React from 'react'
import { AuthApi } from '../features/Api/AuthApi';
import { useNavigate } from 'react-router';
import { setCredentials } from '../features/Slice/AuthSlice';
import { Toaster, toast } from 'sonner';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router';
import { Home } from 'lucide-react';
import signIn from '../assets/signIn.svg'
import { useDispatch } from 'react-redux'
import { useForm, type SubmitHandler } from 'react-hook-form'

type LoginFormValues = {
    email: string;
    password: string;
};

const Login:React.FC = () => {
  const [loginUser, {isLoading}] = AuthApi.useLoginUserMutation();

  const {register, handleSubmit, formState: {errors}, reset} = useForm<LoginFormValues>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginForm: SubmitHandler<LoginFormValues> = async(data) => {
    try {
                console.log(data)
            const response = await loginUser(data).unwrap();
            //see the response
            console.log('Login successful:', response);

            //displatch login success to local storage
            dispatch(setCredentials({ token: response.token, user: response.userInfo }));
            //navigate to home page
           
            if (response.userInfo.role==='user'){
                navigate('/vehicles')
            } else if (response.userInfo.role==='admin'){
                navigate('/admin-dashboard')
            } else{
                navigate('/')
            }
            //toast.success(data.success);
            
        } catch (error:any) {
            console.error('Login failed:', error);
            //display error
            toast.error(error.data.error);
        }
  }


  return (
    <>
    <Toaster position='top-center' richColors />
    <Navbar/>
    <div>
    <div className="min-h-[80vh] bg-zinc-900 flex items-center justify-center py-10 px-4 sm:px-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-zinc-800 rounded-3xl overflow-hidden w-full max-w-7xl shadow-2xlshadow-gray-900/25">
        {/* Image Section */}
        <div className="lg:flex items-center justify-center p-4 bg-gradient-to-br from-amber-300 via-amber-700 to-orange-500">
            <img
                src={signIn}
                alt="Login"
                className="w-full max-w-sm rounded-2xl h-auto"
            />
        </div>

        {/* Form Section */}
        <div className="flex items-center justify-center p-8 lg:p-12">
            <div className="w-full max-w-md bg-zinc-900 rounded-2xl p-8 space-y-8">
                <div className="text-center mb-4">
                    <h2 className="text-3xl font-bold text-[#FF8400] mb-2 mt-0">
                        Welcome Back
                    </h2>
                    <p className="text-[#eca381ff] text-base m-0">
                        Sign in to your account
                    </p>
                </div>

                <form className="flex flex-col space-y-5" 
                      onSubmit={handleSubmit(handleLoginForm)}>
                    
                    {/* Email Field */}
                    <div>
                        <label 
                            className="block text-sm font-medium text-gray-700 mb-1" 
                            htmlFor="email">
                            Email
                        </label>
                        <input
                            {...register('email', { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })}
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email address"
                            className="w-full p-3 border border-gray-300 rounded-lg text-sm bg-transparent transition duration-300 focus:outline-none focus:border-[#FF8400] " />
                    </div>
                    {errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.email.message}
                        </p>
                    )}

                    {/* Password Field */}
                    <div>
                        <label 
                            className="block text-sm font-medium text-gray-700 mb-1" 
                            htmlFor="password">
                            Password
                        </label>
                        <input
                            {...register('password', { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            className="w-full p-3 border border-gray-300 rounded-lg text-sm bg-transparent transition duration-300 focus:outline-none focus:border-[#FF8400]"/>
                    </div>
                    {errors.password && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.password.message}
                        </p>
                    )}

                    {/* Forgot Password Link */}
                    <div className="text-right">
                        <Link 
                            to="/reset-password" 
                            className="text-amber-700 hover:text-amber-800 text-sm transition duration-300">
                            Forgot your password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-[#FF8400] text-white py-3 px-4 border-none rounded-lg text-base font-semibold cursor-pointer transition duration-300 hover:bg-[#e67700] shadow-md mt-2 w-full disabled:opacity-50">
                        {isLoading ? <span className="loading loading-spinner text-warning"></span> : 'Sign In'}
                    </button>

                    <div className="flex flex-col space-y-2 text-center mt-4">
                        <Link to="/" className="text-[#FF8400] hover:text-amber-700 flex items-center justify-center gap-1 text-sm transition duration-300">
                            <span role="img" aria-label="home"><Home className='w-5 h-5'/></span> Go to HomePage
                        </Link>
                        <Link to="/register" className="text-amber-700 hover:text-amber-800 flex items-center justify-center gap-1 text-sm transition duration-300">
                            Don't have an account? Register
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

    </div>
    <Footer />
    </>
  )
}

export default Login


