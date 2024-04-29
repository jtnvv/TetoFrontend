
import RegisterForm from "../Components/Register/register-form"
import BackButton from "../Components/Layout/back-button"


export default function Register() {
  return (
   
    <div className="flex justify-center items-center w-screen h-screen bg-bgRegister  bg-cover bg-no-repeat bg-center" >
         <BackButton />
        <RegisterForm />
        
    </div>
    
  )
}
