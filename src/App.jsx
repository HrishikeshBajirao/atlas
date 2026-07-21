import { useState } from "react"
import SearchFormContainer from "./components/SearchForm"

function App() {
  const [countryInput, setCountryInput] = useState("");
  const [countryInfo, setCountryInfo] = useState(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleMoreBtn = () => {
    setCountryInput("")
    setCountryInfo(null);
    setSearched(false);
  }

  return (
    <>
      <p className=" my-5 text-7xl text-center">🌍</p>
      <h1 className="text-center my-6 text-5xl text-white tracking-widest">ATLAS</h1>
      <p className="text-3xl text-center text-slate-400 my-6">Explore countries of the world</p>
      <SearchFormContainer 
        countryInput = {countryInput}
        searched = {searched} 
        setSearched = {setSearched}
        setLoading = {setLoading}
        setCountryInfo = {setCountryInfo}
        setCountryInput = {setCountryInput}
      />
      <div id="output-container" className={` ${searched ? "block" : "hidden"} my-5 mx-auto w-[800px] min-h-[500px] flex-column items-center justify-center rounded-sm`}>
        {loading ? (
          <p className="text-2xl text-red-400 text-center">Loading {countryInput}...</p>
        ) : 
        countryInfo ? (
          <>
          <div className="country-card w-full bg-slate-800 text-white px-[50px] py-5 rounded-lg">
            <img src={countryInfo.flag.url_svg} width="200" className="mx-auto rounded-lg" />
            <h2 id="card-title" className="text-center text-3xl my-3">{countryInfo.names.common}</h2>
            <div className="card-contents grid grid-cols-[1fr_2px_1fr] gap-4">
              <div className="card-column grid gap-">
                <p className="text-lg"><span className="font-semibold">👨‍👩‍👧‍👦 Population: </span>{countryInfo.population.toLocaleString()}</p>
                <p className="text-lg"><span className="font-semibold">📍 Capital: </span>{countryInfo.capitals[0].name}</p>
                <p className="text-lg"><span className="font-semibold">🤝 Language: </span>{countryInfo.languages[0].name}</p>
              </div>
              <div className="vertical-line bg-gray-600 h-full"></div>
              <div className="card-column grid gap-4">
                <p className="text-lg"><span className="font-semibold">🌐 Continent: </span>{countryInfo.continents.join(",")}</p>
                <p className="text-lg"><span className="font-semibold">🗺️ Area: </span>{countryInfo.area.kilometers.toLocaleString()} sq km</p>
                <p className="text-lg"><span className="font-semibold">🪙 Currency: </span>{countryInfo.currencies[0].name} ({countryInfo.currencies[0].symbol})</p>
              </div>
            </div>
          </div>
          <button className="block mx-auto my-3 bg-blue-600 text-white px-4 py-3 rounded-lg font-medium 
              transition duration-300 ease-in-out transform hover:bg-blue-500 hover:cursor-pointer
              hover:scale-105 active:scale-95"
              onClick={handleMoreBtn}>
            Search more
          </button>
          </>
        ) : (
          <>
            <p className="my-5 text-center text-2xl text-red-300">There is no country names {countryInput}</p>
            <p className="text-center text-2xl text-red-300">Search for another country</p>
            <button className="block mx-auto my-3 bg-blue-600 text-white px-4 py-3 rounded-lg font-medium 
                transition duration-300 ease-in-out transform hover:bg-blue-500 hover:cursor-pointer
                hover:scale-105 active:scale-95"
                onClick={handleMoreBtn}>
              Search here
            </button>
          </>
        )}
      </div>
    </>
  )
}

export default App;