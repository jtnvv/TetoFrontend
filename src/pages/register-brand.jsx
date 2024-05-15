
import RegisterFormBrand from "../Components/Register/register-form-brand"
import BackButton from "../Components/Layout/back-button"


export default function RegisterBrand() {
  return (
   
    <div className="flex justify-center items-center responsive:w-screen responsive:h-screen responsive:bg-bgRegisterBrand responsive:bg-cover responsive:bg-no-repeat responsive:bg-center" >
         <BackButton />
         <RegisterFormBrand />
    </div>
    
  )
}