import { useEffect, useState } from "react";
import { FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa";
import { fetchCategories } from "../../api/item";

export default function Footer() {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    fetchCategories()
    .then(res => {
      setCategories(JSON.parse(res.data.categories));
    });
  }, []);

  return (
    <footer className="bg-brand-6 text-brand-1 py-6 font-default">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <img src="/favicon.svg" alt="Logo" className="h-14 w-14 mr-2" />
        </div>
        <div className="flex flex-wrap justify-center">
          <div className="max-h-32 m-5">
            <h4 className="font-bold text-center">Ropa</h4>
            <ul className="mt-2 text-sm flex flex-col flex-wrap max-h-16 text-center">
              {
                categories && (
                  categories.map(category => {
                    return <li key={category}><a href={"/category/" + category} className="text-gray-300 hover:text-brand-1 mx-1">{category}</a></li>
                  })
                ) 
              }
            </ul>
          </div>
          <div className="m-5">
            <h4 className="font-semibold text-center">TETO</h4>
            <ul className="mt-2 text-sm text-center">
              <li><a href="/about-us" className="text-gray-300 hover:text-brand-1">Misión</a></li>
              <li><a href="/about-us" className="text-gray-300 hover:text-brand-1">Visión</a></li>
              <li><a href="/about-us" className="text-gray-300 hover:text-brand-1">¿Quienes somos?</a></li>
            </ul>
          </div>
          <div className="m-5">
            <h4 className="font-semibold text-center">Más</h4>
            <ul className="mt-2 text-sm text-center">
              <li><a href="/brand-search" className="text-gray-300 hover:text-brand-1">Marcas asociadas</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-brand-1">Contáctanos (PQR)</a></li>
            </ul>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <a href="https://www.instagram.com/teto_dress/" className="mr-4"><FaInstagram color="white" size="2.5em" className="pl-2" /></a>
          <a href="https://x.com/teto_dress" className="mr-4"><FaTwitter color="white" size="2.5em" className="pl-2" /></a>
          <a href="#"><FaFacebookF color="white" size="2em" className="pl-2" /></a>
        </div>
      </div>
    </footer>

  )
}