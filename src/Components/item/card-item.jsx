import { priceFormatterCOP } from "../../formatter/formaters";

const CardItem = (props) => {
    return (
        <div className="flex flex-wrap">
            <a className="flex flex-col items-center responsive:m-5 m-1 bg-brand-6 rounded-2xl text-brand-1 responsive:w-60 w-40" href={'/product/' + props.id}>
                <img src={props.photo} alt={props.name} className="responsive:h-48 h-32 w-full object-cover mb-5 rounded-t-lg" />
                <h2 className="mb-3 max-w-32 font-semibold responsive:text-xl text-base truncate">{props.name.substring(0, 13)} ...</h2>
                {/* aca iria la calificación*/}
                <p className="text-brand-3 mb-5 text-xl">{priceFormatterCOP.format(props.price)}</p>
            </a>
        </div>
    );
};

export default CardItem;
