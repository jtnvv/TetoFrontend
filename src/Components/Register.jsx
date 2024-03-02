import React from 'react'


const Register = () =>  {

    document.body.style = "background: url('../src/assets/bgRegister.png'); background-size: cover;";

    return (
      
        <div class="bg-white rounded-lg shadow-lg p-20 max-w-x1 mx-auto">
          <div class="flex items-center justify-center mb-20 ">
            <img class="w-20 mx-5 " src="../src/assets/TetoLogo.png" alt='Teto Logo'/>
            <h1  class="text-5xl font-bold text-center text-gray-700  font-inknut" style={{fontSize:64}} >TETO</h1>
          </div>
        

            <form class="space-y-16">

                <div>
                    <label class="block text-gray-700 font-bold mb-2 font-inknut text-left text-lg " style={{fontSize:24}} for="name">
                        Nombre
                    </label>
                    <input class="block w-96 py-2.3 px-3 text-sm text-gray-700 bg-transparent border-0 border-b-2 border-gray-300  focus_outline-non" id="name" name="name"
                        type="text"/>
                </div>
                <div>
                    <label class="block text-gray-700 font-bold mb-2 font-inknut text-left text-lg" style={{fontSize:24}} for="email">
                        Correo Electronico
                    </label>
                    <input class="block w-96 py-2.3 px-3 text-sm text-gray-700 bg-transparent border-0 border-b-2 border-gray-300 apparance-none  focus_outline-non" id="email" name="email"
                        type="email"/>
                </div>
                <div>
                    <label class="block text-gray-700 font-bold mb-2 font-inknut text-left text-lg" style={{fontSize:24}} for="password">
                        Contraseña
                    </label>
                    <input class="block w-96 py-2.3 px-3 text-sm text-gray-700 bg-transparent border-0 border-b-2 border-gray-300 apparance-none focus_outline-non" id="password" name="password"
                        type="password"/>
                </div>
                <div >
                    <button class="w-full bg-custom-greyRegister-400 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-lg mt-10">
                        Registrarse
                    </button>
                </div>
            </form>
        </div>
      
    )
}

export default Register
