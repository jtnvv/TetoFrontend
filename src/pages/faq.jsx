import Layout from "../Components/Layout/layout"
import Question from "../Components/faq/question"

export default function Faq() {
  return (
    <Layout>
        <div className="m-11">
            <Question content="Qué métodos de pago aceptan" answer="Utilizamos Mercado Pago como nuestra pasarela de pago, lo que permite a los usuarios pagar mediante dinero en efectivo, tarjetas de débito y crédito, así como a través de PSE."/>
            <Question content="Es gratis publicar mis productos" answer="Sí, publicar tus productos es totalmente gratis. Nuestro modelo de negocio aplica una tarifa del 5% o del 7% en cada venta. Si tu producto es publicado con prioridad, tendrá una comisión del 7%. En caso contrario, la comisión será del 5%."/>
            <Question content="Cómo me registro" answer="Para registrarte, debes hacer clic en el ícono del avatar en la esquina superior izquierda de la web. Esto te llevará al formulario de inicio de sesión. En la parte inferior de ese formulario, encontrarás un enlace para acceder al formulario de registro, donde deberás completar los datos solicitados para crear una cuenta."/>
            <Question content='Cómo activo mi cuenta' answer='Para activar tu cuenta, una vez que haya sido creada, debes iniciar sesión. Luego, ve al apartado de perfil haciendo clic en el ícono en la esquina superior izquierda, el mismo que usaste para registrarte. Esto te llevará a la página de activación. Allí, haz clic en el botón "Activar cuenta". Luego recibirás un correo electrónico en la dirección que registraste para tu cuenta. Este correo contendrá un código que deberás ingresar en el campo correspondiente. Si el código es correcto, tu cuenta se activará exitosamente.'/>
            <Question content="Cómo puedo poner una queja" answer='Para comunicarte con nosotros sobre cualquier asunto, queja, reclamo o petición, puedes utilizar el formulario de contacto. Lo encontrarás en la parte inferior de la web, en la sección de "Más".'/>
            <Question content="Mis datos están protegidos" answer='Tus datos sensibles son manejados de acuerdo con los términos y condiciones de la empresa, los cuales puedes encontrar en el menú inferior, en la sección de "TETO". Además, los datos viajan cifrados por la web hasta nuestra base de datos, garantizado mediante el certificado SSL de nuestro sitio web.'/>
            <Question content="Cuánto tarda en llegar las prendas" answer='El tiempo de envío de las prendas depende del vendedor. Sin embargo, puede tardar entre 2 y 10 días hábiles, dependiendo de la empresa de mensajería y la distancia entre el vendedor y tu dirección.'/>
            <Question content="Cuánto demoro en recibir el pago por mis ventas" answer="El pago por ventas se realizará de manera semanal, los días martes. Al recibir ventas, Teto se pondrá en contacto con tu tienda para confirmar los detalles de la cuenta bancaria en la que deseas recibir la transacción."/>
            <Question content="Cómo agrego un producto con prioridad" answer='Al ingresar a tu cuenta de tienda, dirígete al menú superior y selecciona la sección de "Subir productos". Allí podrás ingresar la información deseada de tu producto. Al final del proceso, tendrás dos botones: uno para agregar con prioridad. Al hacer clic en este botón, tu producto se publicará con prioridad.'/>
            <Question content="Cómo edito mis productos" answer="Al iniciar sesión en tu cuenta, ve a la sección de tu perfil en el menú superior. Allí verás los productos publicados en tu marca. Al hacer clic en alguno de ellos, podrás ver y editar la información del producto si lo deseas. Ten en cuenta que el nombre, la imagen y la prioridad del producto no se pueden editar una vez que el producto esté publicado en nuestra web. Para cambiar estos detalles, deberás subir un nuevo producto."/>
        </div>
    </Layout>
  )
}
