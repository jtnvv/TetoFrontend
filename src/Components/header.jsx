export default function Header() {
  return (
    <nav className="bg-brand-6 p-3 font-inknut">
      <div className="mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src="../public/favicon.svg" alt="Logo" className="h-14 w-14 mr-2" />
          <span className="text-brand-1 font-semibold text-5xl">TETO</span>
        </div>
        <div className="flex items-center space-x-4">
          <a href="/" className="text-brand-1 hover:text-gray-300">Inicio</a>
          <a href="/brandsSearch" className="text-brand-1 hover:text-gray-300">Marcas</a>
          <a href="#" className="text-brand-1 hover:text-gray-300">Sobre Nosotros</a>
          <button className="flex bg-brand-1 bg-opacity-25 rounded-full pt-2 pb-2 items-center justify-center"><p className="text-xs text-brand-1">Buscar producto por marca, colección</p><img src="../src/assets/searchHeader.png" alt="profile" className="h-5 w-5 ml-2" /></button>
          <a href="/login"><img src="../src/assets/profileHeader.png" alt="profile" className="h-7 w-7 mr-0" /></a>
          <a href="#"><img src="../src/assets/favoritesHeader.png" alt="favorites" className="h-8 w-8" /></a>
          <a href="#"><img src="../src/assets/shopHeader.png" alt="profile" className="h-7 w-7" /></a>
        </div>
      </div>
    </nav>
  )
}
