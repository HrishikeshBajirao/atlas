export function CountryCardOutput({countryInfo, index, setCountries, setNumberOfSlots}){
    const handleDeleteSlotClick = () => {
      setCountries((currCountries) => currCountries.filter((_, i) => i !== index))
      setNumberOfSlots((currSlots) => currSlots - 1)
    }

    return (
        <div className="country-card w-full bg-slate-800 text-white px-5 py-5 rounded-lg border-1 relative ">
            <img src={countryInfo.flag.svg} alt={`Flag of ${countryInfo.name}`} width="100" className="mx-auto rounded-lg" />
            <button type="button" 
              className="text-red-500 text-xl bg-red-200 py-2 px-3 rounded-md font-bold absolute top-5 right-5  
                hover:scale-105 hover:text-red-800 hover:cursor-pointer"
              onClick={handleDeleteSlotClick}
            >X</button>
            <h2 id="card-title" className="text-center text-xl my-3">{countryInfo.name}</h2>
              <div className="card-contents grid grid-cols-1 gap-4 md:grid-cols-[1fr_2px_1fr]">
              <div className="card-column grid gap-4">
                <p className="text-sm"><span className="font-semibold">👨‍👩‍👧‍👦 Population: </span>{countryInfo.population.toLocaleString()}</p>
                <p className="text-sm"><span className="font-semibold">📍 Capital: </span>{countryInfo.capital}</p>
                <p className="text-sm"><span className="font-semibold">🤝 Language: </span>{countryInfo.languages[0]}</p>
              </div>
              <div className="vertical-line hidden bg-gray-600 h-full md:block"></div>
              <div className="card-column grid gap-4">
                <p className="text-sm"><span className="font-semibold">🌐 Continent: </span>{countryInfo.region}</p>
                <p className="text-sm"><span className="font-semibold">🗺️ Area: </span>{countryInfo.area.toLocaleString()} sq km</p>
                <p className="text-sm"><span className="font-semibold">🪙 Currency: </span>{countryInfo.currency[0]}</p>
              </div>
            </div>
        </div>
    )
}