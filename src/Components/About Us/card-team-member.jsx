import { FaLinkedinIn } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
const CardTeamMember = (props) => {
    return (
        <div className="flex flex-wrap">
            <div className="flex flex-col items-center m-5 bg-brand-6 rounded-2xl text-brand-1 font-default" >

                <img src={props.photo} alt={props.name} className="h-60 w-60 object-cover mb-1 rounded-lg" />
                <div className="p-3 items-center text-center justify-center space-y-2 mb-5">
                    <div className="mb-6">
                        <h2 className="font-semibold text-xl mt-1">{props.name} </h2>

                        <h2 className=" m-2  text-sm">{props.job}</h2>
                    </div>

                    <div className="flex space-x-3 justify-center mt-10 cursor-pointer" >
                        <a className="text-white" href={props.github}>
                            <FaGithub size="1.5em" />
                        </a>
                        <a className="text-white" href={props.linkedin}>
                            <FaLinkedinIn size="1.5em" />
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CardTeamMember;
