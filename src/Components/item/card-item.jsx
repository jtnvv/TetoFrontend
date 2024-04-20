const CardItem = (props) => {
    return (
        <div className="flex flex-wrap">
            <a className="flex flex-col items-center m-5 bg-brand-6 rounded-2xl text-brand-1 w-60" href={'/product/' + props.id}>
                <h2 className="mt-5 mb-5 font-semibold text-xl">{props.name.substring(0, 13)} ...</h2>
                <img src={props.photo} alt={props.name} className="h-40 w-40 object-cover mb-5 rounded-lg" />
                {/* aca iria la calificación*/}
                <p className="text-brand-3 mb-5 text-xl">$ {props.price}</p>
            </a>
        </div>
    );
};

export default CardItem;
