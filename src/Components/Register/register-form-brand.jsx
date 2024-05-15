import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { onRegistrationStore } from '../../api/auth.js'
import { uploadImage as uploader } from "../../firebase.js";


const RegisterFormBrand = () => {


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
            error.description = "La descripcion no puede estar vacía.";
        }

        if (state.description.length < 50) {
            error.description = "La descripcion no puede ser menor de 50 caracteres";
        }

        if (!state.address.trim()) {
            error.address = "La dirección no puede estar vacía.";
        }



        let phoneRegex = /^\d{7,10}$/;
        if (!phoneRegex.test(state.phone)) {
            error.phone = "El telefono no es valido"
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


        if (errorL.name === "" && errorL.password === "" && errorL.email === "" && errorL.description ==="" && errorL.phone==="" && errorL.address==="") {
            
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

        <div className="bg-white rounded-lg shadow-lg p-11 max-w-x1 mx-auto"  >

            <div className="flex items-center justify-center mb-5 ">
                <img className="w-20 mx-5 " src="https://raw.githubusercontent.com/jtnvv/TetoFrontend/main/src/assets/TetoLogo.png" alt='Teto Logo' />
                <h1 className="text-5xl font-bold text-center text-gray-700  font-default"  >TETO</h1>
            </div>



            <form className="space-y-8" onSubmit={handleSubmit}>

                <div>
                    <label className="block text-gray-700 font-bold mb-1 font-default text-left text-lg "  htmlFor="name">
                        Nombre de la marca
                    </label>
                    <input className="block w-96 py-2.3 px-3 text-sm text-gray-700 bg-transparent border-0 border-b-2 border-gray-300  focus_outline-non" id="name" name="name" onChange={handleInput}
                        type="text" />
                    {errors.name && <span className="text-danger text-red-800 text-left block w-96 mt-1 text-sm">{errors.name}</span>}

                </div>
                <div>
                    <label className="block text-gray-700 font-bold mb-1 font-default text-left text-lg"  htmlFor="descripcion">
                        Descripción de tu marca
                    </label>
                    <input className="block w-96 py-2.3 px-3 text-sm text-gray-700 bg-transparent border-0 border-b-2 border-gray-300 apparance-none  focus_outline-non" id="description" name="description" onChange={handleInput}
                        type="text" />
                    {errors.description && <span className="text-danger text-red-800 text-left block w-96 mt-1 text-sm">{errors.description}</span>}
                </div>
                <div>
                    <label className="block text-gray-700 font-bold mb-1 font-default text-left text-lg"  htmlFor="direccion">
                        Dirección
                    </label>
                    <input className="block w-96 py-2.3 px-3 text-sm text-gray-700 bg-transparent border-0 border-b-2 border-gray-300 apparance-none  focus_outline-non" id="address" name="address" onChange={handleInput}
                        type="text" />
                    {errors.address && <span className="text-danger text-red-800 text-left block w-96 mt-1 text-sm">{errors.address}</span>}
                </div>
                <div>
                    <label className="block text-gray-700 font-bold mb-1 font-default text-left text-lg"  htmlFor="telefono">
                        Telefono
                    </label>
                    <input className="block w-96 py-2.3 px-3 text-sm text-gray-700 bg-transparent border-0 border-b-2 border-gray-300 apparance-none  focus_outline-non" id="phone" name="phone" onChange={handleInput}
                        type="text" />
                    {errors.phone && <span className="text-danger text-red-800 text-left block w-96 mt-1 text-sm">{errors.phone}</span>}
                </div>
                <div>
                    <label className="block text-gray-700 font-bold mb-1 font-default text-left text-lg"  htmlFor="email">
                        Correo Electronico
                    </label>
                    <input className="block w-96 py-2.3 px-3 text-sm text-gray-700 bg-transparent border-0 border-b-2 border-gray-300 apparance-none  focus_outline-non" id="email" name="email" onChange={handleInput}
                        type="email" />
                    {errors.email && <span className="text-danger text-red-800 text-left block w-96 mt-1 text-sm">{errors.email}</span>}
                </div>
                <div>
                    <label className="block text-gray-700 font-bold mb-1 font-default text-left text-lg"  htmlFor="password">
                        Contraseña
                    </label>
                    <input className="block w-96 py-2.3 px-3 text-sm text-gray-700 bg-transparent border-0 border-b-2 border-gray-300 apparance-none focus_outline-non" id="password" name="password" onChange={handleInput}
                        type="password" />
                    {errors.password && <span className="text-danger text-red-800 text-left block w-96 mt-1 text-sm">{errors.password}</span>}
                </div>
                <div>
                    <label className="block text-gray-700 font-bold mb-1 font-default text-left text-lg"  htmlFor="password">
                        Imagen de la marca
                    </label>
                    <input className="mt-4 font-default text-sm items-center text-black" id="img" name="imagen" onChange={(event) => { setImageUpload(event.target.files[0]) }}
                        type="file" />

                </div>
                <div >
                    <button className="w-full bg-brand-2 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-lg mt-2">
                        Registrarse
                    </button>
                </div>
            </form>
        </div>

    )
}

export default RegisterFormBrand
