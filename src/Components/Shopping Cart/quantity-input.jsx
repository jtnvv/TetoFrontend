import { toast } from 'react-toastify';

export default function QuantityInput({setQuantityFunction, quantity, maxValue=quantity}){
    const setQuantity = (event) => {
        event.preventDefault();
        if (quantity + 1 > maxValue) {
            toast.error("Alcanzaste la cantidad máxima de este producto", {
                position: "top-left"
            });
        } else {
            setQuantityFunction(quantity + 1);
        }
    };

  return (
    <div className='flex mt-4 space-x-1'>
        <button onClick={() => setQuantityFunction(quantity - 1)} disabled={quantity < 2} type="button" id="decrement-button" data-input-counter-decrement="quantity-input" className={(quantity < 2 && 'opacity-70 ') + "bg-brand-6 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"}>
            <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
            </svg>
        </button>
        <input value={quantity} onChange={setQuantity} type="number" className="w-12 bg-brand-1 border border-brand-6 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none h-11 text-center text-brand-6" placeholder="1" required />
        <button onClick={setQuantity} type="button" id="increment-button" data-input-counter-increment="quantity-input" className="bg-brand-6 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
            <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
            </svg>
        </button>
    </div>
  )
}
