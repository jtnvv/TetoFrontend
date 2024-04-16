import React from "react";

const CardOrderUser = (props) => {


    return (

        <div className="text-white ">
                        <div className="flex  bg-[#646458] rounded px-10 py-1 gap-3  items-center">
                            <div className="mt-2 mb-2 w-2/12">
                                <img src="/favicon.svg" alt="prueba" className="h-20 w-20 object-cover " />
                            </div>
                            <div className="w-8/12">
                                    <p className="text-lg text-white-900 dark:text-white font-semibold ">Hoddie Blanco</p>
                                    <p className="text-sm text-white-900 dark:text-white ">Enviar a:</p>
                                    <p className="text-sm text-white-900 dark:text-white ">Cra 7 # 18 198 Sur</p>


                            </div>
                            <div className="w-2/12">
                                <p className="text-sm text-white-900 dark:text-white ">Calificar</p>
                                <p className="text-lg text-white-900 dark:text-white font-semibold mb-3 ">$150.000</p>
                                
                               

                            </div>

                        </div>

                    </div>

    )

}

export default CardOrderUser