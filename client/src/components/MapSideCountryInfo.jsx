export function MapSideCountryInfo({mapCountrySelected, setMapCountrySelected}){
    return (
        <div className="absolute right-0 top-0 w-1/3 h-full bg-slate-800">
            <button type="button" 
                className="text-red-500 text-md bg-red-200 py-1 px-2 rounded-md font-bold absolute top-2 left-2  
                hover:scale-105 hover:text-red-800 hover:cursor-pointer"
                onClick={() => setMapCountrySelected(null)}
            >X</button>

            <div className="mt-8 p-5 text-white text-sm">
                <div className="w-44 h-22 flex items-center justify-center mx-auto">
                    <img 
                    src={mapCountrySelected.flag.svg} 
                    alt={`Flag of ${mapCountrySelected.name}`} 
                    className="max-w-full max-h-full object-contain mx-auto rounded-lg" 
                    />
                </div>
                <p className="text-center text-2xl mt-3">{mapCountrySelected.name}</p>
                <p className="text-center text-md">{mapCountrySelected.region}</p>

                <h2 className="text-xl font-semibold text-left tracking-wide mt-5 mb-3">AT A GLANCE</h2>
                <p className="pl-3 my-1.5 tracking-wider">Capital: {mapCountrySelected.capital}</p>
                <p className="pl-3 my-1.5 tracking-wider">Population: {mapCountrySelected.population.toLocaleString()}</p>
                <p className="pl-3 my-1.5 tracking-wider">Area: {mapCountrySelected.area.toLocaleString()} sq.km</p>
                <p className="pl-3 my-1.5 tracking-wider">Density: {(mapCountrySelected.population / mapCountrySelected.area).toFixed(2)}</p>
                <p className="pl-3 my-1.5 tracking-wider">Currency: {mapCountrySelected.currency[0]}</p>
                <p className="pl-3 my-1.5 tracking-wider">Languages: {mapCountrySelected.languages.join(", ")}</p>

                <h2 className="text-xl font-semibold text-left tracking-wide mt-5 mb-3">ECONOMY</h2>
                <p className="pl-3 my-1.5 tracking-wider">GDP ({mapCountrySelected.gdp.at(-1).Year}): {Number(mapCountrySelected.gdp.at(-1).GDP).toLocaleString()}</p>
                <p className="pl-3 my-1.5 tracking-wider">GDP per capita ({mapCountrySelected.gdp.at(-1).Year}): {(mapCountrySelected.gdp.at(-1).GDP / mapCountrySelected.population).toLocaleString()}</p>

            </div>
        </div>
    )
}