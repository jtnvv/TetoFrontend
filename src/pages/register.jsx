
import RegisterForm from "../Components/register-form"
import BackButton from "../Components/back-button"


export default function Register() {
  return (
   
    <div className="flex justify-center items-center w-screen h-screen bg-bgRegister" >
         <BackButton />
        <RegisterForm />
        
    </div>
    
  )
}
