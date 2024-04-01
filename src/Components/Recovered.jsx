import React from "react";

export default function Recovered() {
  return (
    <div>
      <section className="h-screen">
        <div className="px-6 h-full text-gray-800">
          <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
            
            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              <form>
                <div className="flex flex-row items-center justify-center lg:justify-start">
                  <h1 className="block text-gray-700 font-bold mb-2 font-inknut text-left text-lg">
                    Contraseña cambiada{" "}
                  </h1>
                </div>

                <div className="block text-gray-700 font-bold mb-2 font-inknut text-left text-lg">
                  <h2>Bienvenido de vuelta </h2>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}