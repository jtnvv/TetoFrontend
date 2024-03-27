
import RegisterFormBrand from "../Components/register-form-brand"
import BackButton from "../Components/back-button"


export default function RegisterBrand() {
  return (
   
    <div className="flex justify-center items-center w-screen h-screen" style={{backgroundImage: "url('../src/assets/bgRegister.png')",
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'}}>
         <BackButton />
         <RegisterFormBrand />
        
        
    </div>
    
  )
}