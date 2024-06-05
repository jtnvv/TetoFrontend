import { useState } from 'react';
import Layout from "../Components/Layout/layout"
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { sendContact } from '../api/order';
import { toast, ToastContainer } from 'react-toastify';

export default function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [subject, setSubject] = useState('');
    const [nameFocus, setNameFocus] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [messageFocus, setMessageFocus] = useState(false);
    const [subjectFocus, setSubjectFocus] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        sendContact({
            "recipient_email": email,
            "nameUser": name,
            "subject": subject,
            "message": message
        }).then(() => {
            toast.success('Mensaje enviado correctamente');

        }).catch(() => {
            toast.error('Hubo un error al enviar el mensaje');
        });
    }
    return (
        <Layout>
            <ToastContainer />
            <div className='flex bg-bgMision h-full justify-center'>
                <div className='responsive:w-1/2 w-full'>
                    <h1 className="mt-20 text-4xl font-bold text-center text-brand-1 font-logo">CONTACTO</h1>
                    <form className="bg-brand-1 shadow-md rounded my-10 mx-5 px-8 py-14 mb-20 font-default" onSubmit={handleSubmit}>
                        <p className='px-10'>En TETO estamos para ayudarte, este apartado esta destinado a peticiones, quejas, reclamos o sugerencias(PQRS), tambien te puedes contactar con nosotros a través de nuestro correo electrónico o redes sociales:</p>
                        <div className='flex justify-center'>
                            <div className="w-full responsive:w-1/3 bg-brand-3 rounded p-5 mt-5 mb-8">
                                <p className='text-center text-lg text-brand-1'>tetodress@gmail.com</p>
                                <div className='flex justify-center space-x-2'>
                                    <a href='https://www.instagram.com/teto_dress/'><FaInstagram color='white' size='1.5em' /></a>
                                    <a href='https://x.com/teto_dress'><FaTwitter color='white' size='1.5em' /></a>
                                    <a href='https://www.facebook.com/tetto.dress'><FaFacebook color='white' size='1.5em' /></a>
                                </div>
                            </div>
                        </div>
                        <div className="mb-7 relative">
                            <input
                                className="bg-white border rounded w-full py-2 px-3 text-brand-6 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                onFocus={() => setNameFocus(true)}
                                onBlur={() => setNameFocus(false)}
                                required
                            />
                            <label className={`block text-brand-6 text-sm font-bold mb-2 absolute top-0 left-0 px-3 py-2 transition-all duration-300 ${name || nameFocus ? 'transform -translate-y-6 text-xs' : ''}`} htmlFor="name">
                                Nombre:
                            </label>
                        </div>

                        <div className="mb-7 relative">
                            <input
                                className="bg-white border rounded w-full py-2 px-3 text-brand-6 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setEmailFocus(false)}
                                required
                            />
                            <label className={`block text-brand-6 text-sm font-bold mb-2 absolute top-0 left-0 px-3 py-2 transition-all duration-300 ${email || emailFocus ? 'transform -translate-y-6 text-xs' : ''}`} htmlFor="email">
                                Correo electrónico:
                            </label>
                        </div>
                        <div className="mb-7 relative">
                            <input
                                className="bg-white border rounded w-full py-2 px-3 text-brand-6 leading-tight focus:outline-none focus:shadow-outline"
                                id="subject"
                                type="text"
                                value={subject}
                                onChange={e => setSubject(e.target.value)}
                                onFocus={() => setSubjectFocus(true)}
                                onBlur={() => setSubjectFocus(false)}
                                required
                            />
                            <label className={`block text-brand-6 text-sm font-bold mb-2 absolute top-0 left-0 px-3 py-2 transition-all duration-300 ${subject || subjectFocus ? 'transform -translate-y-6 text-xs' : ''}`} htmlFor="subject">
                                Asunto:
                            </label>
                        </div>

                        <div className="mb-7 relative">
                            <textarea
                                className="bg-white border rounded w-full py-2 px-3 text-brand-6 leading-tight focus:outline-none focus:shadow-outline"
                                id="message"
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                onFocus={() => setMessageFocus(true)}
                                onBlur={() => setMessageFocus(false)}
                                required
                            />
                            <label className={`block text-brand-6 text-sm font-bold mb-2 absolute top-0 left-0 px-3 py-2 transition-all duration-300 ${message || messageFocus ? 'transform -translate-y-6 text-xs' : ''}`} htmlFor="message">
                                Mensaje:
                            </label>
                        </div>

                        <div className="flex items-center justify-center">
                            <button className="bg-brand-2 hover:bg-brand-4 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Enviar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}