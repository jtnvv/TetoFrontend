import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { onRegistrationStore } from '../../api/auth.js'
import { uploadImage as uploader } from "../../firebase.js";


const RegisterFormBrand = () => {

    const inputStyle = "w-full block py-2 px-3 text-sm text-gray-700 bg-transparent border-0 border-b-2 border-gray-300  focus:border-brand-6 focus:outline-none focus:ring-0";

    const navigate = useNavigate()

    //Variables del usuario
    const [state, setState] = useState({
        name: '',
        description: '',
        address: '',
        phone_number: '',
        email: '',
        password: '',
    });

    const [imageUpload, setImageUpload] = useState(null)
    const [imageList, setImageList] = useState([])
    //Errores
    const [errors, setError] = useState({

    })

    //Validación de contraseña y nombre

    const validation = (values) => {

        //Errores
        const error = {};
        error.password = "";
        error.name = "";
        error.description = "";
        error.address = "";
        error.phone = "";
        error.email = "";
        // Validar que el nombre no esté vacío
        if (!state.name.trim()) {
            error.name = "El nombre no puede estar vacío.";
        }
        if (!state.description.trim()) {
            error.description = "La descripción no puede estar vacía.";
        }

        if (state.description.length < 50) {
            error.description = "La descripción no puede ser menor de 50 caracteres";
        }

        if (!state.address.trim()) {
            error.address = "La dirección no puede estar vacía.";
        }



        let phoneRegex = /^\d{7,10}$/;
        if (!phoneRegex.test(state.phone)) {
            error.phone = "El teléfono no es valido"
        }

        // Expresión regular para validar el correo electrónico
        let emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if (!emailRegex.test(state.email)) {
            error.email = "El correo electrónico no es válido.";
        }

        // La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número
        let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!passwordRegex.test(state.password)) {
            error.password = "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número.";
        }
        return error


    }

    //capturar datos

    const handleInput = (event) => {

        setState({
            ...state,
            [event.target.name]: event.target.value
        });


    }
    const uploadImage = async () => {
        if (imageUpload == null) return;
        return await uploader(imageUpload, "imagesFP/");
    }
    const [success, setSuccess] = useState()
    //Submit al formulario

    const handleSubmit = async (event) => {
        event.preventDefault();

        //uploading image

        //actualizar los errores y validar
        let errorL = validation(state)
        setError(errorL)


        if (errorL.name === "" && errorL.password === "" && errorL.email === "" && errorL.description === "" && errorL.phone === "" && errorL.address === "") {

            //añadir función de registro aqui, pues no se ha encontrado errores 
            event.preventDefault()
            try {
                //subir imagen al servidor
                const url = await uploadImage()
                const postData = {
                    ...state,
                    logo: url
                }
                const { data } = await onRegistrationStore(postData)


                alert("EMPRESA CREADA");
                setError('')
                setSuccess(data.message)
                //setState({...state, name:'',email: '', password: '',address:'',description:'',phone:'' })
                navigate("/login")

            } catch (err) {
                console.log(err)
                setError(err.response.data.error)
                alert("EMPRESA NO CREADA: " + err.response.data.error)
                setSuccess('')
            }

        } else {

            alert("EMPRESA NO CREADA");
        }
    }



    return (

        <div className="flex flex-col bg-white rounded-lg shadow-lg responsive:p-14 p-10 pt-20 responsive:w-[30rem] w-screen responsive:h-max min-h-screen h-full responsive:min-h-max justify-center text-center"  >

            <div className="flex items-center justify-center mb-5 ">
                <img className="w-20 mx-5 " src="https://raw.githubusercontent.com/jtnvv/TetoFrontend/main/src/assets/TetoLogo.png" alt='Teto Logo' />
                <h1 className="text-6xl font-bold text-center text-brand-6 font-logo"  >TETO</h1>
            </div>



            <form className="space-y-8 flex flex-col items-center responsive:block" onSubmit={handleSubmit}>

                <div className="flex flex-col w-full">
                    <label className="block text-gray-700 font-bold mb-1 font-default text-left text-lg " htmlFor="name" >
                        Nombre de la marca
                    </label>
                    <input className={inputStyle} id="name" name="name" onChange={handleInput} placeholder="Nombre"
                        type="text" />
                    {errors.name && <span className="text-danger text-red-800 text-left block w-96 mt-1 text-sm">{errors.name}</span>}

                </div>
                <div className="flex flex-col w-full">
                    <label className="block text-gray-700 font-bold mb-1 font-default text-left text-lg" htmlFor="descripcion">
                        Descripción de tu marca
                    </label>
                    <textarea className={inputStyle} id="description" name="description" onChange={handleInput} placeholder="Descripción de tu marca"
                        type="text" />
                    {errors.description && <span className="text-danger text-red-800 text-left block w-96 mt-1 text-sm">{errors.description}</span>}
                </div>
                <div className="flex flex-col w-full">
                    <label className="block text-gray-700 font-bold mb-1 font-default text-left text-lg" htmlFor="direccion">
                        Dirección
                    </label>
                    <input className={inputStyle} id="address" name="address" onChange={handleInput} placeholder="Dirección"
                        type="text" />
                    {errors.address && <span className="text-danger text-red-800 text-left block w-96 mt-1 text-sm">{errors.address}</span>}
                </div>
                <div className="flex flex-col w-full">
                    <label className="block text-gray-700 font-bold mb-1 font-default text-left text-lg" htmlFor="telefono">
                        Teléfono
                    </label>
                    <input className={inputStyle} id="phone" name="phone" onChange={handleInput} type="text" placeholder="Teléfono"/>
                    {errors.phone && <span className="text-danger text-red-800 text-left block w-96 mt-1 text-sm">{errors.phone}</span>}
                </div>
                <div className="flex flex-col w-full">
                    <label className="block text-gray-700 font-bold mb-1 font-default text-left text-lg" htmlFor="email">
                        Correo Electrónico
                    </label>
                    <input className={inputStyle} id="email" name="email" onChange={handleInput} placeholder="Correo Electrónico"
                        type="email" />
                    {errors.email && <span className="text-danger text-red-800 text-left block w-96 mt-1 text-sm">{errors.email}</span>}
                </div>
                <div className="flex flex-col w-full">
                    <label className="block text-gray-700 font-bold mb-1 font-default text-left text-lg" htmlFor="password">
                        Contraseña
                    </label>
                    <input className={inputStyle} id="password" name="password" onChange={handleInput} placeholder="***********"
                        type="password" />
                    {errors.password && <span className="text-danger text-red-800 text-left block w-96 mt-1 text-sm">{errors.password}</span>}
                </div>
                <div className="flex flex-col w-full">
                    <label className="block text-gray-700 font-bold mb-1 font-default text-left text-lg" htmlFor="password">
                        Imagen de la marca
                    </label>
                    
                    <input  type="file" name="file-input" id="file-input" className="text-brand-6  block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4"  accept="image/*" onChange={(event) => { setImageUpload(event.target.files[0]) }}  required />
                </div>
                <div className="flex text-brand-6 responsive:text-start">
                <input type="checkbox" className="mr-2 before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10" required />
                    <p className="m-0 text-start">He leido y acepto los <a href="/terminos" className="text-brand-6 underline">Terminos y condiciones</a></p>
                </div>
                <div >
                    <button className="responsive:w-full bg-brand-2 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-lg mt-2">
                        Registrarse
                    </button>
                </div>
            </form>
        </div>

    )
}

export default RegisterFormBrand
