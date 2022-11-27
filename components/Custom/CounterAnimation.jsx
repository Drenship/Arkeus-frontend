import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { usePrevious } from "../../utils/index";

function formatForDisplay(number = 0, hideDecimal = false) {
    const fixeDecimal = hideDecimal ? 0 : 2
    const x = parseFloat(Math.max(number, number)).toFixed(fixeDecimal).split("").reverse();
    const negatif = number < 0 ? true : false
    return {
        numArray: x,
        negatif: negatif
    };
}

function DecimalColumn() {
  return (
    <div>
      <span>.</span>
    </div>
  );
}

function NumberColumn({ digit, delta }) {
    const [position, setPosition] = useState(0);
    const [animationClass, setAnimationClass] = useState(null);
    const previousDigit = usePrevious(digit);
    const columnContainer = useRef();

    const setColumnToNumber = (number) => {
        setPosition(columnContainer.current.clientHeight * parseInt(number, 10));
    };

    useEffect(() =>{
        setAnimationClass(previousDigit !== digit ? delta : "")
    }, [digit, previousDigit, delta])
    
    useEffect(() => setColumnToNumber(digit), [digit]);

    return (
        <div className="ticker-column-container" ref={columnContainer}>
            <motion.div
                animate={{ y: position }}
                className={`ticker-column ${animationClass}`}
                onAnimationComplete={() => setAnimationClass("")}
            >
                {[9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((num) => (
                    <div key={num} className="ticker-digit">
                        <span>{num}</span>
                    </div>
                ))}
            </motion.div>
            <span className="number-placeholder">0</span>
        </div>
    );
}

export default function CounterAnimation({ value, hideDecimal }) {
    const { numArray, negatif } = formatForDisplay(value, hideDecimal);
    const previousNumber = usePrevious(value);

    let delta = null;
    if (value > previousNumber) delta = "increase";
    if (value < previousNumber) delta = "decrease";


    return (
        <div className="ticker-container">
            {
                negatif && "-"
            }
            <motion.div layout className="ticker-view">
                {numArray.map((number, index) =>
                    number === "." ? (
                        <DecimalColumn key={index} /> 
                    ) : (
                        <NumberColumn key={index} digit={number} delta={delta} />
                    )
                )}
            </motion.div>
            
        </div>
    );
}
