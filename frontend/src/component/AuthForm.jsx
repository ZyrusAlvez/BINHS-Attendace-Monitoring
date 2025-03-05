import { useState } from "react";
import { FaEye, FaEyeSlash, FaUser, FaLock } from "react-icons/fa"
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPasswords, setShowPasswords] = useState({});
  const [signUpData, setSignUpData] = useState({ username: "", password: "", confirmPassword: "" });
  const [loginData, setLoginData] = useState({ username: "", password: "" });

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSignUpChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };
  
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (signUpData.password !== signUpData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await registerAccount(signUpData.username, signUpData.password);
      alert("Account created successfully!");
      setIsSignUp(false);
      console.log(response);
      navigate("/");
    } catch (error) {
      alert("Error creating account.");
      console.error(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginAccount(loginData.username, loginData.password);
      alert("Login successful!");
      console.log(response);
      navigate("/");
    } catch (error) {
      alert("Login failed!");
      console.error(error);
    }
  };

  const handleChangeForm = (e) => {
    e.preventDefault();
    setSignUpData({ username: "", password: "", confirmPassword: "" });
    setLoginData({ username: "", password: "" });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className={`relative w-96 p-10 overflow-hidden transition-transform duration-500 transform ${isSignUp ? "animate-slideDown" : "animate-slideUp"}`}>
        <div className="relative z-10 flex flex-col items-center transition-all duration-500">
          {isSignUp ? (
            <form className="w-full" onSubmit={handleSignUp}>
              <h2 className="text-2xl text-black text-center mb-4">Sign Up</h2>
              <InputField type="text" label="Username" name="username" value={signUpData.username} onChange={handleSignUpChange} icon={<FaUser />} />
              <InputField type="password" label="Password" name="password" value={signUpData.password} onChange={handleSignUpChange} icon={<FaLock />} isPassword showPassword={showPasswords.signUpPassword} togglePassword={() => togglePasswordVisibility("signUpPassword")} />
              <InputField type="password" label="Confirm Password" name="confirmPassword" value={signUpData.confirmPassword} onChange={handleSignUpChange} icon={<FaLock />} isPassword showPassword={showPasswords.confirmPassword} togglePassword={() => togglePasswordVisibility("confirmPassword")} />
              <div className="text-black text-sm mb-4">
                <label>
                  <input type="checkbox" className="mr-2" required /> I agree to the terms & conditions
                </label>
              </div>
              <AuthButton label="Sign Up" />
              <p className="text-black text-center mt-4">
                Already have an account? <span className="text-blue-400 cursor-pointer" onClick={(e) => { setIsSignUp(false); handleChangeForm(e); }}>Sign In</span>
              </p>
            </form>
          ) : (
            <form className="w-full" onSubmit={handleLogin}>
              <h2 className="text-2xl text-black text-center mb-4">Login</h2>
              <InputField type="text" label="Username" name="username" value={loginData.username} onChange={handleLoginChange} icon={<FaUser />} />
              <InputField type="password" label="Password" name="password" value={loginData.password} onChange={handleLoginChange} icon={<FaLock />} isPassword showPassword={showPasswords.loginPassword} togglePassword={() => togglePasswordVisibility("loginPassword")} />
              <div className="text-black text-sm mb-4">
                <label>
                  <input type="checkbox" className="mr-2" /> Remember me
                </label>
              </div>
              <AuthButton label="Login" />
              <p className="text-black text-center mt-4">
                Don't have an account? <span className="text-blue-400 cursor-pointer" onClick={(e) => { setIsSignUp(true); handleChangeForm(e); }}>Sign Up</span>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const InputField = ({ type, label, icon, isPassword, showPassword, togglePassword, name, value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className="relative mb-4">
      <input
        type={isPassword && showPassword ? "text" : type}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full px-4 py-2 border-b-2 text-black outline-none bg-transparent z-50"
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => setIsFocused(e.target.value !== "")}
      />
      <label className={`z-[-50] flex items-center gap-x-2 absolute left-4 top-1/2 transform -translate-y-1/2 text-black transition-all ${isFocused ? "-translate-y-8 text-sm" : ""}`}>
        {icon} {label}
      </label>
      {isPassword && togglePassword && (
        <button type="button" className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" onClick={togglePassword}>
          {showPassword ? <FaEyeSlash className="text-xl" /> : <FaEye className="text-xl" />}
        </button>
      )}
    </div>
  );
};

const AuthButton = ({ label }) => <button className="w-full py-2 bg-blue-500 text-white font-semibold rounded-full shadow-md hover:bg-blue-600">{label}</button>;

export default AuthForm;