import React, { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { AuthApi } from "../features/Api/AuthApi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import reset from "../assets/reset.svg"

// Custom AuthLayout component for consistent centering and background
const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex items-center justify-center bg-zinc-900 p-4">
    {children}
  </div>
);

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();

  // State (Logic Preserved)
  const [step, setStep] = useState<"email" | "reset">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // RTK Queries (Logic Preserved)
  const [requestReset, { isLoading: requesting }] = AuthApi.useRequestPasswordResetMutation();
  const [resetPassword, { isLoading: resetting }] = AuthApi.useResetPasswordMutation();

  // Handlers (Logic Preserved)
  const handleRequestOtp = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await requestReset({ email }).unwrap();
      setMessage(res.message);
      setIsError(false);
      setStep("reset");
    } catch (err: any) {
      // Use standard error handling for consistency
      const errorMessage = err?.data?.error || err?.data?.message || "Failed to send OTP";
      setMessage(errorMessage);
      setIsError(true);
    }
  };

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await resetPassword({
        email,
        otp,
        newPassword,
      }).unwrap();

      setMessage(res.message);
      setIsError(false);

      setTimeout(() => navigate("/login"), 3000);
    } catch (err: any) {
      const errorMessage = err?.data?.error || err?.data?.message || "Password reset failed";
      setMessage(errorMessage);
      setIsError(true);
    }
  };

  const isLoading = requesting || resetting;

  return (
    <>
      <Navbar />
      <AuthLayout>
        {/* Main Container  */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-zinc-900 rounded-3xl overflow-hidden w-full max-w-6xl shadow-2xl shadow-zinc-400/20">
          
          {/*Image  */}
          <div className="hidden lg:flex items-center justify-center p-4 bg-gradient-to-br from-amber-300 via-amber-700 to-orange-500">
            <div className="p-8   ">
                <img
                    src={reset}
                    alt="Password Reset Illustration"
                    className="w-full max-w-xs h-auto object-contain"
                />
                <p className="text-zinc-500 text-center mt-6 text-sm font-medium">
                    Securely retrieve access to your account.
                </p>
            </div>
          </div>
          
          {/*  Form Area */}
          <div className="w-full p-8 md:p-12 bg-zinc-950 border border-zinc-800 lg:border-none">
            
            <header className="mb-8 border-b border-zinc-800 pb-4">
                <h1 className="text-3xl font-black text-amber-500 tracking-wider uppercase">
                {step === "email" ? "Request Reset" : "Finalize Reset"}
                </h1>
                <p className="text-zinc-400 text-sm mt-2">
                    {step === "email" ? "Enter your email to receive a verification code." : "Enter the OTP sent to your email and your new password."}
                </p>
            </header>


            {/* Status Message */}
            {message && (
              <div
                className={`p-4 mb-6 rounded-xl font-medium border text-sm ${
                  isError
                    ? "bg-red-950 text-red-300 border-red-800"
                    : "bg-green-950 text-green-300 border-green-800"
                }`}
              >
                {message}
              </div>
            )}

            {/* Email Form */}
            {step === "email" ? (
              <form onSubmit={handleRequestOtp} className="space-y-6">
                <input
                  type="email"
                  placeholder="Email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-800 text-white border border-zinc-700 focus:border-yellow-500 focus:ring-yellow-500 transition-colors placeholder-zinc-500"
                  disabled={isLoading}
                />

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-amber-500 text-zinc-950 font-black uppercase rounded-xl tracking-widest hover:bg-yellow-600 transition-all shadow-lg shadow-yellow-500/20 disabled:opacity-50"
                >
                  {requesting ? (
                    <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin h-5 w-5 border-2 border-black/30 border-t-black rounded-full" />
                        Sending OTP...
                    </div>
                  ) : "Send OTP"}
                </button>
              </form>
            ) : (
              /*  OTP and New Password Form */
              <form onSubmit={handleResetPassword} className="space-y-6">
                <input
                  type="text"
                  placeholder="6-digit OTP"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-800 text-white border border-zinc-700 focus:border-yellow-500 focus:ring-yellow-500 transition-colors placeholder-zinc-500"
                  disabled={isLoading}
                />

                <input
                  type="password"
                  placeholder="New password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-800 text-white border border-zinc-700 focus:border-yellow-500 focus:ring-yellow-500 transition-colors placeholder-zinc-500"
                  disabled={isLoading}
                />

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-yellow-500 text-zinc-950 font-black uppercase rounded-xl tracking-widest hover:bg-yellow-600 transition-all shadow-lg shadow-yellow-500/20 disabled:opacity-50"
                >
                  {resetting ? (
                    <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin h-5 w-5 border-2 border-black/30 border-t-black rounded-full" />
                        Resetting...
                    </div>
                  ) : "Reset Password"}
                </button>
              </form>
            )}
            
            <div className="text-center mt-6">
                <button
                    onClick={() => navigate('/login')}
                    className="text-sm font-medium text-zinc-500 hover:text-yellow-500 transition-colors"
                    disabled={isLoading}
                >
                    Remembered your password? Log in
                </button>
            </div>

          </div>
        </div>
      </AuthLayout>
      <Footer />
    </>
  );
};

export default ResetPassword;