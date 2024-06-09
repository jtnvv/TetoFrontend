import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { RecoveryContext } from "../../pages/login";
import { sendRecoveryEmail } from "../../api/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export default function () {
  const { email, otp, setPage } = useContext(RecoveryContext);
  const [timerCount, setTimer] = React.useState(60);
  const [OTPinput, setOTPinput] = useState([0, 0, 0, 0]);
  const [disable, setDisable] = useState(true);
  

  async function resendOTP() {
    if (disable) return;
    setTimer(60)
    setDisable(true);
    const OTP = otp
    try {
      const res = await sendRecoveryEmail({OTP, recipient_email: email,
      });
      toast.warn("Se ha enviado el código a tu correo")
      setPage("otp");
    } catch (error) {
      console.log(error);
    }
  }

  function verfiyOTP() {
    if (parseInt(OTPinput.join("")) === otp) {
      setPage("reset");
      return;
    }
    toast.warn("código incorrecto")
    alert(
      "The code you have entered is not correct, try again or re-send the link"
    );
    return;
  }

  React.useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000); //each count lasts for a second
    //cleanup the interval on complete
    return () => clearInterval(interval);
  }, [disable]);

  return (
    <div
      className="flex w-screen h-screen"
      style={{
        backgroundImage: "url('../src/assets/bgRegister.png')",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex justify-center items-center w-screen h-screen bg-gray-50">
        <div className="bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="block text-gray-700 font-bold mb-2 font-default text-left text-3xl">
                <p>Verificación de Correo</p>
              </div>
              <div className="block text-gray-700 font-bold mb-2 font-default text-left text-lg">
                <p>Te envíamos un código a tu correo {email}</p>
              </div>
            </div>

            <div>
              <form>
                <div className="flex flex-col space-y-16">
                  <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                    <div className="w-16 h-16 ">
                      <input
                        maxLength="1"
                        className="text-brand-6 w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        name=""
                        id=""
                        onChange={(e) =>
                          setOTPinput([
                            e.target.value,
                            OTPinput[1],
                            OTPinput[2],
                            OTPinput[3],
                          ])
                        }
                      ></input>
                    </div>
                    <div className="w-16 h-16 ">
                      <input
                        maxLength="1"
                        className="text-brand-6 w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        name=""
                        id=""
                        onChange={(e) =>
                          setOTPinput([
                            OTPinput[0],
                            e.target.value,
                            OTPinput[2],
                            OTPinput[3],
                          ])
                        }
                      ></input>
                    </div>
                    <div className="w-16 h-16 ">
                      <input
                        maxLength="1"
                        className="text-brand-6 w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        name=""
                        id=""
                        onChange={(e) =>
                          setOTPinput([
                            OTPinput[0],
                            OTPinput[1],
                            e.target.value,
                            OTPinput[3],
                          ])
                        }
                      ></input>
                    </div>
                    <div className="w-16 h-16 ">
                      <input
                        maxLength="1"
                        className="text-brand-6 w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        name=""
                        id=""
                        onChange={(e) =>
                          setOTPinput([
                            OTPinput[0],
                            OTPinput[1],
                            OTPinput[2],
                            e.target.value,
                          ])
                        }
                      ></input>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-5">
                    <div>
                      <a
                        onClick={() => verfiyOTP()}
                        className="flex flex-row cursor-pointer items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                      >
                        Verificar cuenta
                      </a>
                    </div>

                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                      <p>¿No recibiste el código?</p>{" "}
                      <a
                        href="#"
                        style={{
                          color: disable ? "gray" : "blue",
                          cursor: disable ? "none" : "pointer",
                          textDecorationLine: disable ? "none" : "underline",
                          }}
                        onClick={() => resendOTP()}
                         className="text-gray-800"
                      >
                        {disable
                          ? `Reenviar código ${timerCount}s`
                          : "Reenviar código"}
                      </a>
                      <ToastContainer />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
