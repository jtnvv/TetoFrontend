
import CardTeamMember from "../Components/About Us/card-team-member"
import Layout from "../Components/Layout/layout"
export default function AboutUs() {

    const PhotoAcevedo = "https://media.licdn.com/dms/image/C4E03AQFmYdgQI_auSQ/profile-displayphoto-shrink_200_200/0/1640458742111?e=1720656000&v=beta&t=XQdLODfujR8PSKDwzabc5SS3sy8TlOJA-N1pcHReal4"
    const PhotoDaniel = "https://raw.githubusercontent.com/jtnvv/TetoFrontend/gestionar-publicidad-sobre-nosotros/src/assets/DanielPerezLinkedin.png"
    const PhotoVelosa = "https://media.licdn.com/dms/image/D4E03AQGWmrWOzk8deQ/profile-displayphoto-shrink_200_200/0/1680552567690?e=1720656000&v=beta&t=9aDvvIA3bLwl5imleFnyQnU5K0z0Zkd1Hnk6WA3ZSkg"
    const PhotoCastro =  "https://media.licdn.com/dms/image/C4E03AQFXS0oSBgHEUQ/profile-displayphoto-shrink_200_200/0/1634420817959?e=1720656000&v=beta&t=tHTyRc2NXqEhQWlaYMN4GJEhG8l8VYQ9rdRMi78cBTI"
    
    const AcevedoGithub = "https://github.com/JSAcevedos"
    const DanielGithub = "https://github.com/daperezch"
    const VelosaGithub = "https://github.com/jtnvv"
    const CastroGithub = "https://github.com/SergioACV"

    const AcevedoLinkedin = "https://www.linkedin.com/in/juan-steban-acevedo-salinas/"
    const DanielLinkedin = "https://www.linkedin.com/in/williamhgates/"
    const VelosaLinkedin = "https://www.linkedin.com/in/jtnvv/"
    const CastroLinkedin = "https://www.linkedin.com/in/sergioacastrov/"

    
    return (
        <div className="hide-scrollbar">
            <Layout>
                <div className="w-screeen min-h-screen font-inknut">
                    <div className="flex  w-screen h-auto text-white ">
                        <div className="w-1/2 bg-bgMision bg-cover" >
                            <div className="p-20 text-center ">
                                <div className="text-5xl">
                                    MISIÓN
                                </div>
                                <div className="text-1xl mt-3 leading-10">
                                Promover el crecimiento de las marcas de ropa colombianas, mostrando sus productos sostenibles y auténticos a compradores, reuniendo estas marcas en un mismo e-commerce haciendo las compras más confiables y convenientes.
                                </div>

                            </div>
                            
                        </div>
                        <div className="w-1/2 bg-bgVision bg-cover">
                            <div className="p-20 text-center">
                                <div className="text-5xl">
                                        VISIÓN
                                </div>
                                <div className="text-1xl mt-3 leading-10">
                                    Para el 2028, TETO será la plataforma de confianza para compradores, y vendedores de ropa auténtica y sostenible en Colombia. 
                                </div>

                            </div>
                        </div>

                    </div>
                    <div className="w-screen h-1/2">
                        <div className="font-semibold text-5xl text-center m-4">
                            NUESTRO EQUIPO

                        </div>
                        <div className="ml-40 mr-40">
                            <div className="grid 2xl:grid-cols-4 xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-1 max-w-1x10 place-items-center ">
                            
                                <CardTeamMember name={"Juan Acevedo"} job={"Fullstack y Devops"} photo={PhotoAcevedo} github={AcevedoGithub} linkedin={AcevedoLinkedin}/>
                                <CardTeamMember name={"Daniel Perez"} job={"Gestor BD y Backend"} photo={PhotoDaniel} github={DanielGithub} linkedin={DanielLinkedin}/>
                                <CardTeamMember name={"Jonathan Velosa"} job={"UX/UI Y FullStack"} photo={PhotoVelosa} github={VelosaGithub} linkedin={VelosaLinkedin} />
                                <CardTeamMember name={"Sergio Castro"}job={"BD y Backend"} photo={PhotoCastro} github={CastroGithub} linkedin={CastroLinkedin}/>

                            </div>
                        </div>


                    </div>

                </div>
                
            </Layout>
        </div>

    )
}