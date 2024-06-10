import { useState } from "react";
import { createContext } from "react";
import Recovered from "../Components/Login/Recovered";
import Reset from "../Components/Login/Reset";
import OTPInput from "../Components/Login/OTPinput";
import LoginForm from "../Components/Login/login-form";
import RegisterForm from "../Components/Register/register-form"

export const RecoveryContext = createContext();
function Login() {
  const [page, setPage] = useState("login");
  const [email, setEmail] = useState();
  const [otp, setOTP] = useState();

  function NavigateComponents() {
    if (page === "login") return <LoginForm />;
    if (page === "otp") return <OTPInput />;
    if (page === "reset") return <Reset />;
    return <Recovered />;
  }

  return (
    <RecoveryContext.Provider
      value={{ page, setPage, otp, setOTP, setEmail, email }}
    >
      <div className="flex justify-center items-center responsive:w-screen responsive:h-screen responsive:bg-bgRegisterBrand responsive:bg-cover responsive:bg-no-repeat responsive:bg-center" >
        <NavigateComponents />
      </div>
    </RecoveryContext.Provider>
  );
}

export default Login;