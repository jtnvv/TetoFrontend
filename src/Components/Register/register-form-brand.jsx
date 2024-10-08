import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { onRegistrationStore } from "../../api/auth.js";
import { uploadImage as uploader } from "../../firebase.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterFormBrand = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [logoImageFile, setLogoImageFile] = useState(null);
  const [postData, setPostData] = useState({
    name: "",
    email: "",
    password: "",
    description: "",
    address: "",
    phone: "",
  });

  const onChange = (event) => {
    setPostData({ ...postData, [event.target.name]: event.target.value });
  };

  const nextStep = () => {
    setStep(step+1)
  }

  const prevStep = () => {
    setStep(step-1)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const urlResponse = await uploader(logoImageFile, "imagesFP/");

      if (urlResponse.success) {
        const postDataParameter = {
          ...postData,
          logo: urlResponse.url,
        };

        await onRegistrationStore(postDataParameter);
        toast.success("Registro Exitoso", { position: "top-right" });
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        toast.error(urlResponse.message, { position: "top-right" });
      }
    } catch (error) {
      const errorResponse = error.response.data.errors;
      const errorMessages = {};
      let firstErrorStep = null;

      // Mapea los errores recibidos con los campos del formulario
      errorResponse.forEach((error) => {
        errorMessages[error.path] = error.msg;
        toast.error(error.msg, { position: "top-right" });
        // Verifica el paso correspondiente al error y navega al primer error encontrado
        if (
          error.path === "name" ||
          error.path === "email" ||
          error.path === "password"
        ) {
          firstErrorStep = firstErrorStep === null ? 1 : firstErrorStep;
        } else if (
          error.path === "description" ||
          error.path === "phone" ||
          error.path === "address"
        ) {
          firstErrorStep = firstErrorStep === null ? 2 : firstErrorStep;
        }
      });
      setErrorMessages(errorMessages);

      // Redirige al paso con el primer error encontrado
      if (firstErrorStep) {
        setStep(firstErrorStep);
      }
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-lg responsive:p-14 p-10 pt-20 responsive:w-[30rem] w-screen responsive:h-max min-h-screen h-full responsive:min-h-max justify-center text-center">
      <div className="flex items-center justify-center mb-5 ">
        <img
          className="w-20 mx-5 "
          src="https://raw.githubusercontent.com/jtnvv/TetoFrontend/main/src/assets/TetoLogo.png"
          alt="Teto Logo"
        />
        <h1 className="text-6xl font-bold text-center text-brand-6 font-logo">
          TETO
        </h1>
      </div>
      <ToastContainer />
      <form
        className="space-y-8 flex flex-col items-center responsive:block"
        onSubmit={handleSubmit}
      >
        {step === 1 && (
          <BasicInfo
            postData={postData}
            onChange={onChange}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {step === 2 && (
          <AdditionalInfo
            postData={postData}
            onChange={onChange}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {step === 3 && (
          <ImageAndTermsInfo
            logoImageFile={logoImageFile}
            setLogoImageFile={setLogoImageFile}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
      </form>
    </div>
  );
};

const BasicInfo = ({ postData, onChange, nextStep, prevStep }) => {
  const inputStyle =
    "w-full block py-2 px-3 text-sm text-gray-700 bg-transparent border-0 border-b-2 border-gray-300 focus:border-brand-6 focus:outline-none focus:ring-0";

  const [errorMessages, setErrorMessages] = useState({});

  const checkForErrorAndNextStep = () => {
    let currentErrors = {};
    currentErrors = validateStep1();
    if (Object.keys(currentErrors).length > 0) {
      setErrorMessages(currentErrors);
      return;
    }
    nextStep();
  };

  const validateStep1 = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar correos
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>?]).{8,}$/;

    if (!postData.name) errors.name = "El nombre es requerido";
    if (!postData.email) errors.email = "El correo es requerido";
    if (!emailRegex.test(postData.email)) {
      errors.email = "El correo electrónico no es válido";
    }
    if (!postData.password) errors.password = "La contraseña es requerida";
    if (!passwordRegex.test(postData.password)) {
      errors.password =
        "La contraseña debe tener minimo 8 caracteres, una letra mayuscula, una minuscula, un número y un simbolo";
    }
    return errors;
  };

  return (
    <div className="flex flex-col w-full">
      <div className=" mb-5">
        <label
          className="block text-gray-700 font-bold mb-1 font-default text-left text-lg"
          htmlFor="name"
        >
          Nombre de la marca
        </label>
        <input
          className={inputStyle}
          id="name"
          name="name"
          value={postData.name} // Mantiene el valor ingresado
          onChange={onChange}
          placeholder="Nombre"
          type="text"
        />
        {errorMessages.name && (
          <span className="text-danger text-red-800 text-left block w-96 mt-1 text-sm">
            {errorMessages.name}
          </span>
        )}
      </div>
      <div className="mb-3">
        <label
          className="block text-gray-700 font-bold mb-1 font-default text-left text-lg"
          htmlFor="email"
        >
          Correo Electrónico
        </label>
        <input
          className={inputStyle}
          id="email"
          name="email"
          value={postData.email} // Mantiene el valor ingresado
          onChange={onChange}
          placeholder="Correo Electrónico"
          type="email"
        />
        {errorMessages.email && (
          <span className="text-danger text-red-800 text-left block w-96 mt-1 text-sm">
            {errorMessages.email}
          </span>
        )}
      </div>
      <div className="mb-3">
        <label
          className="block text-gray-700 font-bold mb-1 font-default text-left text-lg"
          htmlFor="brand"
        >
          Contraseña
        </label>
        <input
          className={inputStyle}
          id="password"
          name="password"
          value={postData.password} // Mantiene el valor ingresado
          onChange={onChange}
          placeholder="*******"
          type="password"
        />
        {errorMessages.password && (
          <span className="text-danger text-red-800 text-left block w-96 mt-1 text-sm">
            {errorMessages.password}
          </span>
        )}
      </div>
      <button
        type="button"
        onClick={checkForErrorAndNextStep}
        className="bg-brand-2 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-lg mt-4"
      >
        Siguiente
      </button>
    </div>
  );
};

const AdditionalInfo = ({ postData, onChange, nextStep, prevStep }) => {
  const inputStyle =
    "w-full block py-2 px-3 text-sm text-gray-700 bg-transparent border-0 border-b-2 border-gray-300 focus:border-brand-6 focus:outline-none focus:ring-0";

  const [errorMessages, setErrorMessages] = useState({});

  const checkForErrorAndNextStep = () => {
    let currentErrors = {};
    currentErrors = validateStep2();
    if (Object.keys(currentErrors).length > 0) {
      setErrorMessages(currentErrors);
      return;
    }
    nextStep();
  };

  const validateStep2 = () => {
    const errors = {};
    const phoneRegex = /^\d{10}$/;
    if (
      !postData.description ||
      postData.description.length < 20 ||
      postData.description.length > 200
    ) {
      errors.description =
        "La descripción debe tener entre 20 y 200 caracteres";
    }
    if (!postData.phone) {
      errors.phone = "El número de teléfono es requerido";
    }
    if (!phoneRegex.test(postData.phone)) {
      errors.phone = "El número de teléfono debe tener exactamente 10 dígitos";
    }

    return errors;
  };

  return (
    <div className="flex flex-col w-full">
      <div>
        <div className="mb-3">
          <label
            className="block text-gray-700 font-bold mb-1 font-default text-left text-lg"
            htmlFor="description"
          >
            Descripción de tu marca
          </label>
          <textarea
            className={inputStyle}
            id="description"
            name="description"
            value={postData.description} // Mantiene el valor ingresado
            onChange={onChange}
            placeholder="Descripción de tu marca"
          />
          {errorMessages.description && (
            <span className="text-danger text-red-800 text-left block w-96 mt-1 text-sm">
              {errorMessages.description}
            </span>
          )}
        </div>
      </div>
      <div className="mb-3">
        <label
          className="block text-gray-700 font-bold mb-1 font-default text-left text-lg"
          htmlFor="address"
        >
          Ciudad de origen
        </label>
        <input
          className={inputStyle}
          id="address"
          name="address"
          value={postData.address}
          onChange={onChange}
          placeholder="Dirección"
          type="text"
        />
        {errorMessages.address && (
          <span className="text-danger text-red-800 text-left block w-96 mt-1 text-sm">
            {errorMessages.address}
          </span>
        )}
      </div>
      <div className="mb-3">
        <label
          className="block text-gray-700 font-bold mb-1 font-default text-left text-lg"
          htmlFor="phone"
        >
          Teléfono
        </label>
        <input
          className={inputStyle}
          id="phone"
          name="phone"
          value={postData.phone}
          onChange={onChange}
          placeholder="Teléfono"
          type="text"
        />
        {errorMessages.phone && (
          <span className="text-danger text-red-800 text-left block w-96 mt-1 text-sm">
            {errorMessages.phone}
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={prevStep}
        className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-lg mt-4"
      >
        Anterior
      </button>
      <button
        type="button"
        onClick={checkForErrorAndNextStep}
        className="responsive:w-full bg-brand-2 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-lg mt-2"
      >
        Siguiente
      </button>
    </div>
  );
};

const ImageAndTermsInfo = ({ logoImageFile, setLogoImageFile, nextStep, prevStep }) => {
  return (
    <div className="flex flex-col w-full">
      <label
        className="block text-gray-700 font-bold  font-default text-left text-lg"
        htmlFor="description"
      >
        Imagen de tu marca
      </label>
      {logoImageFile && (
        <>
          <label className="text-gray-700   font-default text-left text-sm">
            imagen elegida:
          </label>
          <img
            src={URL.createObjectURL(logoImageFile)}
            alt="brand"
            className="h-100 w-full mt-3 md:h-full md:w-100  "
          />
        </>
      )}
      <h2 className="text-2xl font-bold">Carga de Imagen</h2>
      <input
        type="file"
        className="text-brand-6 block w-full border mb-3 border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none file:bg-black-50 file:border-0 file:me-4 file:py-3 file:px-4"
        accept="image/*"
        onChange={(event) => {
          setLogoImageFile(event.target.files[0]);
        }}
      />

      <div className="flex text-brand-6 responsive:text-start mt-4">
        <input
          type="checkbox"
          className="mr-2 before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
          required
        />
        <p className="m-0 text-start">
          He leído y acepto los{" "}
          <a href="/terminos" className="text-brand-6 underline">
            Términos y condiciones
          </a>
        </p>
      </div>

      <button
        type="button"
        onClick={prevStep}
        className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-lg mt-4"
      >
        Anterior
      </button>
      <button
        type="submit"
        className="responsive:w-full bg-brand-2 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-lg mt-2"
      >
        Registrarse
      </button>
    </div>
  );
};

export default RegisterFormBrand;
