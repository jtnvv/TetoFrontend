import { priceFormatterCOP } from "../../formatter/formaters";
import { FaStar } from "react-icons/fa";
const CardItem = (props) => {
    return (
        <div className="flex flex-wrap">
            <a className="flex flex-col items-center responsive:m-5 m-1 bg-brand-6 rounded-2xl text-brand-1 responsive:w-60 w-40" href={'/product/' + props.id}>
                <img src={props.photo} alt={props.name} className="responsive:h-52 h-36 w-full object-cover mb-5 rounded-t-lg" />
                <h2 className="mb-3 max-w-32 font-semibold responsive:text-2xl text-base truncate">{props.name}</h2>
                {
                    props.rating !== 0 ?
                        <div className="flex items-center mb-3">
                            {[...Array(5)].map((star, i) => {
                                const ratingValue = i + 1;
                                return (
                                    <label key={i}>
                                        <FaStar className="m-1" color={ratingValue <= props.rating ? 'white' : 'gray'} size="1.2em" />
                                    </label>
                                );
                            })}
                        </div>
                        :

                        <span className="mb-3 text-brand-3">Sin calificación</span>
                }
                <p className="text-brand-3 mb-5 text-xl">{priceFormatterCOP.format(props.price)}</p>
            </a>
        </div>
    );
};

export default CardItem;


