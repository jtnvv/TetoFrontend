import Layout from "../Components/Layout/layout";

export default function Terminos() {
    return (
        <Layout>
            <div className="font-default responsive:px-64 px-5 my-5 text-justify">
                <h1 className="font-logo font-bold text-center text-4xl my-5">Términos y Condiciones de Uso de TETO</h1>

                <h2 className="font-bold text-xl mt-5">1. Definiciones</h2>
                <ul className="list-disc list-inside">
                    <li><strong>TETO</strong>: Hace referencia a la plataforma online TETO, a través de la cual se facilita la compra y venta de artículos de vestimenta de producción local en Colombia.</li>
                    <li><strong>Usuario</strong>: Cualquier persona física o jurídica que acceda y utilice los servicios ofrecidos por TETO, ya sea como comprador o vendedor.</li>
                </ul>

                <h2>Registro y Uso de la Plataforma</h2>
                <ul className="list-disc list-inside">
                    <li><strong>Registro de Usuarios</strong>: Todos los usuarios deben registrarse en TETO para poder acceder a las funcionalidades completas de la plataforma, incluyendo la compra y venta de productos. El registro requiere la provisión de información verídica y actualizada.</li>
                    <li><strong>Uso Autorizado</strong>: Al registrarse en TETO, el usuario acepta utilizar la plataforma únicamente para los fines legales y autorizados según estos términos y condiciones. El usuario es responsable de mantener la confidencialidad de su cuenta y contraseña.</li>
                </ul>

                <h2 className="font-bold text-xl mt-5">2. Compras y Ventas</h2>
                <ul className="list-disc list-inside">
                    <li><strong>Proceso de Compra</strong>: Los usuarios pueden comprar productos disponibles en TETO siguiendo el proceso de compra establecido en la plataforma.</li>
                    <li><strong>Proceso de Venta</strong>: Los vendedores pueden listar productos para la venta en TETO siguiendo los procedimientos y políticas establecidas por la plataforma.</li>
                    <li><strong>Comisiones de Venta</strong>: TETO retendrá automáticamente una comisión del 5% sobre el precio de venta de cada producto vendido a través de la plataforma y cambiara a 7% si la marca, desea promocionar su producto dentro de TETO. Este porcentaje puede estar sujeto a cambios y será comunicado a los usuarios.</li>
                </ul>


                <h2 className="font-bold text-xl mt-5">3. Seguridad y Privacidad</h2>
                <ul className="list-disc list-inside">
                    <li><strong>Seguridad</strong>: TETO implementa medidas de seguridad razonables para proteger la información de los usuarios contra accesos no autorizados, pérdidas o alteraciones.</li>
                    <li><strong>Privacidad</strong>: La recopilación y uso de información personal por parte de TETO se rige por nuestra Política de Privacidad, disponible a continuación en <a href="#politica" className="text-brand-6 underline">Ir a política de privacidad</a>. Al utilizar TETO, el usuario acepta las prácticas descritas en dicha política.</li>
                </ul>

                <h2 className="font-bold text-xl mt-5">4. Modificaciones y Terminación</h2>
                <ul className="list-disc list-inside">
                    <li><strong>Modificaciones</strong>: TETO se reserva el derecho de modificar estos términos y condiciones en cualquier momento. Las modificaciones entrarán en vigor al ser publicadas en la plataforma. Se recomienda a los usuarios revisar periódicamente los términos y condiciones actualizados.</li>
                    <li><strong>Terminación</strong>: TETO se reserva el derecho de terminar, suspender o restringir el acceso de un usuario a la plataforma, sin previo aviso, en caso de incumplimiento de estos términos y condiciones.</li>
                </ul>

                <h2 className="font-bold text-xl mt-5">5. Ley Aplicable y Jurisdicción</h2>
                <ul className="list-disc list-inside">
                    <li><strong>Ley Aplicable</strong>: Estos términos y condiciones se rigen por las leyes de la República de Colombia.</li>
                    <li id="politica"><strong>Jurisdicción</strong>: Cualquier disputa que surja en relación con estos términos y condiciones será sometida a la jurisdicción exclusiva de los tribunales competentes de la República de Colombia.</li>
                </ul>

                <p className="mt-5">Al utilizar TETO, el usuario acepta cumplir con estos términos y condiciones. Si no está de acuerdo con alguno de estos términos, no está autorizado para utilizar TETO.</p>
            </div>
            <div className="font-default my-5 responsive:px-64 px-5 text-justify">
                <h1 className="font-logo font-bold text-center text-4xl my-5">Política de Privacidad de TETO</h1>
                <p>Esta Política de Privacidad describe cómo TETO ("nosotros", "nuestro/a") recopila, utiliza y comparte la información personal de los usuarios ("usuarios", "usted") que utilizan nuestra aplicación móvil y/o sitio web (en adelante, "la Plataforma").</p>

                <h2 className="font-bold text-xl mt-5">1. Información que Recopilamos</h2>
                <ul className="list-disc list-inside">
                    <li><strong>Información Personalmente Identificable</strong>: Podemos recopilar información que identifica personalmente a los usuarios, como nombres, direcciones de correo electrónico, números de teléfono y direcciones postales cuando los usuarios interactúan con nuestra Plataforma.</li>
                    <li><strong>Información de Registro</strong>: Cuando los usuarios crean una cuenta en nuestra Plataforma, podemos recopilar información de registro, como nombres de usuario y contraseñas.</li>
                    <li><strong>Información de Transacciones</strong>: Si los usuarios realizan compras u otras transacciones a través de nuestra Plataforma, podemos recopilar información necesaria para procesar esas transacciones, como detalles de pago y envío.</li>
                    <li><strong>Información de Uso</strong>: Podemos recopilar información sobre cómo los usuarios interactúan con nuestra Plataforma, como las páginas visitadas, el tiempo de permanencia en el sitio y los clics realizados.</li>
                </ul>

                <h2 className="font-bold text-xl mt-5">2. Uso de la Información Recopilada</h2>
                <p>Utilizamos la información recopilada para los siguientes propósitos:</p>
                <ul className="list-disc list-inside">
                    <li>Para proporcionar y mejorar nuestros servicios.</li>
                    <li>Para procesar transacciones y responder a las solicitudes de los usuarios.</li>
                    <li>Para personalizar la experiencia del usuario y ofrecer contenido y publicidad adaptados a sus intereses.</li>
                    <li>Para enviar correos electrónicos periódicos con respecto a transacciones y actualizaciones de la Plataforma.</li>
                </ul>

                <h2 className="font-bold text-xl mt-5">3. Protección de la Información</h2>
                <p>Implementamos medidas de seguridad razonables para proteger la información personal contra accesos no autorizados, alteraciones, divulgaciones o destrucciones no autorizadas.</p>

                <h2 className="font-bold text-xl mt-5">4. Compartición de la Información</h2>
                <p>No vendemos, intercambiamos ni transferimos de ninguna otra manera información personal identificable a terceros, a menos que lo notifiquemos previamente a los usuarios y obtengamos su consentimiento.</p>

                <h2 className="font-bold text-xl mt-5">5. Cookies y Tecnologías Similares</h2>
                <p>Nuestra Plataforma puede utilizar cookies y tecnologías similares para mejorar la experiencia del usuario y para fines analíticos. Los usuarios pueden configurar sus navegadores para rechazar cookies, pero esto puede afectar la funcionalidad de ciertas partes de la Plataforma.</p>

                <h2 className="font-bold text-xl mt-5">6. Cambios en la Política de Privacidad</h2>
                <p>Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento. Se alienta a los usuarios a revisar esta página periódicamente para estar informados sobre cómo estamos protegiendo la información personal que recopilamos. La fecha de la última actualización se indica al principio de este documento.</p>

                <h2 className="font-bold text-xl mt-5">7. Consentimiento</h2>
                <p>Al utilizar nuestra Plataforma, usted acepta los términos de esta Política de Privacidad.</p>

                <h2 className="font-bold text-xl mt-5">8. Contacto</h2>
                <p>Si tiene alguna pregunta sobre esta Política de Privacidad, las prácticas de nuestra Plataforma, o si desea ejercer sus derechos con respecto a sus datos personales, por favor contáctenos a <a href="mailto:tetodress@gmail.com" className="text-brand-6 underline">tetodess@gmail.com</a>.</p>
                <p className="my-5">Última actualización: 16 de junio de 2024</p>
            </div>
        </Layout>
    )
}