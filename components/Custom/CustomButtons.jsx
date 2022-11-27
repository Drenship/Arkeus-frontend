import { ButtonLoader } from "./index";

export const MintButton = ({ title, isLoading, success, error, onClick }) => (
    <button 
        disabled={isLoading}
        onClick={onClick}
        className='px-8 py-3 font-bold text-white transition-all duration-500 rounded-full button-click-effect bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-size-200 bg-pos-0 hover:bg-pos-100 disabled:bg-gray-300 disabled:from-gray-300 disabled:via-gray-300 disabled:to-gray-300'
    >{
        error 
            ? "error"
            : success 
                ? 'success'
                : isLoading 
                    ? (<><ButtonLoader /> {title}</>)
                    : title 
    }</button>
);