
import RegisterFormBrand from "../Components/Register/register-form-brand"
import BackButton from "../Components/Layout/back-button"


export default function RegisterBrand() {
  return (
   
    <div className="flex justify-center items-center w-screen min-h-screen responsive:bg-bgRegister bg-bgRegister bg-cover bg-no-repeat bg-center" >
         <BackButton />
         <RegisterFormBrand />
    </div>
    
  )
}