export default function Footer() {
  return (
    <footer className="bg-brand-6 text-brand-1 py-6 font-inknut">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <img src="../public/favicon.svg" alt="Logo" className="h-14 w-14 mr-2" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <h4 className="font-bold">Ropa</h4>
            <ul className="mt-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-brand-1">Hombres</a></li>
              <li><a href="#" className="text-gray-300 hover:text-brand-1">Mujeres</a></li>
              <li><a href="#" className="text-gray-300 hover:text-brand-1">Zapatos</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Accesorios</h4>
            <ul className="mt-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-brand-1">Anillos</a></li>
              <li><a href="#" className="text-gray-300 hover:text-brand-1">Cadenas</a></li>
              <li><a href="#" className="text-gray-300 hover:text-brand-1">Bolsos</a></li>
              <li><a href="#" className="text-gray-300 hover:text-brand-1">Pañoletas</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">TETO</h4>
            <ul className="mt-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-brand-1">Misión</a></li>
              <li><a href="#" className="text-gray-300 hover:text-brand-1">Visión</a></li>
              <li><a href="#" className="text-gray-300 hover:text-brand-1">¿Quienes somes?</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Emprendimientos</h4>
            <ul className="mt-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-brand-1">Marcas asociadas</a></li>
            </ul>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <a href="#" className="mr-4"><img src="../src/assets/igFooter.png" alt="profile" className="h-11 w-11" /></a>
          <a href="#" className="mr-4"><img src="../src/assets/xFooter.png" alt="favorites" className="h-8 w-8" /></a>
          <a href="#"><img src="../src/assets/facebookFooter.png" alt="profile" className="h-8 w-8" /></a>
        </div>
      </div>
    </footer>

  )
}