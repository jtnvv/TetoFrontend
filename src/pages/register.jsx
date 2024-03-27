
import RegisterForm from "../Components/register-form"
import BackButton from "../Components/back-button"


export default function Register() {
  return (
   
    <div className="flex justify-center items-center w-screen h-screen" style={{backgroundImage: "url('../src/assets/bgRegister.png')",
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'}}>
         <BackButton />
        <RegisterForm />
        
    </div>
    
  )
}
