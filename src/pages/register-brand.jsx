
import RegisterFormBrand from "../Components/register-form-brand"
import BackButton from "../Components/back-button"


export default function RegisterBrand() {
  return (
   
    <div className="flex justify-center items-center w-screen h-screen bg-bgRegisterBrand bg-cover bg-no-repeat bg-center" >
         <BackButton />
         <RegisterFormBrand />
    </div>
    
  )
}