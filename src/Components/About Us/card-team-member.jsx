import { FaLinkedinIn } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
const CardTeamMember = (props) => {
    return (
        <div className="flex flex-wrap">
            <div className="flex flex-col items-center m-5 bg-brand-6 rounded-2xl text-brand-1 " >
                
                <img src={props.photo} alt={props.name} className="h-60 w-60 object-cover mb-1 rounded-lg" />
                <div className="p-3 items-center text-center justify-center space-y-2 mb-5">
                    <div className="mb-6">
                        <h2 className=" font-semibold text-sm mt-1">{props.name} </h2>
                        
                        <h2 className=" m-2  text-sm">{props.job}</h2>
                    </div>
                    
                    <div className="flex space-x-3 justify-center mt-10 ">
                        <FaGithub size={20}  />
                        <FaLinkedinIn size={20}  />
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default CardTeamMember;
