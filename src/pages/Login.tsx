import React from "react";
import { AuthApi } from "../features/Api/AuthApi";
import { useNavigate } from "react-router";
import { setCredentials } from "../features/Slice/AuthSlice";
import { Toaster, toast } from "sonner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router";
import { Home } from "lucide-react";
import signIn from "../assets/signIn.svg";
import { useDispatch } from "react-redux";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { AppDispatch } from "../store/store"; 
type LoginFormValues = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const [loginUser, { isLoading }] = AuthApi.useLoginUserMutation();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>();

  // typed dispatch
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLoginForm: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      console.log("Form data:", data);

      const response = await loginUser(data).unwrap();
      console.log("Login successful:", response);

      dispatch(
        setCredentials({
          token: response.token,
          user: {
            ...response.userInfo,
            avatar: response.userInfo?.avatar ?? "",
            location: response.userInfo?.location ?? "",
            country: response.userInfo?.country ?? "",
            language: response.userInfo?.language ?? "",
            time_zone: response.userInfo?.time_zone ?? "",
          },
        })
      );

      // Navigation based on role
      const role = response?.userInfo?.role;
      if (role === "user") navigate("/vehicles");
      else if (role === "admin") navigate("/admin-dashboard");
      else navigate("/");

    } catch (error: any) {
      console.error("Login failed:", error);
      toast.error(error?.data?.error || "Login failed");
    }
  };

  return (
    <>
      <Toaster position="top-center" richColors />
      <Navbar />

      <div className="min-h-[80vh] bg-zinc-900 flex items-center justify-center py-10 px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-zinc-800 rounded-3xl overflow-hidden w-full max-w-7xl shadow-2xl shadow-gray-900/25">

          {/* Left Image */}
          <div className="lg:flex items-center justify-center p-4 bg-gradient-to-br from-amber-300 via-amber-700 to-orange-500">
            <img src={signIn} alt="Login" className="w-full max-w-sm rounded-2xl h-auto" />
          </div>

          {/* Form */}
          <div className="flex items-center justify-center p-8 lg:p-12">
            <div className="w-full max-w-md bg-zinc-900 rounded-2xl p-8 space-y-8">
              <div className="text-center mb-4">
                <h2 className="text-3xl font-bold text-[#FF8400] mb-2">Welcome Back</h2>
                <p className="text-[#eca381ff] text-base">Sign in to your account</p>
              </div>

              <form className="flex flex-col space-y-5" onSubmit={handleSubmit(handleLoginForm)}>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
                    })}
                    type="email"
                    className="w-full p-3 border border-gray-300 rounded-lg bg-transparent text-sm focus:outline-none focus:border-[#FF8400]"
                  />
                  {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                  <input
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 6, message: "Password must be at least 6 characters" },
                    })}
                    type="password"
                    className="w-full p-3 border border-gray-300 rounded-lg bg-transparent text-sm focus:outline-none focus:border-[#FF8400]"
                  />
                  {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                </div>

                <div className="text-right">
                  <Link to="/reset-password" className="text-amber-700 hover:text-amber-800 text-sm">
                    Forgot your password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#FF8400] text-white py-3 rounded-lg font-semibold transition hover:bg-[#e67700] w-full disabled:opacity-50"
                >
                  {isLoading ? <span className="loading loading-spinner text-warning"></span> : "Sign In"}
                </button>

                <div className="flex flex-col space-y-2 text-center mt-4">
                  <Link to="/" className="text-[#FF8400] hover:text-amber-700 flex items-center justify-center gap-1 text-sm">
                    <Home className="w-5 h-5" /> Go to HomePage
                  </Link>
                  <Link to="/register" className="text-amber-700 hover:text-amber-800 text-sm">
                    Don’t have an account? Register
                  </Link>
                </div>

              </form>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default Login;


