import { useState } from "react";
import { GiClothespin } from "react-icons/gi";

export default function Question({content, answer}) {
    const [showAnswer, setShowAnswer] = useState(false);

    const showAnswerFunction = () => {
        setShowAnswer(!showAnswer);
    };

  return (
    <div className={`hover:bg-brand-2 bg-brand-3 flex flex-col rounded-sm border border-b-brand-6`}>
        <div className={`flex justify-between cursor-pointer relative font-bold p-6 h-full`} onClick={showAnswerFunction}>
            <h2>{'¿' + content + '?'}</h2>
            <GiClothespin className={`text-2xl transition-all ${showAnswer ? 'rotate-45' : '-rotate-45'}`}/>
        </div>
        <div className={`bg-brand-1 grid overflow-hidden transition-all ease-in-out rounded-b-md ${showAnswer ? 'grid-rows-[1fr] opacity-100 m-4 mt-0' : 'grid-rows-[0fr] opacity-0'}`}>
            <div className={`overflow-hidden ${showAnswer ? 'p-4' : ''}`}>
                {answer}
            </div>
        </div>
    </div>
  )
}
