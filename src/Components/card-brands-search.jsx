import React  from "react"

const CardBrandsSearch = (props) => {


    return (
        <div className="max-w-md mx-auto bg-black rounded-xl shadow-md overflow-hidden md:max-w-2xl cursor-pointer" style={{backgroundColor: 'rgba(0, 0, 0, 0.8)'}}>
            <div className="md:flex ">
                
                <div className="p-10 ">
                    <div className="uppercase tracking-wide text-sm text-white-500 font-semibold">{props.name_branch}</div>
                    
                    <p className="mt-2 text-white-500">{"Descripción: "+props.description_branch}
                    </p>
                    <p className="mt-2 text-white-500">{"Telefono: "+props.phone_branch}
                    </p>
                </div>
                <div className="md:shrink-0">
                    <img className="h-48 w-full object-cover md:h-full md:w-48" src="https://loremflickr.com/g/320/240/team" /> {/*CAMBIAR LUEGO POR EL LINK DE LA IMAGEN*/ }
                </div>
            </div>
        </div>

    )
}

export default CardBrandsSearch