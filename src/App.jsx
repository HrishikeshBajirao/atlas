import { useState, useEffect } from "react"
import SearchForm from "./components/SearchForm"
import Loading from "./components/Loading"
import CountryCard from "./components/CountryCard"
import Button1 from "./components/Button1"
import RecentSearches from "./components/RecentSearches"
const RECENT_SEARCHES_KEY = "atlas-recent-searches";

function App() {
  const [countryInput, setCountryInput] = useState("");
  const [countryInfo, setCountryInfo] = useState(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState(JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY)) || []);

  useEffect(() => {
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(recentSearches));
  }, [recentSearches])

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
      <div id="main-page-container" className={`${searched ? "hidden" : ""} my-5 mx-auto w-md h-[60vh] rounded-sm p-2.5`}>
        <SearchForm 
          countryInput = {countryInput}
          setSearched = {setSearched}
          setLoading = {setLoading}
          setCountryInfo = {setCountryInfo}
          setCountryInput = {setCountryInput}
          setRecentSearches={setRecentSearches}
        />
        <RecentSearches 
          recentSearches = {recentSearches}
          setRecentSearches = {setRecentSearches}
          setSearched  = {setSearched}
          setLoading  = {setLoading}
          setCountryInfo  = {setCountryInfo}
        />
      </div>
      <div id="output-container" className={` ${searched ? "block" : "hidden"} my-5 mx-auto w-full max-w-[800px] px-3 min-h-[500px] rounded-sm`}>
        {loading ? (
            <Loading countryInput={countryInput} />
        ) : countryInfo ? (
          <>
          <CountryCard 
            countryInfo={countryInfo}
          />
          <Button1 
            buttonText="Search More"
            handleClick={handleMoreBtn}
          />
          </>
        ) : (
          <>
            <p className="my-5 text-center text-2xl text-red-300">There is no country named {countryInput}</p>
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