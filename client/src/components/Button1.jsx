export function Button1({buttonText, handleClick = () => {}}){
    return (
        <button className="block mx-auto my-3 bg-blue-600 text-white px-4 py-3 rounded-lg font-medium 
                transition duration-300 ease-in-out transform hover:bg-blue-500 hover:cursor-pointer
                hover:scale-105 active:scale-95"
                onClick={handleClick}>
            {buttonText}
        </button>
    )
}