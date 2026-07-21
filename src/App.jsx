import { useState } from "react"
import SearchFormContainer from "./components/SearchForm"
import Loading from "./components/Loading"
import CountryCard from "./components/CountryCard"
import Button1 from "./components/Button1"

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
      + <div id="output-container" className={` ${searched ? "block" : "hidden"} my-5 mx-auto w-full max-w-[800px] px-3 min-h-[500px] rounded-sm`}>
        {loading ? (
            <Loading countryInput={countryInput} />
        ) : countryInfo ? (
          <>
          <CountryCard countryInfo={countryInfo} />
          <Button1 
            buttonText="Search More"
            handleClick={handleMoreBtn}
          />
          </>
        ) : (
          <>
            <p className="my-5 text-center text-2xl text-red-300">There is no country names {countryInput}</p>
            <p className="text-center text-2xl text-red-300">Search for another country</p>
            <Button1 
              buttonText="Search here"
              handleClick={handleMoreBtn}
            />
          </>
        )}
      </div>
    </>
  )
}

export default App; 