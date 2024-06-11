
import RegisterForm from "../Components/Register/register-form"
import BackButton from "../Components/Layout/back-button"


export default function Register() {
  return (
   
    <div className="flex justify-center items-center min-h-screen responsive:w-screen responsive:min-h-screen responsive:bg-bgRegisterBrand responsive:bg-cover responsive:bg-no-repeat responsive:bg-center" >
        <BackButton />
        <RegisterForm />
    </div>
    
  )
}
