import { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isFavorite, togleFavorite } from "../../api/item";

export default function FavButton({itemId, parentState = false}) {

    const [isSelected, setIsSelected] = useState(null);

    const addItemToFavoriteAndNotify = async () => {
        await togleFavorite(itemId)
        .then(res => {
            toast.info(res.data.message, {
                position: "top-left"
            });
            setIsSelected(!isSelected);
            parentState && parentState();
        })
        .catch(err => {
            toast.error("Para agregar a favoritos debes iniciar sesión", {
                position: "top-left"
            });
        });
    };

    useEffect(() => {
        const getIsFavorite = async () => {
            await isFavorite(itemId)
            .then(res => {
                setIsSelected(res.data.message);
            });
        };
        getIsFavorite();
    }, []);

    return (
        <>
        <ToastContainer containerId='favorite-button' />
        <svg className={"cursor-pointer max-w-10 transition-colors ease-in-out " + (isSelected ? "fill-[#FF793B]" : "fill-brand-1 hover:fill-[#FF793B]")} onClick={addItemToFavoriteAndNotify} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 368 368" xmlSpace="preserve" fill="#000000">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
                <g transform="translate(22 25)"> 
                    <path d="M-14,112.727c0-96.4,99.6-153.2,157.6-85.2c9.6,11.2,27.2,11.2,36.8,0 c58-68.4,157.6-11.2,157.6,85.2c0,90-85.6,143.6-158.4,201.6c-10.4,8-24.8,8-35.2,0C71.6,256.327-14,202.327-14,112.727 L-14,112.727z"></path> 
                    <path d="M216.8,1.527c55.6-19.6,121.2,32.8,121.2,111.2c0,90-162.8,212-173.2,204 C280,177.927,338,89.527,216.8,1.527z"></path> 
                    <g className={"transition-colors ease-in-out " + (isSelected ? "fill-[#FFF]" : "fill-[#C6490F]")}> 
                        <path d="M162,328.327c-8,0-16-2.4-22.4-7.6c-8.8-7.2-17.6-14-26.8-20.8c-66.4-51.2-134.8-104.4-134.8-187.2 c0-53.6,30-100.8,74.8-117.6c35.2-12.8,71.6-2.8,96.8,27.2c3.2,3.6,7.6,5.6,12.4,5.6s9.2-2,12.4-5.6c25.6-30,61.6-40,96.8-27.2 c44.8,16.4,74.8,63.6,74.8,117.6c0,82.8-68.4,135.6-134.4,186.8c-9.2,7.2-18,14-27.2,21.2C178,325.927,170,328.327,162,328.327z M83.2,5.527c-8,0-16.4,1.6-24.8,4.8C26,21.927-6,58.327-6,112.727c0,74.8,65.6,125.6,128.8,174.4c8.8,6.8,18,14,26.8,20.8 c7.2,5.6,18,5.6,25.2,0c8.8-7.2,18-14,27.2-21.2c66-50.8,128-99.2,128-174c0-54.4-32.4-90.8-64.4-102.8 c-29.2-10.8-58-2.4-79.2,22.8c-6,7.2-15.2,11.2-24.4,11.2s-18.4-4-24.4-11.2C122.4,15.127,103.2,5.527,83.2,5.527z"></path> 
                        <path d="M106,232.327c-1.6,0-3.6-0.4-4.8-1.6c-27.6-22-46-40.4-59.2-58.8c-2.4-3.6-1.6-8.4,2-11.2 c3.6-2.4,8.4-1.6,11.2,2c12.4,17.2,29.6,34.4,56,55.6c3.6,2.8,4,7.6,1.2,11.2C110.4,231.527,108.4,232.327,106,232.327z M31.2,138.727c-3.6,0-6.8-2.4-7.6-6c-1.6-6-2.4-12-3.6-18.4c-0.4-4.4,2.4-8.4,6.8-8.8s8.4,2.4,8.8,6.8c0.8,6,1.6,11.2,2.8,16 c1.2,4.4-1.2,8.8-5.6,10C32.4,138.727,32,138.727,31.2,138.727z"></path> 
                    </g> 
                </g> 
            </g>
        </svg>
        </>
    )
}
