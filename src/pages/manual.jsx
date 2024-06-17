import Layout from "../Components/Layout/layout";

export default function Manual() {
    return (
        <Layout>
            <div className="m-0 p-0 w-full h-full bg-bgVision text-brand-1">
                <div className="flex-col justify-center font-default responsive:pt-10 pt-5">
                    <h1 className="font-logo responsive:text-5xl text-3xl text-center font-bold mb-5">MANUAL DE USUARIO</h1>
                    <div className="bg-brand-1 responsive:mx-64 text-brand-6 rounded-lg py-5 shadow-sm mx-2 px-2">
                        <p className="text-center">En este apartado, puedes ver y descargar el manual de usuario, con las dudas más frecuentes de la aplicación para mejorar tu experiencia en TETO, si deseas comunicarte con nosotros a motivo de Peticiones, quejas, reclamos o sugerencias (PQRS), <a href="/contactanos" className="text-brand-6 underline"> comunícate con nosotros</a>.</p>
                        <p className="text-center mt-3">Si quieres conocer los terminos y condiciones de uso de la aplicación, puedes verlos <a href="/terminos" className="text-brand-6 underline">aquí</a>.
                        </p>
                    </div>
                </div>
                <div className="my-10 responsive:mx-44 flex justify-center">
                    <iframe src="https://drive.google.com/file/d/1AH5d01LngwbYYE9m3fGeHpf-dpykd7sG/preview" width="90%" height="850px" allow="autoplay"></iframe>
                </div>
            </div>
        </Layout>
    )
}