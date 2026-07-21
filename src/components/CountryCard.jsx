export default function CountryCard({countryInfo}){
    return (
        <div className="country-card w-full bg-slate-800 text-white px-[50px] py-5 rounded-lg">
            <img src={countryInfo.flag.url_svg} alt={`Flag of ${countryInfo.names.common}`} width="200" className="mx-auto rounded-lg" />
            <h2 id="card-title" className="text-center text-3xl my-3">{countryInfo.names.common}</h2>
              <div className="card-contents grid grid-cols-1 gap-4 md:grid-cols-[1fr_2px_1fr]">
              <div className="card-column grid gap-4">
                <p className="text-lg"><span className="font-semibold">👨‍👩‍👧‍👦 Population: </span>{countryInfo.population.toLocaleString()}</p>
                <p className="text-lg"><span className="font-semibold">📍 Capital: </span>{countryInfo.capitals[0].name}</p>
                <p className="text-lg"><span className="font-semibold">🤝 Language: </span>{countryInfo.languages[0].name}</p>
              </div>
              <div className="vertical-line hidden bg-gray-600 h-full md:block"></div>
              <div className="card-column grid gap-4">
                <p className="text-lg"><span className="font-semibold">🌐 Continent: </span>{countryInfo.continents.join(",")}</p>
                <p className="text-lg"><span className="font-semibold">🗺️ Area: </span>{countryInfo.area.kilometers.toLocaleString()} sq km</p>
                <p className="text-lg"><span className="font-semibold">🪙 Currency: </span>{countryInfo.currencies[0].name} ({countryInfo.currencies[0].symbol})</p>
              </div>
            </div>
        </div>
    )
}