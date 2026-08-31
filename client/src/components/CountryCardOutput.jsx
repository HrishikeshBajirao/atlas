export function CountryCardOutput({countryInfo, index, setCountries, setNumberOfSlots}){
    const handleDeleteSlotClick = () => {
      setCountries((currCountries) => currCountries.filter((_, i) => i !== index))
      setNumberOfSlots((currSlots) => currSlots - 1)
    }

    return (
        <div className="country-card w-full h-full bg-slate-800 text-white px-5 py-5 rounded-lg border-1 relative 
        hover:-translate-y-1 transition-all duration-250">
          <div className="w-36 h-18 flex items-center justify-center mx-auto">
            <img 
              src={countryInfo.flag.svg} 
              alt={`Flag of ${countryInfo.name}`} 
              className="max-w-full max-h-full object-contain mx-auto rounded-lg" 
            />
          </div>
          <button type="button" 
            className="text-red-500 text-md bg-red-200 py-1 px-2 rounded-md font-bold absolute top-5 right-5  
              hover:scale-105 hover:text-red-800 hover:cursor-pointer"
            onClick={handleDeleteSlotClick}
          >X</button>
          <h2 id="card-title" className="text-center text-2xl mt-3 mb-6">{countryInfo.name}</h2>
            <div className="card-contents grid grid-cols-1 gap-4 md:grid-cols-[1fr_2px_1fr]">
            <div className="card-column grid gap-8">
              <p className="text-md"><span className="font-semibold">👨‍👩‍👧‍👦 Population: </span>{countryInfo.population.toLocaleString()}</p>
              <p className="text-md"><span className="font-semibold">📍 Capital: </span>{countryInfo.capital}</p>
              <p className="text-md"><span className="font-semibold">🤝 Language: </span>{countryInfo.languages[0]}</p>
            </div>
            <div className="vertical-line hidden bg-gray-600 h-full md:block"></div>
            <div className="card-column grid gap-4">
              <p className="text-md"><span className="font-semibold">🌐 Continent: </span>{countryInfo.region}</p>
              <p className="text-md"><span className="font-semibold">🗺️ Area: </span>{countryInfo.area.toLocaleString()} sq km</p>
              <p className="text-md"><span className="font-semibold">🪙 Currency: </span>{countryInfo.currency[0]}</p>
            </div>
          </div>
        </div>
    )
}