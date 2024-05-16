
import CardTeamMember from "../Components/About Us/card-team-member"
import Layout from "../Components/Layout/layout"
export default function AboutUs() {

    const PhotoAcevedo = "https://raw.githubusercontent.com/jtnvv/LabCRUD-TETO/main/Frontend/src/assets/acevedo.jpg"
    const PhotoDaniel = "https://raw.githubusercontent.com/jtnvv/LabCRUD-TETO/main/Frontend/src/assets/daniel.png"
    const PhotoVelosa = "https://raw.githubusercontent.com/jtnvv/LabCRUD-TETO/main/Frontend/src/assets/jonathan.jpeg"
    const PhotoCastro = "https://raw.githubusercontent.com/jtnvv/LabCRUD-TETO/main/Frontend/src/assets/sergio.jpeg"

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
                <div className="w-screeen min-h-screen font-default">
                    <div className="responsive:flex  w-screen h-auto text-white ">
                        <div className="w-full h-3/4 responsive:w-1/2 bg-bgMision bg-cover" >
                            <div className="px-20 text-center py-32">
                                <div className="text-6xl font-semibold font-logo">
                                    MISIÓN
                                </div>
                                <div className="text-xl mt-3 leading-15 responsive:p-10">
                                    Promover el crecimiento de las marcas de ropa colombianas, mostrando sus productos sostenibles y auténticos a compradores, reuniendo estas marcas en un mismo e-commerce haciendo las compras más confiables y convenientes.
                                </div>

                            </div>

                        </div>
                        <div className="w-full responsive:w-1/2 bg-bgVision bg-cover">
                            <div className="px-20 py-32 text-center">
                                <div className="text-6xl font-semibold font-logo">
                                    VISIÓN
                                </div>
                                <div className="text-xl mt-3 leading-15 responsive:p-10">
                                    Para el 2028, TETO será la plataforma de confianza para compradores, y vendedores de ropa auténtica y sostenible en Colombia.
                                </div>

                            </div>
                        </div>

                    </div>
                    <div className="my-12">
                        <div className="font-semibold text-5xl text-center m-4 font-logo">
                            NUESTRO EQUIPO

                        </div>
                        <div>
                            <div className="flex flex-wrap justify-center">

                                <CardTeamMember name={"Juan Acevedo"} job={"Fullstack y Devops"} photo={PhotoAcevedo} github={AcevedoGithub} linkedin={AcevedoLinkedin} />
                                <CardTeamMember name={"Daniel Perez"} job={"Gestor BD y Backend"} photo={PhotoDaniel} github={DanielGithub} linkedin={DanielLinkedin} />
                                <CardTeamMember name={"Jonathan Velosa"} job={"UX/UI Y FullStack"} photo={PhotoVelosa} github={VelosaGithub} linkedin={VelosaLinkedin} />
                                <CardTeamMember name={"Sergio Castro"} job={"BD y Backend"} photo={PhotoCastro} github={CastroGithub} linkedin={CastroLinkedin} />

                            </div>
                        </div>


                    </div>

                </div>

            </Layout>
        </div>

    )
}