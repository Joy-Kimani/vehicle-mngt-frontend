import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router'; 
import signup from '../assets/signup.svg';
import { Toaster, toast } from 'sonner';
import { useForm, type SubmitHandler } from "react-hook-form";
import { AuthApi } from '../features/Api/AuthApi';


type RegisterFormValues = {
    first_name: string
    last_name: string
    email: string
    contact_phone: string
    password: string
}


const Register:React.FC = () => {

  // Query mutation hook for registration 
  const [registerUser, { isLoading}] = AuthApi.useRegisterUserMutation();

  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>();
  //navigate the user after successful login
  const navigate = useNavigate();

  const handleSubmitForm: SubmitHandler<RegisterFormValues> = async(data) =>{
    try {
      console.log(data)
      const response = await registerUser(data).unwrap();
      console.log('Registration successful:', response)
      
      //navigate to login afterr registering
      navigate('/login');
    } catch (error:any) {
      console.error('Registration failed:', error);
            
            const errorMessage = error.data?.error || 'An unexpected error occurred during registration.';
            toast.error(errorMessage);     
    }
  }


  return (
    <div className="signup-page min-h-screen bg-zinc-900">
      <Toaster position="top-center" richColors/>
      <Navbar />
      <div className="min-h-[80vh] flex items-center justify-center py-10 px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-zinc-800 rounded-xl overflow-hidden w-full max-w-6xl shadow-2xl shadow-zinc-950">
          
          {/* Form Section */}
          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <div className="text-white">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                  Become a McCormick, join the culture
                </h2>
                <p className="text-zinc-400 text-lg">Create your account</p>
              </div>

              <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-6">
                
                {/* First & Last Name Row */}
                <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex-1 space-y-2">
                        <label htmlFor="first_name" className="block text-sm font-medium text-zinc-300">
                            First Name
                        </label>
                        <input 
                        {...register('first_name', { 
                            required: "First Name is required", 
                            minLength: { value: 2, message: "Must be at least 2 characters" } 
                        })}
                        type ="text"
                        id="first_name" 
                        placeholder="First Name"
                        className="w-full px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-150 ease-in-out" 
                        />
                        {errors.first_name && (
                            <p className="text-red-400 text-xs mt-1">{errors.first_name.message}</p>
                        )}
                    </div>
                    
                    <div className="flex-1 space-y-2">
                        <label htmlFor="last_name" className="block text-sm font-medium text-zinc-300">
                            Last Name
                        </label>
                        <input
                        {...register('last_name', { 
                            required: "Last Name is required", 
                            minLength: { value: 2, message: "Must be at least 2 characters" } 
                        })} 
                        type="text" 
                        id="last_name" 
                        placeholder="Last Name"
                        className="w-full px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-150 ease-in-out" 
                        />
                        {errors.last_name && (
                            <p className="text-red-400 text-xs mt-1">{errors.last_name.message}</p>
                        )}
                    </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-300">
                    Email
                  </label>
                  <input  
                    {...register('email', { 
                        required: "Email is required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address"
                        }
                    })}
                  type="email" 
                  id="email" 
                  placeholder="Email address"
                  className="w-full px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-150 ease-in-out"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label htmlFor="phone_number" className="block text-sm font-medium text-zinc-300">
                    Phone Number
                  </label>
                  <input 
                    {...register('contact_phone', {
                        required: "Phone number is required",
                        pattern: {
                            value: /^\+?[0-9\s-]{7,15}$/,
                            message: "Invalid phone number format"
                        }
                    })}
                  type="tel" 
                  id="phone_number" 
                  placeholder="Phone Number"
                  className="w-full px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-150 ease-in-out"
                  />
                  {errors.contact_phone && <p className="text-red-400 text-xs mt-1">{errors.contact_phone.message}</p>}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-zinc-300">
                    Password
                  </label>
                  <input 
                    {...register('password', {
                        required: "Password is required",
                        minLength: { value: 8, message: "Password must be at least 8 characters" }
                    })}
                  type="password" 
                  id="password" 
                  placeholder="Password"
                  className="w-full px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-150 ease-in-out"
                  />
                  {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
                </div>
                
                
                <button 
                  type="submit" 
                  disabled={isLoading} 
                  className="w-full py-3 mt-4 text-lg font-semibold text-zinc-900 bg-amber-500 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-500 focus:ring-opacity-50 transition duration-300 ease-in-out disabled:bg-amber-700 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-3 text-zinc-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Account...
                    </>
                  ) : 'Create Account'}
                </button>
                

                <div className="flex justify-between items-center mt-6 text-sm">
                  <Link to="/" className="text-zinc-400 hover:text-yellow-500 transition duration-150"> 
                    Go to HomePage
                  </Link>
                  <Link to="/login" className="font-medium text-yellow-400 hover:text-yellow-500 transition duration-150">
                    Already have an account? Login
                  </Link>
                </div>
              </form>
            </div>
          </div>

          {/* Image Section */}
          <div className="hidden lg:flex items-center justify-center p-8 bg-gradient-to-br from-amber-300 via-amber-700 to-orange-500">
            <img 
              src={signup} 
              alt="Register" 
              className="max-h-full w-auto object-contain rounded-xl shadow-lg" 
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;