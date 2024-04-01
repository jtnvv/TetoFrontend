import BackButton from "../Components/back-button";
import LoginForm from "../Components/login-form";

export default function loginStore() {
    return (
        
        <div className="bg-white h-screen w-screen">
            <BackButton />
            
            <LoginForm />
            
        </div>
    )
  }
  